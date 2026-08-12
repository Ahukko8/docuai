import type { Metadata } from "next";
import {
  ClerkProvider
} from "@clerk/nextjs";

import "./globals.css";

import SiteFooter from "@/components/site-footer";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "DocuAI",
  description:
    "AI powered resume builder and career assistant",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <ClerkProvider>

      <html lang="en">

        <body>

          <Navbar />

          {children}

        </body>



      </html>

      <SiteFooter />

    </ClerkProvider>

  );

}