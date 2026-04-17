import { supabase } from "@/lib/supabase";
import * as motion from "framer-motion/client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Users, 
  HardHat, 
  TrendingUp, 
  MapPin, 
  FileCheck, 
  Zap,
  BarChart3
} from "lucide-react";

export const revalidate = 0;

export default async function TontinePage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};
  // Parse helper for lists
  const parseList = (key: string, defaultArray: string[]) => {
    try { return contentMap[key] ? JSON.parse(contentMap[key] as string) : defaultArray; } 
    catch { return defaultArray; }
  };
  
  const conditions = [
    {
      title: contentMap.tontine_cond1_title || "Investissement",
      value: contentMap.tontine_cond1_value || "1.000.000 FCFA",
      desc: contentMap.tontine_cond1_desc || "Par souscripteur / membre",
      icon: TrendingUp
    },
    {
      title: contentMap.tontine_cond2_title || "Cycle Court",
      value: contentMap.tontine_cond2_value || "10 Mois",
      desc: contentMap.tontine_cond2_desc || "Un lot de terrain garanti",
      icon: Clock
    },
    {
      title: contentMap.tontine_cond3_title || "Transparence",
      value: contentMap.tontine_cond3_value || "Flux Sécurisés",
      desc: contentMap.tontine_cond3_desc || "Visibilité totale des fonds",
      icon: ShieldCheck
    }
  ];

  const defaultReception = [
    "1 lot de terrain approuvé",
    "Localisation stratégique",
    "Documents juridiques conformes",
    "Terrain déjà valorisé"
  ];
  
  const iconsMap = [MapPin, MapPin, FileCheck, Zap];
  
  const reception = parseList("tontine_recep_points", defaultReception).map((title: string, index: number) => ({
    title,
    icon: iconsMap[index % iconsMap.length]
  }));

  const machineDetails = [
    { title: contentMap.tontine_machine1_title || "Décapage et ouverture de voies", desc: contentMap.tontine_machine1_desc || "Mise en accessibilité immédiate du site." },
    { title: contentMap.tontine_machine2_title || "Viabilisation aux normes", desc: contentMap.tontine_machine2_desc || "Préparation des infrastructures essentielles." },
    { title: contentMap.tontine_machine3_title || "Accélération administrative", desc: contentMap.tontine_machine3_desc || "Traitement prioritaire des dossiers fonciers." }
  ];

  return (
    <div className="flex flex-col font-sans overflow-hidden">
      {/* LUXURY HERO SECTION */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src={contentMap.tontine_hero_image || "/images/tontine133.png"} 
          alt="LIMOBILIÉ Tontine Foncière" 
          fill 
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-950/20 z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="max-w-4xl mx-auto space-y-8">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-[0.3em] mb-4 shadow-xl"
            >
              {contentMap.tontine_hero_badge || "Innovation Foncière"}
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-tight font-heading drop-shadow-2xl">
              {contentMap.tontine_hero_title ? contentMap.tontine_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.tontine_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>LIMOBILIÉ <br /><span className="text-[var(--color-primary)]">TONTINE</span> FONCIÈRE</>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-3xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              {contentMap.tontine_hero_subtitle || "Transformez votre contribution mensuelle en un patrimoine immobilier concret."}
            </motion.p>
          </div>
        </motion.div>
        {/* Subtle scroll down indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-[1px] h-12 bg-white/40"></div>
        </div>
      </section>

      {/* CONCEPT SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <span className="text-[var(--color-primary)] font-bold tracking-[0.3em] uppercase text-sm block">Le Concept</span>
                <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text)] leading-tight font-heading">
                  {contentMap.tontine_intro_title || "Le principe, simplement"}
                </h2>
                <div className="space-y-8 text-xl text-[var(--color-text-light)] leading-relaxed font-medium">
                  <p>
                    {contentMap.tontine_intro_text || "Avec LIMOBILIÉ Tontine Infra, vous ne cotisez pas pour de l’argent liquide. Vous investissez collectivement dans la puissance technique. Votre argent finance les engins et les travaux qui valorisent directement le terrain."}
                  </p>
                  <p className="bg-slate-50 p-8 rounded-3xl border-l-8 border-[var(--color-primary)]">
                    Vous investissez collectivement dans la <span className="text-[var(--color-primary)] font-bold">puissance technique</span>. Votre argent finance les engins et les travaux qui valorisent directement le terrain.
                  </p>
                  <p className="text-2xl text-[var(--color-text)] font-black italic font-heading pt-4">
                    Résultat : au bout de 10 mois, chaque souscripteur reçoit un lot de terrain approuvé.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-[var(--color-primary)] opacity-5 rounded-[64px] blur-3xl"></div>
              <div className="relative grid grid-cols-1 gap-6">
                {conditions.map((item, index) => (
                  <div key={index} className="bg-white p-10 rounded-[40px] shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-slate-100 flex items-center space-x-8 group hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all duration-500 shrink-0">
                      <item.icon size={36} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{item.title}</p>
                      <h3 className="text-3xl font-black text-[var(--color-text)] font-heading">{item.value}</h3>
                      <p className="text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE ENGINE: MACHINE D7 SECTION */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative h-[600px] rounded-[48px] overflow-hidden shadow-2xl border-4 border-white">
                <Image 
                  src={contentMap.tontine_machine_image || "/images/btp1.jpg"} 
                  alt="Infrastructure LIMOBILIÉ" 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-12 -right-12 bg-[var(--color-primary)] text-white p-10 rounded-[40px] shadow-2xl animate-pulse">
                <HardHat size={48} />
              </div>
            </div>
            <div className="space-y-10 order-1 lg:order-2">
              <div className="space-y-6">
                <span className="text-[var(--color-primary)] font-bold tracking-[0.3em] uppercase text-sm block">Puissance Technique</span>
                <h2 className="text-5xl md:text-7xl font-black text-[var(--color-text)] leading-tight font-heading">
                  {contentMap.tontine_machine_title ? contentMap.tontine_machine_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.tontine_machine_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>La Machine <span className="text-[var(--color-primary)]">D7</span></>}
                </h2>
                <div className="space-y-6">
                  {machineDetails.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-6 group">
                      <div className="mt-1 w-6 h-6 rounded-full border-2 border-[var(--color-primary)] flex-shrink-0 group-hover:bg-[var(--color-primary)] transition-colors"></div>
                      <div>
                        <h4 className="text-xl font-bold text-[var(--color-text)] mb-2 font-heading tracking-tight">{detail.title}</h4>
                        <p className="text-slate-500 font-medium text-lg">{detail.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-[var(--color-text)] font-heading leading-tight">Ce que vous recevez</h2>
            <div className="w-24 h-2 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {reception.map((item: { title: string, icon: any }, index: number) => (
              <div key={index} className="p-8 bg-slate-50 rounded-[40px] hover:bg-white border border-slate-50 hover:border-slate-100 hover:shadow-2xl transition-all duration-500 text-center group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[var(--color-primary)] mb-8 mx-auto shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={36} />
                </div>
                <h4 className="text-xl font-black text-[var(--color-text)] font-heading leading-tight">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY & TRANSPARENCY SECTION */}
      <section className="py-32 bg-[var(--color-text)] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="p-12 bg-white/5 rounded-[48px] border border-white/10 space-y-6 hover:bg-white/10 transition-colors">
              <ShieldCheck size={56} className="text-[var(--color-primary)]" />
              <h3 className="text-3xl font-black font-heading tracking-tight">Sécurité & Transparence</h3>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[var(--color-primary)] font-heading">Contrat Notarié</h4>
                <p className="text-white/60 text-lg leading-relaxed font-sans">
                  Sécurité juridique totale pour chaque membre. Toutes les transactions sont encadrées par un acte authentique.
                </p>
              </div>
            </div>
            <div className="p-12 bg-white/5 rounded-[48px] border border-white/10 space-y-6 hover:bg-white/10 transition-colors">
              <BarChart3 size={56} className="text-[var(--color-primary)]" />
              <h3 className="text-3xl font-black font-heading tracking-tight">Reporting Mensuel</h3>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-[var(--color-primary)] font-heading">Suivi de Chantier</h4>
                <p className="text-white/60 text-lg leading-relaxed font-sans">
                  Suivez l&apos;avancement réel sur le terrain avec des rapports détaillés. La transparence est au cœur de notre modèle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL QUOTE & CTA */}
      <section className="py-48 bg-white text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          <blockquote className="space-y-8">
            <p className="text-4xl md:text-6xl font-black text-[var(--color-text)] font-heading italic leading-tight whitespace-pre-wrap">
              {contentMap.tontine_quote || "“Votre argent ne dort pas. Il travaille, il creuse, il ouvre des routes… et devient votre terrain.”"}
            </p>
            <footer className="text-2xl font-bold text-[var(--color-primary)] uppercase tracking-widest font-heading">
              — L&apos;Équipe LIMOBILIÉ
            </footer>
          </blockquote>
          
          <div className="pt-8 items-center flex flex-col space-y-6">
            <Link href="/contact" className="bg-[var(--color-primary)] text-white px-20 py-8 rounded-full text-3xl font-black hover:bg-[var(--color-primary-hover)] transition-all shadow-2xl hover:scale-110 active:scale-95 flex items-center gap-6">
              Souscrire maintenant
              <ArrowRight size={32} />
            </Link>
            <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm">
              Cycle de 10 mois · Places limitées
            </p>
          </div>
        </div>
        {/* Decorative backdrop */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
          <span className="text-[15vw] md:text-[30vw] font-black font-heading rotate-12">INFRA</span>
        </div>
      </section>
    </div>
  );
}
