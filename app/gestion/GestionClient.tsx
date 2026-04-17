"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { 
  Home, 
  Building2, 
  Store, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Phone
} from "lucide-react";
import * as motion from "framer-motion/client"

export default function GestionClient({ content }: { content: Record<string, string> }) {
  const contentMap = content;

  const openWhatsApp = (serviceContext: string) => {
    const message = encodeURIComponent(`Bonjour Limobilié, je souhaite échanger concernant votre service de : ${serviceContext}`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };

  // Parse helper for simple lists
  const parseList = (key: string, defaultArray: string[]) => {
    try { 
      const val = contentMap[key];
      return val ? JSON.parse(val as string) : defaultArray; 
    } 
    catch { return defaultArray; }
  };

  // Parse helper for dynamic object lists
  const parseObjectList = (key: string) => {
    try { 
      const val = contentMap[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const dynamicServicesData = parseObjectList("gestion_services_list");

  interface ServiceData {
    title?: string;
    description?: string;
    image?: string;
    points?: string[];
  }

  const managementServices = dynamicServicesData.length > 0 ? dynamicServicesData.map((s: ServiceData, i: number) => ({
    id: `dynamic-${i}`,
    title: s.title || "Titre du service",
    icon: i % 3 === 0 ? Home : i % 3 === 1 ? Building2 : Store,
    description: s.description || "Description à venir...",
    subtitle: "Notre expertise inclut :",
    points: s.points || [],
    image: s.image || "/images/louer-loca1.png",
    align: i % 2 === 0 ? "left" : "right"
  })) : [
    {
      id: "locative",
      title: contentMap.gestion_service1_title || "Gestion locative complète",
      icon: Home,
      description: contentMap.gestion_service1_desc || "Nous prenons en charge l’ensemble de la gestion de vos biens locatifs : recherche de locataires, rédaction des contrats, encaissement des loyers et suivi administratif.",
      subtitle: "Notre expertise inclut :",
      points: parseList("gestion_service1_points", [
        "Étude de solvabilité des locataires.",
        "État des lieux rigoureux.",
        "Gestion des impayés et contentieux.",
        "Rapports de gérance mensuels."
      ]),
      image: contentMap.gestion_service1_image || "/images/louer-loca1.png",
      align: "left"
    },
    {
      id: "immeubles",
      title: contentMap.gestion_service2_title || "Gestion d’immeubles",
      icon: Building2,
      description: contentMap.gestion_service2_desc || "Confiez-nous la gestion technique et financière de vos immeubles. Nous assurons l’entretien, le suivi des charges et la valorisation de votre patrimoine.",
      subtitle: "Nous gérons pour vous :",
      points: parseList("gestion_service2_points", [
        "Entretien des parties communes.",
        "Coordination des travaux de rénovation.",
        "Négociation des contrats d’assurance.",
        "Optimisation des charges de copropriété."
      ]),
      image: contentMap.gestion_service2_image || "/images/louer-loca2.png",
      align: "right"
    },
    {
      id: "commerciaux",
      title: contentMap.gestion_service3_title || "Biens commerciaux",
      icon: Store,
      description: contentMap.gestion_service3_desc || "Nous accompagnons les propriétaires de locaux commerciaux avec une gestion adaptée aux exigences professionnelles et à la rentabilité du bien.",
      subtitle: "Services spécifiques :",
      points: parseList("gestion_service3_points", [
        "Rédaction de baux commerciaux.",
        "Révision des loyers selon les indices.",
        "Gestion des dépôts de garantie.",
        "Conseil en stratégie immobilière."
      ]),
      image: contentMap.gestion_service3_image || "/images/louer-loca3.png",
      align: "left"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={contentMap.gestion_hero_image || "/images/gere-bien.webp"}
            alt="Gestion Immobilière Limobilié"
            fill
            sizes="100vw"
            className="object-cover opacity-40 scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-950/20 z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20"
        >
          <div className="space-y-8 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-2 shadow-xl shadow-red-900/20"
            >
              <ShieldCheck size={16} />
              {contentMap.gestion_hero_badge || "Partenaire de confiance"}
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {contentMap.gestion_hero_title ? contentMap.gestion_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.gestion_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>Faites-nous <span className="text-[var(--color-primary)]">confiance</span> pour gérer vos biens</>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              {contentMap.gestion_intro_text || "Une gestion sur-mesure pour sécuriser vos revenus et valoriser votre patrimoine immobilier en Côte d'Ivoire."}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* DETAILED SERVICES SECTIONS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {managementServices.map((service: any, index: number) => (
            <div 
              key={service.id} 
              className={`flex flex-col ${service.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute -inset-6 bg-slate-50 rounded-[48px] blur-xl opacity-60"></div>
                <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl text-[var(--color-primary)]">
                    <service.icon size={32} />
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="text-6xl font-black font-heading tracking-tighter opacity-20">0{index + 1}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-heading leading-tight tracking-tight">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-primary)]">
                    {service.subtitle}
                  </h4>
                  <ul className="space-y-4">
                    {service.points.map((point: string, i: number) => (
                      <li key={i} className="flex items-start gap-4">
                        <CheckCircle2 size={24} className="text-[var(--color-primary)] shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium text-lg leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button 
                    onClick={() => openWhatsApp(service.title)}
                    className="group inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-5 rounded-full text-lg font-black hover:bg-[var(--color-primary)] transition-all shadow-xl active:scale-95"
                  >
                    <Phone size={20} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
                    Nous contacter sur WhatsApp
                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL GLOBAL CTA */}
      <section className="py-24 bg-slate-50 text-center border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            {contentMap.gestion_cta_title ? contentMap.gestion_cta_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.gestion_cta_title.split('\\n').length - 1 && <br />}</React.Fragment>) : "Prêt à déléguer la gestion de votre patrimoine ?"}
          </h2>
          <p className="text-xl text-slate-500 font-medium whitespace-pre-wrap">
            {contentMap.gestion_cta_subtitle || "Contactez notre équipe de gestionnaires immobiliers et gagnez en sérénité dès aujourd'hui."}
          </p>
          <div className="pt-8">
            <button 
              onClick={() => openWhatsApp("Gestion de mon patrimoine global")}
              className="bg-[var(--color-primary)] text-white px-12 py-6 rounded-[24px] text-xl font-black hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/40 active:scale-95 flex items-center justify-center gap-4 mx-auto"
            >
              <Phone size={24} />
              Prendre rendez-vous avec un expert
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
