import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useModalStore } from "@/store/modalStore";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NetRuv",
  description: "Yours free streaming site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
