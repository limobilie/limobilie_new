"use client";

import React from "react";
import Image from "next/image";
import { 
  BarChart4, 
  Lightbulb, 
  Scale, 
  Download, 
  Phone, 
  TrendingUp,
  ShieldCheck,
  Building,
  Home
} from "lucide-react";
import * as motion from "framer-motion/client"

export default function RapportsClient({ content }: { content: Record<string, string> }) {
  const openWhatsApp = (context: string) => {
    const message = encodeURIComponent(`Bonjour Limobilié, j'aimerais parler à un expert concernant : ${context}`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };
  const parseObjectList = (key: string) => {
    try { 
      const val = content[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const dynamicReports = parseObjectList("rapports_dynamic_list");

  interface ReportSection {
    title: string;
    text: string;
    icon: React.ElementType;
  }

  interface ReportData {
    title: string;
    subtitle: string;
    intro: string;
    pdf_url: string;
    wa_context: string;
    icon_type: string;
    sections: ReportSection[];
    matrice?: {
      title: string;
      l1_label: string;
      l1_val: string;
      l2_label: string;
      l2_val: string;
    };
  }

  const reports: ReportData[] = dynamicReports.length > 0 ? dynamicReports.map((r: Record<string, string>) => ({
    title: r.title || "Titre du rapport",
    subtitle: r.subtitle || "Sous-titre",
    intro: r.intro || "",
    pdf_url: r.pdf_url || "#",
    wa_context: r.wa_context || "Rapport",
    icon_type: r.icon_type || "chart",
    sections: [
      { title: r.sec1_title || "", text: r.sec1_text || "", icon: Building },
      { title: r.sec2_title || "", text: r.sec2_text || "", icon: TrendingUp },
      { title: r.sec3_title || "", text: r.sec3_text || "", icon: Home },
      { title: r.sec4_title || "", text: r.sec4_text || "", icon: Lightbulb },
    ].filter(s => s.title && s.text),
    matrice: r.r2_matrice_title ? {
      title: r.r2_matrice_title,
      l1_label: r.r2_matrice_l1_label || "",
      l1_val: r.r2_matrice_l1_val || "",
      l2_label: r.r2_matrice_l2_label || "",
      l2_val: r.r2_matrice_l2_val || ""
    } : undefined
  })) : [
    {
      title: "Analyse du Marché Côte d’Ivoire 2025",
      subtitle: "Étude complète sur l'évolution des prix au m² à Cocody, Marcory et Assinie.",
      intro: "Voici une analyse claire et structurée du marché immobilier en Côte d’Ivoire en 2025...",
      pdf_url: "/documents/analyse-marche-2026.pdf",
      wa_context: "Analyse du Marché 2025 C.I.",
      icon_type: "chart",
      sections: [
        { title: "1. Taille et perspectives", text: "En 2025, le marché immobilier ivoirien est important et en croissance, avec une valeur estimée à environ 377,62 milliards USD. D’ici 2029, il pourrait atteindre 459,6 milliards USD (+5% / an).", icon: Building },
        { title: "2. Dynamique régionale", text: "Abidjan reste en tête. Secteurs haut de gamme (Cocody, Marcory, Riviera) : Prix variant entre 1 200 000 et 1 500 000 FCFA/m².", icon: TrendingUp },
        { title: "3. Segments principaux", text: "Immobilier résidentiel dominant avec 335,5 milliards USD en 2025. Forte demande pour le moderne.", icon: Home },
        { title: "4. Facteurs clés", text: "✓ Accélérateurs : Croissance du PIB et digitalisation. ⚠ Freins : Accès difficile au crédit pour les primo-accédants.", icon: Lightbulb },
      ]
    },
    {
      title: "Guide de l'Investisseur 2025",
      subtitle: "Tout savoir sur la fiscalité immobilière et les zones à fort potentiel.",
      intro: "",
      pdf_url: "/documents/guide-investisseur-2025.pdf",
      wa_context: "Guide Investisseur",
      icon_type: "bulb",
      sections: [
        { title: "1️⃣ Pourquoi investir ?", text: "Urbanisation rapide, déficit de logements et rendements supérieurs à la moyenne africaine.", icon: Building },
        { title: "2️⃣ Grandes zones d’investissement", text: "Abidjan : Cocody/Riviera (Sécurité), Marcory (Premium), Bingerville (Spéculation). Villes secondaires : Bouaké, San Pedro, Yamoussoukro.", icon: TrendingUp },
        { title: "3️⃣ Budget & Stratégies", text: "De 5M FCFA (périphérie) à +100M FCFA (Promotion immobilière).", icon: Home },
      ],
      matrice: {
        title: "Matrice des Rendements",
        l1_label: "Haut Standing (Abidjan)",
        l1_val: "5 – 7 %",
        l2_label: "Villes secondaires",
        l2_val: "8 – 14 %"
      }
    },
    {
      title: "Rapport Juridique Foncière",
      subtitle: "Sécurisation foncière : comprendre l'ACD et les étapes clés de l'achat.",
      intro: "Analyser le cadre juridique applicable aux investissements immobiliers en Côte d’Ivoire.",
      pdf_url: "/documents/rapport-juridique-2025.pdf",
      wa_context: "Rapport Juridique Immobilier",
      icon_type: "scale",
      sections: [
        { title: "I. Objet du rapport", text: "Analyser le cadre juridique applicable aux investissements immobiliers en Côte d’Ivoire.", icon: Scale },
        { title: "II. Typologie des droits", text: "ACD (Arrêté de Concession Définitive) : Le titre le plus sécurisé en droit ivoirien. Il confère un droit de propriété absolu et définitif.", icon: ShieldCheck },
        { title: "III. Procédure légale", text: "01. Vérification de l'historique et du titre foncier. 02. Signature devant notaire. 03. Enregistrement officiel.", icon: Scale },
      ]
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "chart": return BarChart4;
      case "bulb": return Lightbulb;
      case "scale": return Scale;
      default: return BarChart4;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content.rapports_hero_image || "/images/rapport1.jpg"}
            alt="Rapports & Analyses Immobilières"
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
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              <TrendingUp className="text-[var(--color-primary)]" size={16} />
              {content.rapports_badge || "Intelligence Marché"}
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {content.rapports_title ? content.rapports_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.rapports_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>RAPPORTS & <span className="text-[var(--color-primary)]">ANALYSES</span></>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              {content.rapports_desc || "Éclairez vos décisions d'investissement avec nos données exclusives sur le marché ivoirien."}
            </motion.p>
            <p className="text-sm uppercase tracking-[0.4em] text-white/50 font-bold pt-4">
              {content.rapports_intro_quote || "Chez Limobilié, nous transformons les données en opportunités."}
            </p>
          </div>
        </motion.div>
      </section>

      {/* CONTENT LAYOUT */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {reports.map((report, index) => {
          const Icon = getIcon(report.icon_type);
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[40px] shadow-xl border border-slate-100 overflow-hidden"
            >
              <div className="bg-slate-950 text-white p-10 relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shrink-0">
                      <Icon size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black font-heading leading-tight">{report.title}</h2>
                      <p className="text-white/60 font-medium">{report.subtitle}</p>
                    </div>
                  </div>
                </div>
                <Icon size={200} className="absolute -right-10 -bottom-10 text-white/5 rotate-12 pointer-events-none" />
              </div>
              
              <div className="p-10 space-y-8">
                {report.intro && (
                  <p className="text-xl font-medium text-slate-500 italic pb-6 border-b border-slate-100">
                    &quot;{report.intro}&quot;
                  </p>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  {report.sections.map((section, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-lg font-black font-heading flex items-center gap-2">
                        <section.icon size={20} className="text-[var(--color-primary)]"/> {section.title}
                      </h4>
                      <p className="text-slate-600 bg-slate-50 p-4 rounded-2xl whitespace-pre-wrap">
                        {section.text}
                      </p>
                    </div>
                  ))}

                  {/* RENDEMENTS TABLE (if defined) */}
                  {report.matrice && (
                    <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-[32px] p-8 mt-4">
                      <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 text-center">
                        {report.matrice.title}
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex justify-between items-center">
                          <span className="font-bold text-slate-800">{report.matrice.l1_label}</span>
                          <span className="bg-slate-50 text-[var(--color-primary)] font-black px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">{report.matrice.l1_val}</span>
                        </div>
                        <div className="bg-[var(--color-primary)] p-6 rounded-2xl shadow-lg shadow-red-900/10 flex justify-between items-center text-white">
                          <span className="font-bold">{report.matrice.l2_label}</span>
                          <span className="bg-white text-[var(--color-primary)] font-black px-4 py-1.5 rounded-full shadow-md">{report.matrice.l2_val}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-slate-100">
                  <a href={report.pdf_url} download className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-4 rounded-xl font-bold transition-colors">
                    <Download size={20} /> Télécharger le PDF Complet
                  </a>
                  <button onClick={() => openWhatsApp(report.wa_context)} className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-4 rounded-xl font-bold transition-colors shadow-lg shadow-red-900/20">
                    <Phone size={20} /> Parler à un expert {report.icon_type === 'scale' ? 'juridique' : ''}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
