"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Handshake, 
  ArrowRight, 
  X, 
  HeartHandshake, 
  Shirt, 
  Globe,
  LucideIcon,
  Rocket,
  CheckCircle
} from "lucide-react";
import * as motion from "framer-motion/client"
import React from "react";

interface Partner {
  id: string;
  name: string;
  icon: LucideIcon;
  summary: string;
  image: string;
  facebook: string;
  content: React.ReactNode;
}

export default function PartenaireClient({ content }: { content: Record<string, string> }) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const partners = [
    {
      id: "storiz",
      name: "STORIZ",
      icon: Shirt,
      summary: "STORIZ, bien plus qu’une marque de mode : une histoire que vous portez.",
      image: "/images/partenaire1.png",
      facebook: "https://facebook.com/share/17Nzh5AWqS/",
      content: (
        <div className="space-y-6 text-slate-600">
          <p className="text-lg font-medium leading-relaxed text-slate-800">
            STORIZ ne se contente pas de créer des vêtements ; elle donne vie à des récits. Chaque pièce de la collection s’inspire du parcours inspirant d&apos;une célébrité : ses débuts modestes, ses épreuves marquantes et ses victoires éclatantes.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-slate-900">
            <p>
              Derrière chaque couture se cache une ambition et une leçon de vie. Porter STORIZ, ce n’est pas simplement s&apos;habiller, c&apos;est incarner une trajectoire, une vision et un <strong>mindset de réussite</strong>.
            </p>
          </div>
          <p>
            STORIZ transforme la mode en une mémoire vivante. Parce que si le style passe, les histoires, elles, marquent à jamais.
          </p>
        </div>
      )
    },
    {
      id: "impact",
      name: "Impact – TÉDIE ANGE FOUNDATION",
      icon: Globe,
      summary: "Quand les lieux de vie deviennent des accélérateurs d’impact social.",
      image: "/images/impact.jpeg", // Existing image from Impact page
      facebook: "https://facebook.com/people/Limobilié-Impact/61580274822921/",
      content: (
        <div className="space-y-8 text-slate-600">
          <p className="text-xl font-bold font-heading text-slate-900">
            Transformer le profit en moteur de changement social durable.
          </p>
          
          <div>
            <h4 className="flex items-center gap-2 text-lg font-black font-heading text-[var(--color-primary)] mb-2">
              <Rocket size={20} /> Le Concept Impact
            </h4>
            <p className="bg-slate-50 p-4 rounded-2xl">
              Un programme de la TÉDIE ANGE FOUNDATION où les entreprises s&apos;engagent à reverser 10% de leurs bénéfices pour lutter contre le cancer infantile, la faim et la précarité.
            </p>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-lg font-black font-heading text-[var(--color-primary)] mb-2">
              <Handshake size={20} /> Votre Rôle de Partenaire
            </h4>
            <p className="bg-slate-50 p-4 rounded-2xl">
              En tant que lieu de vie (Bar, Lounge, Restaurant), vous devenez un tremplin : vos espaces permettent aux entreprises Impact de croître et donc de financer plus d&apos;actions sociales.
            </p>
          </div>

          <div className="bg-red-50 border border-red-100 p-6 rounded-[24px]">
             <h4 className="font-bold text-red-900 mb-4">Pourquoi nous rejoindre ?</h4>
             <ul className="space-y-3">
               <li className="flex items-center gap-2"><CheckCircle size={18} className="text-[var(--color-primary)] shrink-0"/><strong className="text-red-700">Impact :</strong> Acteur direct de la lutte contre la pauvreté.</li>
               <li className="flex items-center gap-2"><CheckCircle size={18} className="text-[var(--color-primary)] shrink-0"/><strong className="text-red-700">Éthique :</strong> Image de marque responsable et humaine.</li>
               <li className="flex items-center gap-2"><CheckCircle size={18} className="text-[var(--color-primary)] shrink-0"/><strong className="text-red-700">Réseau :</strong> Hub de rencontre pour entrepreneurs engagés.</li>
               <li className="flex items-center gap-2"><CheckCircle size={18} className="text-[var(--color-primary)] shrink-0"/><strong className="text-red-700">Liberté :</strong> Aucun risque ni contrainte financière.</li>
             </ul>
          </div>

          <p className="text-center italic text-lg font-medium text-slate-500 py-4 font-heading">
            « En ouvrant vos portes, vous permettez aux entreprises de grandir... et à la solidarité de sauver plus de vies. »
          </p>
        </div>
      )
    },
    {
      id: "fondation",
      name: "Tédie Ange Foundation",
      icon: HeartHandshake,
      summary: "Une organisation humanitaire dédiée à la lutte contre la précarité.",
      image: "/images/partenaire3.png", 
      facebook: "https://facebook.com/share/174Tkcub19/",
      content: (
        <div className="space-y-6 text-slate-600">
          <p className="text-lg font-medium leading-relaxed text-slate-800">
            <strong>TÉDIE ANGE FOUNDATION</strong> est une organisation humanitaire fondée par Monsieur TÉDIE ANGE, basée à Abidjan, elle se consacre avec détermination à la lutte contre la pauvreté sous toutes ses formes.
          </p>
          <div className="bg-[var(--color-primary)]/5 p-6 rounded-2xl border border-[var(--color-primary)]/10">
            <p className="text-slate-800 font-medium">
              La fondation s’engage à soutenir les populations les plus vulnérables à travers des programmes sociaux, éducatifs et économiques à fort impact communautaire.
            </p>
          </div>
          <p>
            Portée par une vision profondément humaine et responsable, la fondation œuvre pour l’autonomisation, la dignité et la restauration de l’espoir. Elle privilégie des solutions durables et structurantes capables de transformer positivement et durablement les trajectoires de vie.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content.partenaire_hero_image || "/images/louer-p1.png"} 
            alt="Nos Partenaires"
            fill
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-950/20 z-10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-10"
        >
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-xl"
            >
              <Handshake className="text-[var(--color-primary)]" size={16} />
              Réseau de confiance
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {content.partenaire_hero_title ? content.partenaire_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.partenaire_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>NOS <span className="text-[var(--color-primary)]">PARTENAIRES</span></>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md whitespace-pre-wrap"
            >
              {content.partenaire_hero_subtitle || "Un réseau solide pour sécuriser et réussir vos projets immobiliers"}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* PARTNERS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 group flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden bg-slate-50 flex items-center justify-center p-8 border-b border-slate-100">
                 <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-700"
                 />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black font-heading text-slate-900 mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-slate-600 font-medium mb-8 flex-grow">
                  {partner.summary}
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-auto">
                   <button 
                     onClick={() => setSelectedPartner(partner)}
                     className="flex items-center gap-2 text-[var(--color-primary)] font-bold hover:gap-4 transition-all uppercase tracking-wide text-sm"
                   >
                     Voir plus <ArrowRight size={18} />
                   </button>
                   <a 
                     href={partner.facebook} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="bg-slate-100 hover:bg-[#1877F2] hover:text-white text-slate-400 p-3 rounded-full transition-colors group/fb"
                     title={`Suivre ${partner.name} sur Facebook`}
                   >
                     <Globe size={20} className="group-hover/fb:scale-110 transition-transform" />
                   </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARTNER DETAIL MODAL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            onClick={() => setSelectedPartner(null)}
          ></div>
          
          <div 
            className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="relative p-6 md:p-10 border-b border-slate-100 flex items-start justify-between shrink-0 bg-slate-50">
               <div className="flex items-center gap-6">
                 <div className="relative w-20 h-20 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-lg border border-slate-100 overflow-hidden">
                   <Image 
                     src={selectedPartner.image}
                     alt={selectedPartner.name}
                     fill
                     className="object-contain p-2"
                   />
                 </div>
                 <div>
                   <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-heading leading-tight">
                    {selectedPartner.name}
                   </h2>
                 </div>
               </div>
               <button 
                  onClick={() => setSelectedPartner(null)}
                  className="bg-white hover:bg-slate-200 border border-slate-200 text-slate-500 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
               </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8 flex-grow custom-scrollbar bg-white">
              <p className="text-xl font-bold text-[var(--color-primary)] font-heading italic pb-6 border-b border-slate-100">
                {selectedPartner.summary}
              </p>
              
              <div className="prose prose-slate max-w-none">
                {selectedPartner.content}
              </div>
            </div>

            {/* Footer / CTA */}
            <div className="bg-slate-50 p-6 md:p-8 border-t border-slate-100 shrink-0">
               <a 
                  href={selectedPartner.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1864ce] text-white py-4 rounded-2xl font-black transition-colors shadow-lg shadow-blue-900/20 group"
                >
                  <Globe size={24} className="group-hover:-translate-y-1 transition-transform" /> 
                  Suivre sur Facebook
               </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
