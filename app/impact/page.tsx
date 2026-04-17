import { supabase } from "@/lib/supabase";
import * as motion from "framer-motion/client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Users,
  GraduationCap,
  ArrowRight,
  Award
} from "lucide-react";

export const revalidate = 0;

export default async function ImpactPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  const initiatives = [
    {
      id: "action-coeur",
      tag: "Santé & Enfance",
      title: contentMap.impact_action1_title || "Action Cœur",
      subtitle: contentMap.impact_action1_subtitle || "Limobilié soutient la lutte contre le cancer infantile",
      description: contentMap.impact_action1_desc || "Parce que chaque vie est précieuse, Limobilié s'engage : une partie des commissions de chaque transaction est reversée pour financer les soins et les traitements des enfants atteints de cancer.",
      quote: "Ensemble, transformons l'immobilier en un espoir de guérison.",
      video: contentMap.impact_action1_video || "/videos/impac1.mp4",
      icon: Heart,
      align: "left"
    },
    {
      id: "engagement-social",
      tag: "Solidarité",
      title: contentMap.impact_action2_title || "Engagement Social",
      subtitle: contentMap.impact_action2_subtitle || "Don à l'Orphelinat de Bingerville",
      description: contentMap.impact_action2_desc || "Plus qu'une entreprise, Limobilié est un acteur du cœur. Nous avons récemment soutenu l'Orphelinat de Bingerville par un don de vivres et de matériel essentiel pour améliorer le quotidien des enfants.",
      quote: "Chaque achat chez nous contribue à offrir un sourire et un avenir à ceux qui en ont le plus besoin.",
      video: contentMap.impact_action2_video || "/videos/impac2.mp4",
      icon: Users,
      align: "right"
    },
    {
      id: "education",
      tag: "Éducation",
      title: contentMap.impact_action3_title || "Éducation",
      subtitle: contentMap.impact_action3_subtitle || "Kits Scolaires & Écoles",
      description: contentMap.impact_action3_desc || "Parce que l'avenir se construit dès l'école, nous accompagnons la scolarisation des enfants en zone rurale. L'éducation est le socle sur lequel nous bâtissons les cités de demain.",
      video: contentMap.impact_action3_video || "/videos/impac3.mp4",
      icon: GraduationCap,
      align: "left"
    }
  ];

  const programPoints = [
    {
      number: "1",
      title: "Présentation Générale",
      content: "LIMOBILIÉ participe au programme Social Impact de la TAF. Chaque acquisition devient un acte d’impact social direct, mis en œuvre avec TÉDIE ANGE FOUNDATION (TAF)."
    },
    {
      number: "2",
      title: "Vision",
      content: "Faire de l’immobilier un levier durable de transformation sociale. LIMOBILIÉ Impact ambitionne de créer de la valeur économique tout en générant un impact humain concret dans un cadre structuré et transparent."
    },
    {
      number: "3",
      title: "Mission",
      content: "La mission est de financer des actions sociales communautaires essentielles, via un pourcentage prélevé sur chaque vente immobilière, exécuté par TAF."
    },
    {
      number: "4",
      title: "Promesse du programme",
      content: "Chaque bien immobilier acquis contribue directement à sauver, améliorer ou transformer des vies. Chaque client devient à la fois investisseur immobilier et acteur du développement social."
    },
    {
      number: "5",
      title: "Mécanisme opérationnel",
      subpoints: [
        {
          subtitle: "5.1. Principe financier",
          text: "5% à 10% du montant de chaque transaction affecté au Fonds LIMOBILIÉ Impact. Fonds dédié uniquement aux actions sociales."
        },
        {
          subtitle: "5.2. Gouvernance financière",
          text: "Séparation stricte entre revenus commerciaux et fonds d’impact. Suivi financier assuré par TAF. Rapports d’utilisation périodiques."
        }
      ]
    },
    {
      number: "6",
      title: "Axes d’impact prioritaires",
      list: [
        "Santé communautaire : soins, maternités rurales, accès aux soins de base",
        "Eau & assainissement : forages, eau potable, sensibilisation sanitaire",
        "Éducation & protection de l’enfance : scolarisation, fournitures, soutien éducatif",
        "Logement social d’urgence : réhabilitation de logements précaires, assistance aux familles vulnérables"
      ]
    },
    {
      number: "7",
      title: "Rôles et responsabilités",
      subpoints: [
        {
          subtitle: "7.1. Rôle de LIMOBILIÉ",
          text: "Identification et commercialisation des biens immobiliers. Intégration du programme LIMOBILIÉ Impact. Communication et collecte des fonds."
        },
        {
          subtitle: "7.2. Rôle de TAF",
          text: "Gestion opérationnelle des actions sociales. Suivi et évaluation des impacts. Respect de l’éthique et de la dignité des bénéficiaires."
        }
      ]
    },
    {
      number: "8",
      title: "Transparence & Traçabilité",
      list: [
        "Certificat LIMOBILIÉ Impact nominatif",
        "Rapport d’impact simplifié",
        "Photos, indicateurs et témoignages réguliers",
        "Communication publique des actions réalisées"
      ]
    },
    {
      number: "9",
      title: "Cibles stratégiques",
      list: [
        "La diaspora africaine",
        "Cadres et entrepreneurs",
        "Investisseurs à impact",
        "Entreprises engagées dans la RSE",
        "Organisations et institutions partenaires"
      ]
    },
    {
      number: "10",
      title: "Conclusion",
      content: "LIMOBILIÉ Impact incarne une nouvelle génération de projets immobiliers : responsables, humains, mesurables et durables. Investir dans la terre, c’est aussi investir dans la vie."
    }
  ];

  return (
    <div className="flex flex-col font-sans bg-white text-slate-900">
      {/* INSTITUTIONAL HERO */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src={contentMap.impact_hero_video || "/videos/video-acceuil.mp4"} type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-slate-950/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-slate-950/20 z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white"
        >
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              <Award className="text-[var(--color-primary)]" size={16} />
              {contentMap.impact_hero_badge || "Impact Social"}
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {contentMap.impact_page_title || "LIMOBILIÉ IMPACT"}
            </h1>
          </div>
        </motion.div>
      </section>

      {/* STORYTELLING SECTIONS (VIDEOS) */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-40">
          {initiatives.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col ${item.align === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}
            >
              <div className="w-full lg:w-3/5">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-slate-100">
                  <video controls className="w-full h-full object-cover">
                    <source src={item.video} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="w-full lg:w-2/5 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold font-heading text-slate-900 leading-tight">
                    {item.id === "action-coeur" ? (contentMap.impact_action_title || item.title) : (item.id === "engagement-social" ? (contentMap.impact_solidarity_title || item.title) : item.title)}
                  </h2>
                  <p className="text-xl text-[var(--color-primary)] font-bold italic">
                    {item.subtitle}
                  </p>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {item.id === "action-coeur" ? (contentMap.impact_action_desc || item.description) : (item.id === "engagement-social" ? (contentMap.impact_solidarity_desc || item.description) : item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE SIMPLE ORGANIZED PROGRAM SECTION */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {programPoints.map((point) => (
              <div key={point.number} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-1.5 h-12 bg-[var(--color-primary)] rounded-full"></div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 font-heading">
                    {point.number}. {point.title}
                  </h3>
                </div>

                <div className="pl-8 space-y-8">
                  {point.content && (
                    <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
                      {point.content}
                    </p>
                  )}

                  {point.subpoints && (
                    <div className="space-y-8">
                      {point.subpoints.map((sub, idx) => (
                        <div key={idx} className="space-y-2">
                          <h4 className="text-xl font-bold text-[var(--color-primary)]">
                            {sub.subtitle}
                          </h4>
                          <p className="text-lg text-slate-600 leading-relaxed">
                            {sub.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {point.list && (
                    <ul className="space-y-4 list-disc pl-5 text-lg text-slate-600 leading-relaxed">
                      {point.list.map((li, idx) => (
                        <li key={idx} className="marker:text-[var(--color-primary)]">{li}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-20 border-t border-slate-200 text-center space-y-10">
            <div className="inline-block bg-white p-8 rounded-3xl shadow-xl border border-slate-100 transform -rotate-2">
              <span className="text-6xl font-black text-[var(--color-primary)] font-heading">10%</span>
              <p className="text-sm font-black text-slate-900 uppercase tracking-widest mt-2">reversés à la TAF</p>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-heading leading-tight tracking-tighter">
                PRÊT À FAIRE <br /> LA <span className="text-[var(--color-primary)]">DIFFÉRENCE ?</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                Ne vous contentez pas d&apos;acheter un terrain. Participez au changement. Chaque achat chez LIMOBILIÉ finance directement un projet social concret.
              </p>
              <div className="flex flex-col items-center gap-8 pt-4">
                <Link href="/acheter" className="bg-[var(--color-primary)] text-white px-12 py-6 rounded-full text-2xl font-black hover:bg-red-700 transition-all shadow-xl flex items-center gap-4">
                  Voir nos terrains et acheter
                  <ArrowRight size={28} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER LOGOS */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 opacity-30 grayscale">
          <Link href="/" className="relative h-12 w-32">
            <Image 
              src="/images/logo2.png" 
              alt="Limobilié Logo" 
              fill 
              sizes="(max-width: 768px) 128px, 128px"
              className="object-contain" 
            />
          </Link>
          <div className="h-8 w-px bg-slate-300 hidden md:block"></div>
          <p className="text-xl font-black text-slate-500 font-heading uppercase tracking-tighter">TÉDIE ANGE FOUNDATION</p>
        </div>
      </section>
    </div>
  );
}
