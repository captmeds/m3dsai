import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "m3DSai — Smart Technology. Real Results.",
  description: "AI-powered IT service management for SMBs. Website design, AI services, digital marketing, custom dashboards, and security consulting.",
  keywords: "IT services, AI, website design, digital marketing, security consulting, SMB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
