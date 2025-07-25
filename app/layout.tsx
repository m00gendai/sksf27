import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import "@/globals/globals.css";
import Navbar_Mobile from "@/components/Navbar/Navbar_Mobile";
import { ThemeProvider } from "next-themes";


import Footer from "@/components/Footer/Footer";
import { Titillium_Web } from 'next/font/google'
 
const titillium = Titillium_Web({
  weight: '400',
  style: "normal",
  subsets: ['latin'],
  variable: '--font-titillium',
})


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
    <html lang="de" className={titillium.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme">
          <Theme accentColor="grass">
          <Navbar />
          <Navbar_Mobile />
          {children}
          </Theme>
          </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
