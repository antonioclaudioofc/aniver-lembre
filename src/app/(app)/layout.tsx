import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Aniver Lembre",
  description: "Já se esqueceu de data de comemorações importantes?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} font-sans`}>
        <Toaster richColors position="bottom-center" duration={3000} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
