import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Aniver Lembre",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${nunito_sans.variable} font-sans`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
