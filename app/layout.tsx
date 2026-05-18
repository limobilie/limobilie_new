import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminHider from "@/components/layout/AdminHider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

const BASE_URL = "https://www.limobilie.ci";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Limobilié | Agence Immobilière à Abidjan — Vente, Location, Gestion",
    template: "%s | Limobilié — Immobilier Côte d'Ivoire",
  },
  description:
    "Limobilié, votre agence immobilière de confiance à Abidjan. Vente de terrains, villas, appartements. Location et gestion immobilière en Côte d'Ivoire. Lots sécurisés avec ACD.",
  keywords: [
    "agence immobilière Abidjan",
    "immobilier Côte d'Ivoire",
    "terrain à vendre Abidjan",
    "villa à vendre Abidjan",
    "appartement Abidjan",
    "achat terrain Côte d'Ivoire",
    "location maison Abidjan",
    "Limobilié",
    "gestion immobilière Abidjan",
    "terrain Azaguié",
    "terrain Yamoussoukro",
    "immobilier Cocody",
    "immobilier Bingerville",
    "tontine immobilière",
    "investissement immobilier Abidjan",
    "ACD Côte d'Ivoire",
    "lot approuvé Abidjan",
    "maison à vendre Abidjan",
    "promotion immobilière Côte d'Ivoire",
  ],
  authors: [{ name: "Limobilié", url: BASE_URL }],
  creator: "Limobilié",
  publisher: "Limobilié",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: BASE_URL,
    siteName: "Limobilié",
    title: "Limobilié | Agence Immobilière à Abidjan — Vente, Location, Gestion",
    description:
      "Votre partenaire immobilier de confiance en Côte d'Ivoire. Terrains sécurisés, villas, appartements à Abidjan et Yamoussoukro.",
    images: [{ url: "/images/logo-official.png", width: 1200, height: 630, alt: "Limobilié — Agence Immobilière Abidjan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Limobilié | Agence Immobilière à Abidjan",
    description: "Vente, location et gestion immobilière en Côte d'Ivoire. Terrains sécurisés avec ACD.",
    images: ["/images/logo-official.png"],
  },
  alternates: { canonical: BASE_URL },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  category: "real estate",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${BASE_URL}/#organization`,
        name: "Limobilié",
        url: BASE_URL,
        logo: { "@type": "ImageObject", url: `${BASE_URL}/images/logo-official.png` },
        description: "Agence immobilière à Abidjan spécialisée dans la vente de terrains, villas et appartements en Côte d'Ivoire.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Bingerville, Paris-Village",
          addressLocality: "Abidjan",
          addressCountry: "CI",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+225-05-45-93-56-73",
          contactType: "customer service",
          availableLanguage: "French",
        },
        sameAs: [
          "https://www.facebook.com/share/1DEKHno3b9/",
          "https://www.instagram.com/limobilie",
        ],
        areaServed: ["Abidjan", "Yamoussoukro", "Côte d'Ivoire"],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Limobilié",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${BASE_URL}/acheter?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} overflow-x-hidden w-full`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
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