import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SideNav from "./ui/SideNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-950 scroll-smooth text-light scroll-p-8 min-h-screen flex`}
      >
        <SideNav />
        <main className="flex flex-col items-center gap-8 px-6 py-12 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
