import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './globals.css'

export const metadata: Metadata = {
  title: "Item Management System",
  description: "System for managing the items for the events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="w-screen min-h-screen"
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
