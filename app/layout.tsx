import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

// Our "Industrial" Sans-Serif (for tech details)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

// Our "Editorial" Serif (for that WIRED headline look)
const dmSerif = DM_Serif_Display({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Palgorithm | Notes on Learning & Logic",
  description: "Exploring the intersection of instructional design and systematic thinking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} h-full antialiased`}
    >
      {/* Selection color added to body to give that premium personal touch */}
      <body className="min-h-full flex flex-col selection:bg-zinc-200 selection:text-zinc-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}