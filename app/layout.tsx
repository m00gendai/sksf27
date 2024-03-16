import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import "@/globals/globals.css";
import Navbar_Mobile from "@/components/Navbar/Navbar_Mobile";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "primereact/resources/themes/saga-green/theme.css";


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
      <PrimeReactProvider>
        <Navbar />
        <Navbar_Mobile />
        {children}
        </PrimeReactProvider>
      </body>
    </html>
  );
}
