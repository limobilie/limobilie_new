import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Heart, CheckCircle, Phone, MapPin, BadgeCheck } from "lucide-react";
import * as motion from "framer-motion/client"
import PropertyCard from "@/components/ui/PropertyCard";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Met à jour immédiatement à chaque visite

export default async function Home() {
  // Récupération dynamique depuis Supabase
  const [contentRes, propertiesRes] = await Promise.all([
    supabase.from('limobilie_content').select('key, value'),
    supabase.from('limobilie_properties').select('*').order('created_at', { ascending: false }).limit(6)
  ]);

  const contentMap = contentRes.data?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};
  const dbProperties = propertiesRes.data || [];

  // Mapping des biens de la BDD vers le format d'affichage
  const mappedDbProperties = dbProperties.map(p => ({
    title: p.title,
    price: p.price,
    area: p.surface,
    image: p.image_url,
    location: p.city,
    type: p.type === 'terrain' ? 'Terrain' : 'Villa',
    description: p.location
  }));

  // Textes avec Fallback (Repli par défaut si vide ou supprimé)
  const heroTitleText = contentMap.hero_title || "ENSEMBLE,\\nCONSTRUISONS\\nL'AVENIR";
  const heroTitleLines = heroTitleText.split('\\n');
  
  const heroVideo = contentMap.hero_video || "/videos/video-acceuil.mp4";
  const heroBadge = contentMap.hero_badge || "Agence Immobilière à Abidjan";
  const heroSubtitleText = contentMap.hero_subtitle || "Vente · Location · Gestion Immobilière · Aménagement · Conseils";
  
  const impactImage = contentMap.impact_image || "/images/impact-img.png";
  const impactSquareText = contentMap.impact_square || "Un achat utile,\\nun acte responsable.";
  const impactSquareLines = impactSquareText.split('\\n');
  
  const trustTitle = contentMap.trust_title || "Votre Confiance, Notre Priorité";
  const trustSubtitle = contentMap.trust_subtitle || "Nous sélectionnons rigoureusement des lots sécurisés avec documents administratifs traçables.";

  // Biens par défaut (Fallback) if DB is empty or for initial display
  const defaultFeaturedProperties = [
    {
      title: "Terrain Azaguié",
      price: "3.000.000 FCFA",
      area: "500m²",
      image: "/images/terrain11.png",
      location: "Azaguié",
      type: "Terrain",
      description: "LOTS APPROUVÉS"
    },
    {
      title: "Azaguié Ahoua",
      price: "3.500.000 FCFA",
      area: "500m²",
      image: "/images/azague.png",
      location: "Azaguié Ahoua",
      type: "Terrain",
      description: "Bordure de voie - 43 LOTS APPROUVÉS"
    },
    {
      title: "Terrain Yamoussoukro",
      price: "Contactez-nous",
      area: "Sur mesure",
      image: "/images/terrain222.png",
      location: "Yamoussoukro",
      type: "Lotissement",
      description: "Lots viabilisés au cœur de la capitale"
    }
  ];

  // Fusion : Priorité aux nouveautés de la BDD
  const finalFeaturedProperties = [...mappedDbProperties, ...defaultFeaturedProperties].slice(0, 3);

  return (
    <div className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover z-0"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Dark Overlay for Depth & Contrast - No Blur for sharpness */}
        <div className="absolute inset-0 bg-slate-950/30 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl space-y-8 text-center sm:text-left mx-auto sm:mx-0"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-[0.3em] mb-4 shadow-lg shadow-red-600/20"
            >
              {heroBadge}
            </motion.span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[1.1] font-heading drop-shadow-2xl">
              <span className="block italic opacity-90">{heroTitleLines[0] || "ENSEMBLE,"}</span>
              <span className="block whitespace-nowrap">{heroTitleLines[1] || "CONSTRUISONS"}</span>
              <span className="text-[var(--color-primary)] drop-shadow-[0_0_15px_rgba(255,0,0,0.3)] whitespace-nowrap">{heroTitleLines[2] || "L'AVENIR"}</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="text-xl md:text-2xl text-white font-medium tracking-tight max-w-2xl drop-shadow-lg"
            >
              {heroSubtitleText}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 pt-8 items-center sm:items-start"
            >
              <Link href="/acheter" className="group bg-[var(--color-primary)] text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-600/40 active:scale-95 flex items-center gap-3">
                Explorer nos biens
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="tel:+2250545935673" className="flex items-center space-x-4 text-slate-900 bg-white px-10 py-5 rounded-full text-xl font-bold hover:bg-slate-50 transition-all shadow-xl group">
                <Phone size={24} className="text-[var(--color-primary)] group-hover:rotate-12 transition-transform" />
                <span>+225 05 45 93 56 73</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* IMPACT SECTION: THE HEART OF LIMOBILIÉ */}
      <section className="py-32 md:py-48 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group">
              <div className="absolute -inset-6 bg-[var(--color-primary)] opacity-5 rounded-[48px] group-hover:opacity-10 transition-opacity"></div>
              <div className="relative h-[700px] rounded-[40px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100">
                <Image
                  src={impactImage}
                  alt="Limobilié Impact - Aide sociale"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-10 rounded-[32px] shadow-2xl hidden lg:block max-w-sm border border-slate-50">
                <Heart className="text-[var(--color-primary)] mb-6" size={48} fill="currentColor" />
                <p className="text-[var(--color-text)] font-black text-2xl leading-tight font-heading">
                  {impactSquareLines[0] || "Un achat utile,"} <br />{impactSquareLines[1] || "un acte responsable."}
                </p>
              </div>
            </div>
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[var(--color-primary)] font-bold tracking-[0.3em] uppercase text-sm block">Engagement Social</span>
                <h2 className="text-5xl md:text-7xl font-black text-[var(--color-text)] leading-tight font-heading">
                  {contentMap.impact_title || "LIMOBILIÉ IMPACT"}
                </h2>
                <div className="space-y-8 text-xl text-[var(--color-text-light)] leading-relaxed">
                  <p className="font-medium whitespace-pre-wrap">
                    {contentMap.accueil_about || "Au-delà de l'investissement, LIMOBILIÉ a créé LIMOBILIÉ Impact, un programme d'aide sociale intégré à chaque vente de terrain."}
                  </p>
                  <p className="font-medium whitespace-pre-wrap">
                    {contentMap.accueil_impact_desc || "Grâce à ce programme, une partie de chaque transaction est consacrée à des actions sociales concrètes, notamment le soutien aux enfants atteints de cancer, en partenariat avec la TÉDIE ANGE FOUNDATION (TAF)."}
                  </p>
                  <div className="bg-slate-50 border-l-8 border-[var(--color-primary)] p-8 rounded-r-3xl transition-transform hover:translate-x-2">
                    <p className="text-2xl text-[var(--color-text)] font-black italic font-heading whitespace-pre-wrap">
                      {contentMap.accueil_impact_quote || "Acheter un terrain devient ainsi un acte utile et responsable."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <div className="p-8 bg-slate-50 rounded-[32px] flex items-start space-x-5 hover:bg-slate-100 transition-colors">
                  <BadgeCheck size={36} className="text-[var(--color-primary)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xl text-[var(--color-text)]">Lots Sécurisés</h4>
                    <p className="text-slate-500 leading-snug">Conformité administrative garantie.</p>
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[32px] flex items-start space-x-5 hover:bg-slate-100 transition-colors">
                  <MapPin size={36} className="text-[var(--color-primary)] shrink-0" />
                  <div>
                    <h4 className="font-bold text-xl text-[var(--color-text)]">Localisation</h4>
                    <p className="text-slate-500 leading-snug">Grand Abidjan & Yamoussoukro.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY SECTION */}
      <section className="py-32 bg-[var(--color-bg-alt)] border-y border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text)] font-heading">{trustTitle}</h2>
            <p className="max-w-3xl mx-auto text-[var(--color-text-light)] text-2xl font-medium opacity-80 italic">
              {trustSubtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[48px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64px_rgb(0,0,0,0.08)] transition-all duration-500 border border-slate-100 flex flex-col items-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-[var(--color-primary)] mb-10 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                <Shield size={48} />
              </div>
              <h3 className="text-3xl font-black text-center mb-6 font-heading">{contentMap.trust_item1_title || "Approbation administrative"}</h3>
              <p className="text-center text-slate-500 leading-relaxed text-xl font-medium">
                {contentMap.trust_item1_desc || "Chaque lotissement bénéficie d'une approbation formelle des autorités compétentes avant toute mise en vente sur le marché."}
              </p>
            </div>
            <div className="bg-white p-12 rounded-[48px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_32px_64_rgb(0,0,0,0.08)] transition-all duration-500 border border-slate-100 flex flex-col items-center group">
              <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center text-[var(--color-primary)] mb-10 group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-3xl font-black text-center mb-6 font-heading">{contentMap.trust_item2_title || "ACD"}</h3>
              <p className="text-center text-slate-500 leading-relaxed text-xl font-medium">
                {contentMap.trust_item2_desc || "L'Arrêté de Concession Définitive est votre garantie suprême d'une propriété foncière incontestable et définitive en Côte d'Ivoire."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES GRID */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl space-y-4">
              <span className="text-[var(--color-primary)] font-bold tracking-[0.4em] uppercase text-sm block">Opportunités Foncières</span>
              <h2 className="text-5xl md:text-7xl font-black text-[var(--color-text)] font-heading leading-tight">Nos Offres <br />Exclusives</h2>
            </div>
            <Link href="/acheter" className="flex items-center text-[var(--color-primary)] font-bold text-xl hover:underline group decoration-2 underline-offset-8">
              Parcourir tous les lots <ArrowRight className="ml-4 w-7 h-7 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {finalFeaturedProperties.map((prop, index) => (
              <PropertyCard key={index} {...prop} />
            ))}
          </div>
        </div>
      </section>

      {/* RENTAL SECTION */}
      <section className="py-32 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-primary)] blur-[250px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <span className="text-[var(--color-primary)] font-bold tracking-[0.3em] uppercase text-sm block">Location Résidentielle</span>
              <h2 className="text-5xl md:text-6xl font-black leading-tight font-heading">
                Nos maisons disponibles <br />à la location
              </h2>
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 mt-12 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
                  <p className="text-3xl font-black font-heading tracking-tight">Statut Actuel : COMPLET</p>
                </div>
                <p className="text-white/70 text-2xl font-medium leading-relaxed italic border-l-4 border-white/20 pl-8">
                  &quot;Toutes nos résidences sont actuellement occupées. L&apos;excellence attire une forte demande. Rejoignez notre liste d&apos;attente exclusive.&quot;
                </p>
              </div>
            </div>
            <div className="p-12 lg:p-16 bg-white rounded-[48px] text-slate-900 shadow-[0_48px_100px_rgba(0,0,0,0.5)]">
              <h3 className="text-3xl font-black mb-6 font-heading leading-tight">Soyez informé des prochaines disponibilités</h3>
              <p className="text-slate-500 text-xl mb-12 font-medium">Nous vous contacterons en priorité dès qu&apos;un bien correspondant à vos critères se libérera.</p>
              <div className="space-y-6">
                <a href="tel:+2250545935673" className="w-full flex items-center justify-center gap-4 bg-[var(--color-primary)] text-white py-6 rounded-3xl font-bold text-xl hover:bg-[var(--color-primary-hover)] transition-all shadow-2xl hover:shadow-red-500/30">
                  <Phone size={28} />
                  <span>Appeler le Service Client</span>
                </a>
                <Link href="/contact" className="w-full block text-center border-2 border-slate-900 py-6 rounded-3xl font-bold text-xl hover:bg-slate-900 hover:text-white transition-all">
                  S&apos;inscrire sur la liste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-48 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-12">
          <h2 className="text-6xl md:text-8xl font-black text-[var(--color-text)] font-heading leading-none">
            Expert conseil <br /><span className="text-[var(--color-primary)]">immobilier</span>
          </h2>
          <p className="text-[var(--color-text-light)] text-2xl md:text-3xl max-w-4xl mx-auto font-medium opacity-80 leading-relaxed">
            Votre Partenaire de Confiance en Côte d&apos;Ivoire. <br />
            Un accompagnement personnalisé pour chaque investissement.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
            <a href="tel:+2250545935673" className="bg-[var(--color-primary)] text-white px-16 py-7 rounded-full text-2xl font-bold hover:bg-[var(--color-primary-hover)] transition-all shadow-[0_24px_48px_rgba(255,0,0,0.2)] hover:scale-105 active:scale-95">
              Nous contacter directement
            </a>
          </div>
        </div>
        {/* Decorative background typography */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[15vw] md:text-[30vw] font-black font-heading leading-none -rotate-12 translate-y-20">LIMOBILIÉ</span>
        </div>
      </section>
    </div>
  );
}
