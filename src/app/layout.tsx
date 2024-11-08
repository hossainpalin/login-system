import connectMongoDB from "@/services/mongo";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login-System | Home",
  description: "A simple login system using Next.js and MongoDB",
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  await connectMongoDB();
  return (
    <html lang="en">
      <body
        className={`${inter.className} container flex h-screen w-full items-center justify-center bg-gradient-to-r from-slate-900 to-slate-700`}>
        {children}
      </body>
    </html>
  );
}
