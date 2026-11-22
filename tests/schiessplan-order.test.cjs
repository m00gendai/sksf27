const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");

// Exercise the TypeScript handler with a mocked mail transport: never send test emails.
function load(file, dependencies = {}, env = {}) {
    const module = { exports: {} };
    const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, "..", file), "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
    }).outputText;
    vm.runInNewContext(source, {
        module, exports: module.exports, Buffer, process: { env },
        console: { error() {} },
        require(name) {
            if (Object.hasOwn(dependencies, name)) return dependencies[name];
            throw new Error(`Unexpected dependency: ${name}`);
        },
    }, { filename: file });
    return module.exports;
}

const orderModule = load("components/SchiessplanOrderForm/order.ts");
const valid = {
    firstName: "Erika", name: "Muster", email: "test@example.invalid", street: "Teststrasse 1",
    postalCode: "8200", city: "Schaffhausen", quantity: 2, remarks: "Test\nBemerkung", website: "",
};

function handler({ send = async message => ({ accepted: [message.to] }), password = "mock-only" } = {}) {
    const messages = [], transports = [];
    const route = load("app/api/schiessplan-bestellung/route.ts", {
        "@/components/SchiessplanOrderForm/order": orderModule,
        "next/server": { NextResponse: { json: (body, init) => Response.json(body, init) } },
        nodemailer: { createTransport(options) {
            transports.push(options);
            return { async sendMail(message) { messages.push(message); return send(message); } };
        } },
    }, password ? { SMTP: password } : {});
    return { post: route.POST, messages, transports };
}

const request = (data = valid, headers = {}) => new Request("http://localhost/api/schiessplan-bestellung", {
    method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(data),
});

test("validates and normalizes orders; rejects invalid input and the spam trap", () => {
    assert.equal(orderModule.parseOrder({ ...valid, name: "  Test  " }).name, "Test");
    for (const change of [
        { firstName: "" }, { firstName: "x\nInjected" }, { name: " " }, { email: "invalid" }, { email: "a,b@example.com" },
        { email: "x@example.com\r\nBcc: y@example.com" }, { street: "" },
        { postalCode: "" }, { city: "" }, { quantity: 0 }, { quantity: 1.5 },
        { quantity: 101 }, { quantity: "2" }, { remarks: "a".repeat(2001) },
        { name: "x\nInjected" }, { website: "https://spam.invalid" },
    ]) assert.equal(orderModule.parseOrder({ ...valid, ...change }), null);
    for (const value of [null, [], "text", {}]) assert.equal(orderModule.parseOrder(value), null);
});

test("sends a fixed-recipient plain-text order with the visitor as Reply-To", async () => {
    const baseline = handler();
    await baseline.post(request());
    const h = handler();
    const response = await h.post(request({ ...valid, to: "other@example.invalid", from: "other@example.invalid" }));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { success: true });
    const message = h.messages[0];
    assert.equal(message.from, "info@sksf27.ch");
    assert.equal(message.to, baseline.messages[0].to);
    assert.notEqual(message.to, "other@example.invalid");
    assert.equal(message.replyTo, valid.email);
    assert.equal(message.cc, undefined);
    assert.equal(message.html, undefined);
    assert.ok(message.subject.includes(`${valid.firstName} ${valid.name}`));
    for (const text of [`${valid.firstName} ${valid.name}`, valid.street, "8200 Schaffhausen", "Anzahl Exemplare: 2", valid.remarks]) {
        assert.ok(message.text.includes(text));
    }
    assert.equal(h.transports[0].secure, true);
    assert.equal(h.transports[0].auth.user, "info@sksf27.ch");
});

test("returns field-specific errors including the required first name", async () => {
    const errors = orderModule.validateOrder({ ...valid, firstName: " ", email: "invalid", quantity: 0 }).errors;
    assert.ok(errors.firstName && errors.email && errors.quantity);
    assert.equal(errors.street, undefined);
    assert.equal(orderModule.parseOrder({ ...valid, firstName: undefined }), null);
    const h = handler();
    const response = await h.post(request({ ...valid, firstName: "" }));
    assert.equal(response.status, 400);
    assert.ok((await response.json()).fieldErrors.firstName);
    assert.equal(h.messages.length, 0);
});

test("invalid, oversized and malformed requests never reach SMTP", async () => {
    const h = handler();
    assert.equal((await h.post(request({ ...valid, website: "spam" }))).status, 400);
    assert.equal((await h.post(request({ ...valid, quantity: 0 }))).status, 400);
    assert.equal((await h.post(request(valid, { "Content-Type": "text/plain" }))).status, 415);
    assert.equal((await h.post(request(valid, { "Content-Length": "20000" }))).status, 413);
    assert.equal((await h.post(request({ ...valid, remarks: "x".repeat(17000) }))).status, 413);
    assert.equal((await h.post(new Request("http://localhost", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
    }))).status, 400);
    assert.equal(h.messages.length, 0);
});

test("missing SMTP configuration and mail rejection produce failure responses", async () => {
    const unconfigured = handler({ password: "" });
    assert.equal((await unconfigured.post(request())).status, 503);
    assert.equal(unconfigured.messages.length, 0);
    for (const send of [async () => { throw new Error("Mock SMTP failure"); }, async () => ({ accepted: [] })]) {
        const h = handler({ send });
        assert.equal((await h.post(request())).status, 502);
        assert.equal((await h.post(request())).status, 502); // Failed sends may be retried.
        assert.equal(h.messages.length, 2);
    }
});

test("rejects duplicates, including concurrent submissions, without another email", async () => {
    let finish;
    const h = handler({ send: () => new Promise(resolve => { finish = resolve; }) });
    const pending = h.post(request());
    while (!finish) await new Promise(resolve => setImmediate(resolve));
    const duplicate = await h.post(request({ ...valid, email: valid.email.toUpperCase() }));
    assert.equal(duplicate.status, 429);
    assert.equal(duplicate.headers.get("Retry-After"), "60");
    finish({ accepted: ["rl@sksf27.ch"] });
    assert.equal((await pending).status, 200);
    assert.equal((await h.post(request())).status, 429);
    assert.equal(h.messages.length, 1);
});
