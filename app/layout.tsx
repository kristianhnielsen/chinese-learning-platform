import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/SideNav";
import PlausibleAnalytics from "./(head)/PlausibleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "易字词典 Easy Dictionary",
  description: "Chinese dictionary and Chinese learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleAnalytics />
      </head>
      <body
        className={`${inter.className} flex scroll-p-8 scroll-smooth bg-dark text-light`}
      >
        <SideNav />
        <main className="flex w-full flex-col items-center gap-8 overflow-y-scroll p-6 pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
