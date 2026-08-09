import type { Metadata } from "next";
import {
  ClerkProvider
} from "@clerk/nextjs";

import "./globals.css";

import SiteFooter from "@/components/site-footer";


export const metadata: Metadata = {
  title: "CareerAI",
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

{children}

</body>

 <SiteFooter />

</html>

</ClerkProvider>

);

}