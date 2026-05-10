import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import MotionMain from "@/components/animation/MotionMain";
import MotionProvider from "@/components/animation/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forest Hideaway Resort",
  description: "The home of the slow safari. Experience luxury and nature.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} font-sans antialiased`}   
      >
        <MotionProvider>
          <Navbar/>
          <MotionMain>
            {children}
          </MotionMain>
          <Footer/>
        </MotionProvider>
      </body>
    </html>
  );
}
