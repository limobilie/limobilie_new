import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Heart, CheckCircle, Phone, MapPin, BadgeCheck } from "lucide-react";
import * as motion from "framer-motion/client"
import PropertyCard from "@/components/ui/PropertyCard";
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function Home() {
  const [contentRes, propertiesRes] = await Promise.all([
    supabase.from('limobilie_content').select('key, value'),
    supabase.from('limobilie_properties').select('*').order('created_at', { ascending: false }).limit(6)
  ]);

  const contentMap = contentRes.data?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};
  const dbProperties = propertiesRes.data || [];

  const mappedDbProperties = dbProperties.map(p => ({
    title: p.title, price: p.price, area: p.surface,
    image: p.image_url, location: p.city,
    type: p.type === 'terrain' ? 'Terrain' : 'Villa',
    description: p.location
  }));

  const heroTitleText = contentMap.hero_title || "ENSEMBLE,\\nCONSTRUISONS\\nL'AVENIR";
  const heroTitleLines = heroTitleText.split('\\n');
  const heroVideo = contentMap.hero_video || "/videos/video-acceuil.mp4";
  const heroBadge = contentMap.hero_badge || "Agence Immobilière à Abidjan";
  const heroSubtitleText = contentMap.hero_subtitle || "Vente · Location · Gestion Immobilière · Aménagement · Conseils";
  const impactImage = contentMap.impact_image || "/images/impact-img.png";
  const trustTitle = contentMap.trust_title || "Votre Confiance, Notre Priorité";
  const trustSubtitle = contentMap.trust_subtitle || "Nous sélectionnons rigoureusement des lots sécurisés avec documents administratifs traçables.";

  const defaultFeaturedProperties = [
    { title: "Terrain Azaguié", price: "3.000.000 FCFA", area: "500m²", image: "/images/terrain11.png", location: "Azaguié", type: "Terrain", description: "LOTS APPROUVÉS" },
    { title: "Azaguié Ahoua", price: "3.500.000 FCFA", area: "500m²", image: "/images/azague.png", location: "Azaguié Ahoua", type: "Terrain", description: "Bordure de voie - 43 LOTS APPROUVÉS" },
    { title: "Terrain Yamoussoukro", price: "Contactez-nous", area: "Sur mesure", image: "/images/terrain222.png", location: "Yamoussoukro", type: "Lotissement", description: "Lots viabilisés au cœur de la capitale" }
  ];

  const finalFeaturedProperties = [...mappedDbProperties, ...defaultFeaturedProperties].slice(0, 3);

  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="relative h-[95vh] flex items-center overflow-hidden w-full">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-950/40 z-10" />

        <div className="relative z-20 w-full px-4 sm:px-8 lg:px-16 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-5">
            <span className="inline-block bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              {heroBadge}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight font-heading">
              <span className="block italic">{heroTitleLines[0] || "ENSEMBLE,"}</span>
              <span className="block">{heroTitleLines[1] || "CONSTRUISONS"}</span>
              <span className="block text-[var(--color-primary)]">{heroTitleLines[2] || "L'AVENIR"}</span>
            </h1>
            <p className="text-sm md:text-base text-white/90 font-medium max-w-md">{heroSubtitleText}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href="/acheter" className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3.5 rounded-full text-sm font-bold hover:bg-red-700 transition-all w-full sm:w-auto">
                Explorer nos biens <ArrowRight size={16} />
              </Link>
              <a href="tel:+2250545935673" className="flex items-center justify-center gap-2 bg-white text-slate-900 px-6 py-3.5 rounded-full text-sm font-bold hover:bg-slate-50 transition-all w-full sm:w-auto">
                <Phone size={16} className="text-[var(--color-primary)]" /> +225 05 45 93 56 73
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section className="py-14 md:py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-[280px] sm:h-[420px] lg:h-[540px] rounded-[28px] overflow-hidden shadow-xl">
              <Image src={impactImage} alt="Limobilié Impact" fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="space-y-5">
              <span className="text-[var(--color-primary)] font-bold uppercase text-xs tracking-widest">Engagement Social</span>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--color-text)] leading-tight font-heading">
                {contentMap.impact_title || "LIMOBILIÉ IMPACT"}
              </h2>
              <div className="space-y-4 text-sm md:text-base text-slate-600 leading-relaxed">
                <p>{contentMap.accueil_about || "Au-delà de l'investissement, LIMOBILIÉ a créé LIMOBILIÉ Impact, un programme d'aide sociale intégré à chaque vente de terrain."}</p>
                <p>{contentMap.accueil_impact_desc || "Une partie de chaque transaction soutient les enfants atteints de cancer, en partenariat avec la TÉDIE ANGE FOUNDATION (TAF)."}</p>
                <div className="bg-slate-50 border-l-4 border-[var(--color-primary)] p-4 rounded-r-xl">
                  <p className="text-sm font-black italic font-heading text-slate-800">
                    {contentMap.accueil_impact_quote || "Acheter un terrain devient ainsi un acte utile et responsable."}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 rounded-[16px] flex items-start gap-3">
                  <BadgeCheck size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <div><p className="font-bold text-xs text-slate-800">Lots Sécurisés</p><p className="text-slate-500 text-xs">Conformité garantie</p></div>
                </div>
                <div className="p-4 bg-slate-50 rounded-[16px] flex items-start gap-3">
                  <MapPin size={20} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                  <div><p className="font-bold text-xs text-slate-800">Localisation</p><p className="text-slate-500 text-xs">Abidjan & Yamoussoukro</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="py-14 md:py-24 bg-slate-50 border-y border-slate-100 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-heading">{trustTitle}</h2>
            <p className="max-w-xl mx-auto text-slate-500 text-sm md:text-base font-medium italic">{trustSubtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: Shield, title: contentMap.trust_item1_title || "Approbation administrative", desc: contentMap.trust_item1_desc || "Chaque lotissement bénéficie d'une approbation formelle des autorités compétentes avant toute mise en vente." },
              { icon: CheckCircle, title: contentMap.trust_item2_title || "ACD", desc: contentMap.trust_item2_desc || "L'Arrêté de Concession Définitive garantit une propriété foncière incontestable en Côte d'Ivoire." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-7 rounded-[24px] border border-slate-100 flex flex-col items-center text-center group hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-[var(--color-primary)] mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-black mb-2 font-heading">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIENS EN VEDETTE ── */}
      <section className="py-14 md:py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-3">
            <div>
              <span className="text-[var(--color-primary)] font-bold uppercase text-xs tracking-widest block mb-1">Opportunités Foncières</span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 font-heading">Nos Offres Exclusives</h2>
            </div>
            <Link href="/acheter" className="flex items-center text-[var(--color-primary)] font-bold text-sm hover:underline shrink-0">
              Voir tout <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {finalFeaturedProperties.map((prop, i) => <PropertyCard key={i} {...prop} />)}
          </div>
        </div>
      </section>

      {/* ── LOCATION ── */}
      <section className="py-14 md:py-24 bg-slate-950 text-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              <span className="text-[var(--color-primary)] font-bold uppercase text-xs tracking-widest">Location Résidentielle</span>
              <h2 className="text-2xl md:text-4xl font-black leading-tight font-heading">Nos maisons disponibles à la location</h2>
              <div className="bg-white/5 border border-white/10 rounded-[20px] p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping shrink-0" />
                  <p className="text-base font-black font-heading">Statut : COMPLET</p>
                </div>
                <p className="text-white/60 text-xs leading-relaxed italic border-l-2 border-white/20 pl-3">
                  &quot;Toutes nos résidences sont occupées. Rejoignez notre liste d&apos;attente exclusive.&quot;
                </p>
              </div>
            </div>
            <div className="p-7 bg-white rounded-[28px] text-slate-900">
              <h3 className="text-lg font-black mb-2 font-heading">Soyez informé des prochaines disponibilités</h3>
              <p className="text-slate-500 text-xs mb-5">Nous vous contacterons dès qu&apos;un bien se libérera.</p>
              <div className="space-y-3">
                <a href="tel:+2250545935673" className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-all">
                  <Phone size={16} /> Appeler le Service Client
                </a>
                <Link href="/contact" className="w-full block text-center border-2 border-slate-200 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                  S&apos;inscrire sur la liste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-14 md:py-24 bg-white w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl md:text-5xl font-black text-slate-900 font-heading leading-tight">
            Expert conseil <span className="text-[var(--color-primary)]">immobilier</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto font-medium leading-relaxed">
            Votre Partenaire de Confiance en Côte d&apos;Ivoire. Un accompagnement personnalisé pour chaque investissement.
          </p>
          <a href="tel:+2250545935673" className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-red-700 transition-all shadow-lg active:scale-95">
            <Phone size={16} /> Nous contacter directement
          </a>
        </div>
      </section>
    </div>
  );
}
