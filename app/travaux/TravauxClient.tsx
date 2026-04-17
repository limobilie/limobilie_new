"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { 
  Paintbrush, 
  Armchair, 
  Grid, 
  BoxSelect, 
  Layers, 
  HardHat, 
  Phone,
  ArrowRight,
  Hammer
} from "lucide-react";
import * as motion from "framer-motion/client"

export default function TravauxClient({ content }: { content: Record<string, string> }) {
  const contentMap = content;

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Bonjour Limobilié, je souhaite faire une demande de devis pour des travaux (BTP, rénovation, décoration).`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };

  const parseObjectList = (key: string) => {
    try { 
      const val = contentMap[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const dynamicServicesData = parseObjectList("travaux_services_list");
  const icons = [Paintbrush, Armchair, Grid, BoxSelect, Layers, HardHat];

  interface ServiceData {
    title?: string;
    desc?: string;
    image?: string;
  }

  const services = dynamicServicesData.length > 0 ? dynamicServicesData.map((s: ServiceData, i: number) => ({
    title: s.title || "Titre du service",
    desc: s.desc || "Description à venir...",
    image: s.image || "/images/btp1.jpg",
    icon: icons[i % icons.length]
  })) : [
    {
      title: contentMap.travaux_service1_title || "Peinture intérieure & extérieure",
      desc: contentMap.travaux_service1_desc || "Finitions propres et durables pour maisons et bureaux.",
      image: contentMap.travaux_service1_image || "/images/peinture1.jpg",
      icon: Paintbrush
    },
    {
      title: contentMap.travaux_service2_title || "Décoration & aménagement",
      desc: contentMap.travaux_service2_desc || "Optimisation de vos espaces avec élégance.",
      image: contentMap.travaux_service2_image || "/images/deco1.jpg",
      icon: Armchair
    },
    {
      title: contentMap.travaux_service3_title || "Pose de carrelage",
      desc: contentMap.travaux_service3_desc || "Carrelage moderne, précis et résistant.",
      image: contentMap.travaux_service3_image || "/images/deco2.jpg", 
      icon: Grid
    },
    {
      title: contentMap.travaux_service4_title || "Staff",
      desc: contentMap.travaux_service4_desc || "Plafonds et finitions haut de gamme.",
      image: contentMap.travaux_service4_image || "/images/staff1.jpg",
      icon: BoxSelect
    },
    {
      title: contentMap.travaux_service5_title || "Enduit",
      desc: contentMap.travaux_service5_desc || "Préparation et lissage parfait de vos surfaces.", 
      image: contentMap.travaux_service5_image || "/images/staff2.jpg",
      icon: Layers
    },
    {
      title: contentMap.travaux_service6_title || "Rénovation & BTP",
      desc: contentMap.travaux_service6_desc || "Travaux solides et bien planifiés.",
      image: contentMap.travaux_service6_image || "/images/btp1.jpg",
      icon: HardHat
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={contentMap.travaux_hero_image || "/images/btp1.jpg"}
            alt="Travaux de BTP et Rénovation"
            fill
            sizes="100vw"
            className="object-cover opacity-30 scale-105"
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-xl"
            >
              <Hammer className="text-[var(--color-primary)]" size={16} />
              {contentMap.travaux_hero_badge || "Division Technique"}
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {contentMap.travaux_hero_title ? contentMap.travaux_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.travaux_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>CONFIEZ-NOUS <span className="text-[var(--color-primary)]">VOS TRAVAUX</span></>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              {contentMap.travaux_hero_subtitle || "BTP, décoration et rénovation réalisés par des professionnels qualifiés pour transformer vos projets en réalité."}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
              {contentMap.travaux_services_title || "Nos Domaines d'Intervention"}
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service: any, index: number) => (
              <motion.div 
                key={index} 
                className="group relative h-96 rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <div className="absolute inset-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div>
                    <div className="w-14 h-14 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                      <service.icon size={28} />
                    </div>
                    <h3 className="text-2xl font-black text-white font-heading mb-3 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/80 font-medium leading-relaxed mt-2">
                      {service.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-slate-50 border-t border-slate-200 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-[15vw] md:text-[30vw] font-black font-heading leading-none -rotate-12 translate-y-20">BTP</span>
        </div>
        <div className="max-w-4xl mx-auto px-4 space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-heading tracking-tight leading-tight">
              {contentMap.travaux_cta_title ? contentMap.travaux_cta_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.travaux_cta_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>Un projet en vue ? <br /><span className="text-[var(--color-primary)] italic">Parlons-en.</span></>}
            </h2>
            <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
              {contentMap.travaux_cta_subtitle || "Nos experts sont à votre disposition pour évaluer vos besoins et fournir un devis détaillé."}
            </p>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={openWhatsApp}
              className="group bg-slate-900 text-white px-12 py-6 rounded-[24px] text-xl font-black hover:bg-[var(--color-primary)] transition-all shadow-xl active:scale-95 flex items-center gap-4"
            >
              <Phone size={24} className="text-[var(--color-primary)] group-hover:text-white transition-colors" />
              Demander un devis sur WhatsApp
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
