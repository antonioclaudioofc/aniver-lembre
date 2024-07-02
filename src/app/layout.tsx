import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "./components/Toaster";
import profile from "@/../public/profile.jpg";
import clsx from "clsx";
import Image from "next/image";

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
        className={cn(
          "min-h-screen font-sans antialiased bg-gray-50",
          fontSans.variable
        )}
      >
        <nav
          className={clsx(
            "flex justify-center items-center sticky top-0 h-20 max-xl:h-20 bg-violet-300 transition-all duration-300"
          )}
        >
          <div
            className={clsx(
              "flex justify-between px-24 w-full max-w-7xl items-center  ",
              "max-xl:px-5 max-xl:w-full"
            )}
          >
            <h2 className="text-3xl font-semibold text-white">Logo</h2>
            <Image
              className="w-14 h-14 rounded-full object-cover cursor-pointer hover:opacity-40"
              src={profile}
              width={120}
              height={123}
              alt="home"
            />
          </div>
        </nav>
        <Toaster richColors position="bottom-center" duration={4000} />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
