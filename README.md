# Website for the Schaffhauser Kantonalschützenfest 2027

## Description

This is a Next.js 14 (App Router) Website written in React and TypeScript.
Dependencies see ```package.json```

Uses Cockpit v2 as a headless CMS for content.

Components are enclosed in a directory complete with CSS and interface declaration files.
Global files are in the globals folder at root.

## Dev Environment

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You need a .env file with a Cockpit CMS API key and the upload storage URL.
Model Types are in the respective interface files if you want to mock them.