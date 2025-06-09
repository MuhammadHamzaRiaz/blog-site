// core
import type { Metadata } from "next";
// fonts
import { Geist, Geist_Mono } from "next/font/google";
// provider
import { AppProviders } from "./providers";
// styles
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Blog | Built with Next.js 15",
  description:
    "A modern blog built with Next.js 15 and React Server Components. Explore detailed posts, clean UI, and fast performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
