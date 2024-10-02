import type { Metadata } from "next";
import localFont from "next/font/local";
import Providers from "./providers";

import "./globals.css";
import Navbar from "./_components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Got Milk?",
  description: "Automated validator for Got Milk campaign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className='text-foreground bg-background min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
