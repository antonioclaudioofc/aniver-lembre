import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./components/Navbar";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "./components/Toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DataLembre",
  description: "Lembre de momentos especiais para a vida toda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <Navbar />
        <Toaster richColors position="bottom-center" duration={4000} />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
