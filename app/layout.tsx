import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import "@/globals/globals.css";


export const metadata: Metadata = {
  title: "SKSF27",
  description: "Schaffhauser Kantonalschützenfest 2027",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
