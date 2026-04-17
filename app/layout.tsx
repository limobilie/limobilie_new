import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminHider from "@/components/layout/AdminHider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Limobilié | L'Excellence Immobilière",
  description: "L'excellence et l'élégance dans chaque transaction immobilière. Notre expertise à votre service pour concrétiser vos projets de vie.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-[var(--color-bg)] text-[var(--color-text)] antialiased overflow-x-hidden w-full relative">
        <AdminHider><Navbar /></AdminHider>
        <main className="min-h-screen pt-28 md:pt-40 w-full overflow-x-clip relative">
          {children}
        </main>
        <AdminHider><Footer /></AdminHider>
      </body>
    </html>
  );
}
