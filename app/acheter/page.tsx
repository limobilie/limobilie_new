import { supabase } from "@/lib/supabase";
import AcheterClient from "./AcheterClient";
import React from "react";

export const revalidate = 0;

export const metadata = {
  title: "Biens Immobiliers à Vendre et à Louer à Abidjan",
  description:
    "Parcourez notre catalogue exclusif : terrains, villas, maisons et appartements à vendre ou à louer à Abidjan, Yamoussoukro et en Côte d'Ivoire. Lots sécurisés avec ACD.",
  alternates: { canonical: "https://www.limobilie.ci/acheter" },
  openGraph: {
    title: "Catalogue Immobilier — Limobilié Abidjan",
    description: "Terrains, villas, appartements à vendre et à louer en Côte d'Ivoire.",
    url: "https://www.limobilie.ci/acheter",
    images: [{ url: "/images/acheter.webp", width: 1200, height: 630 }],
  },
};

export default async function AcheterPage() {
  const [contentRes, propertiesRes] = await Promise.all([
    supabase.from('limobilie_content').select('key, value'),
    supabase.from('limobilie_properties').select('*').order('created_at', { ascending: false })
  ]);

  const contentMap = contentRes.data?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};
  const dbProperties = propertiesRes.data || [];

  return <AcheterClient content={contentMap} dbProperties={dbProperties} />;
}
