"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Newspaper, 
  ArrowRight, 
  X, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck,
  Calendar,
  Phone,
  LucideIcon
} from "lucide-react";
import * as motion from "framer-motion/client"
import React from "react";

interface Article {
  id: string;
  category: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  image: string;
  date: string;
  content: React.ReactNode;
}

export default function BlogClient({ content }: { content: Record<string, string> }) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const openWhatsApp = (articleTitle: string) => {
    const message = encodeURIComponent(`Bonjour Limobilié, suite à la lecture de l'article "${articleTitle}", j'aimerais avoir un conseil d'expert.`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };

  const articles = [
    {
      id: "azaguie",
      category: "Conseil",
      icon: MapPin,
      title: "Investir dans l’immobilier à Azaguié",
      summary: "Découvrez pourquoi Azaguié est la nouvelle pépite du Grand Abidjan en 2026.",
      image: "/images/azague.png",
      date: "Avr 2026",
      content: (
        <div className="space-y-6 text-slate-600">
          <div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">1. Pourquoi Azaguié peut être un bon choix pour investir</h4>
            <p className="mb-4">
              <strong className="text-slate-800">Localisation stratégique :</strong> Azaguié est une commune située dans le GRAND ABIDJAN, à l’est/sud d’Abidjan. Elle bénéficie d’un bon réseau routier, à 20 minutes d’ABIDJAN via la Y4, proche de l’autoroute et de grands axes. Des bus SOTRA, le métro, et un aérodrome non loin y sont prévus, ce qui la rend accessible pour des projets résidentiels ou mixtes (résidence + commerce) à moindre coût comparé à Abidjan même.
            </p>
            <p>
              <strong className="text-slate-800">Développement péri-urbain :</strong> La zone est considérée comme en développement, avec une urbanisation progressive, ce qui peut faire monter la valeur des terrains et augmenter la demande locative à moyen terme.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold font-heading text-slate-900 mb-2">2. Aperçu des prix des terrains à Azaguié (2025–2026)</h4>
            <p>
              Les prix varient selon la taille du lot, la localisation précise et les documents disponibles. Un terrain approuvé y coûte de <strong className="text-[var(--color-primary)]">1.500.000 à 6.000.000 FCFA</strong> selon la zone.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "abidjan",
      category: "Conseil",
      icon: TrendingUp,
      title: "Investir dans l’immobilier à Abidjan",
      summary: "Découvrez les quartiers les plus rentables pour investir en toute sécurité en 2026.",
      image: "/images/blog1.jpg",
      date: "Mar 2026",
      content: (
        <div className="space-y-6 text-slate-600">
          <p>
            Le marché immobilier d&apos;Abidjan connaît une croissance sans précédent. En 2026, les zones comme Cocody Angré et la Riviera continuent de séduire, mais de nouvelles opportunités émergent à Anyama et Ebimpé grâce aux nouvelles infrastructures routières.
          </p>
          <div className="bg-slate-50 border-l-4 border-[var(--color-primary)] p-6 rounded-r-2xl">
            <h4 className="font-bold text-slate-900 mb-2">La stratégie gagnante</h4>
            <p>
              Pour un investissement locatif réussi, privilégiez les petites surfaces (2-3 pièces) qui offrent un rendement moyen record de <strong className="text-[var(--color-primary)]">8% à 10%</strong>. Il est crucial de vérifier l&apos;accès aux services de base avant tout achat.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "erreurs-terrain",
      category: "Conseil",
      icon: AlertTriangle,
      title: "Acheter un terrain : les erreurs à éviter",
      summary: "Nos conseils d'experts pour éviter les pièges lors de l’achat d’un terrain en Côte d'Ivoire.",
      image: "/images/terrain11.png",
      date: "Fév 2026",
      content: (
        <div className="space-y-6 text-slate-600">
          <p>
            L&apos;achat d&apos;un terrain est une étape cruciale qui ne tolère aucune imprécision. L&apos;erreur la plus fréquente (et souvent la plus coûteuse) est de ne pas vérifier scrupuleusement l&apos;<strong>ACD (Arrêté de Concession Définitive)</strong> auprès du Ministère de la Construction ou du cadastre.
          </p>
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
             <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><AlertTriangle size={20} className="text-red-500"/> Précautions Indispensables</h4>
             <ul className="list-disc list-inside space-y-2">
               <li>Assurez-vous que le terrain n&apos;est pas situé dans une zone non constructible.</li>
               <li>Vérifiez qu&apos;il n&apos;est pas réservé aux travaux d&apos;infrastructures publiques de l&apos;État.</li>
               <li><strong>Nous conseillons toujours :</strong> Réaliser systématiquement une levée topographique contradictoire avant de finaliser la transaction.</li>
             </ul>
          </div>
        </div>
      )
    },
    {
      id: "gestion-locative",
      category: "Conseil",
      icon: ShieldCheck,
      title: "Pourquoi confier la gestion locative ?",
      summary: "Gagnez du temps et sécurisez vos revenus locatifs grâce à un accompagnement professionnel.",
      image: "/images/louer-loca2.png",
      date: "Jan 2026",
      content: (
        <div className="space-y-6 text-slate-600">
          <p>
            Confier votre bien à Limobilié, c&apos;est l&apos;assurance d&apos;une tranquillité d&apos;esprit totale. Gérer un locataire au quotidien peut s&apos;avérer être un métier à plein temps et source de stress continu.
          </p>
          <p>
            Nous nous occupons de la sélection rigoureuse des locataires via une <strong>étude de solvabilité poussée</strong> pour écarter tout risque. De plus, nous gérons l&apos;intégralité de la rédaction des baux, le recouvrement des loyers chaque mois et le suivi technique des petits travaux d&apos;entretien.
          </p>
          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center">
             <span className="block text-4xl font-black text-[var(--color-primary)] mb-2">&lt; 2%</span>
             <p className="font-medium text-white/80">En moyenne, un bien géré par nos soins présente un taux d&apos;impayés inférieur à 2%.</p>
          </div>
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
            src={content.blog_hero_image || "/images/equipe1.jpg"} 
            alt="Actualités et conseils immobiliers"
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              <Newspaper className="text-[var(--color-primary)]" size={16} />
              Blog & Conseils
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {content.blog_hero_title ? content.blog_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.blog_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>ACTUALITÉS <br/> IMMOBILIÈRES</>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed drop-shadow-md whitespace-pre-wrap"
            >
              {content.blog_hero_subtitle || "Tout savoir pour réussir vos projets en Côte d’Ivoire"}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* BLOG GRID */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div 
              key={article.id} 
              className="bg-white rounded-[32px] overflow-hidden shadow-xl border border-slate-100 group flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="bg-[var(--color-primary)] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    {article.category}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar size={12} /> {article.date}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black font-heading text-slate-900 mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-600 font-medium mb-8 flex-grow">
                  {article.summary}
                </p>
                
                <button 
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-2 text-[var(--color-primary)] font-bold hover:gap-4 transition-all uppercase tracking-wide text-sm mt-auto"
                >
                  Lire l&apos;article <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
          <div 
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" 
            onClick={() => setSelectedArticle(null)}
          ></div>
          
          <div 
            className="relative bg-white w-full max-w-3xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col transform transition-all animate-in fade-in zoom-in-95 duration-300"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header Cover */}
            <div className="relative h-48 md:h-64 shrink-0">
               <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-slate-900/40"></div>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2 rounded-full transition-colors z-10"
                >
                  <X size={24} />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                   <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[var(--color-primary)] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">{selectedArticle.category}</span>
                    <selectedArticle.icon size={16} className="text-white/60" />
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black text-white font-heading leading-tight max-w-2xl text-balance">
                    {selectedArticle.title}
                   </h2>
                </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 md:p-10 space-y-8 flex-grow custom-scrollbar">
              <p className="text-lg font-medium text-slate-500 italic pb-6 border-b border-slate-100">
                {selectedArticle.summary}
              </p>
              
              <div className="prose prose-slate max-w-none">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer / CTA */}
            <div className="bg-slate-50 p-6 border-t border-slate-100 shrink-0">
               <button 
                  onClick={() => openWhatsApp(selectedArticle.title)}
                  className="w-full flex items-center justify-center gap-3 bg-slate-900 hover:bg-[var(--color-primary)] text-white py-4 rounded-2xl font-black transition-colors shadow-lg group"
                >
                  <Phone size={20} className="text-[var(--color-primary)] group-hover:text-white transition-colors" /> 
                  Poser une question à un expert
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
