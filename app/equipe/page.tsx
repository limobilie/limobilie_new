import { supabase } from "@/lib/supabase";
import * as motion from "framer-motion/client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

export const revalidate = 0;

export default async function EquipePage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  const parseObjectList = (key: string) => {
    try { 
      const val = contentMap[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const dynamicEngagements = parseObjectList("equipe_engagements_list");
  const engagementIcons = [Users, ShieldCheck, MapPin];

  interface EngagementData {
    title?: string;
    description?: string;
    icon: React.ElementType;
  }

  const engagements = dynamicEngagements.length > 0 ? dynamicEngagements.map((e: EngagementData, i: number) => ({
    title: e.title || "Titre",
    description: e.description || "Description...",
    icon: engagementIcons[i % engagementIcons.length]
  })) : [
    {
      title: contentMap.equipe_commit1_title || "Accompagnement",
      description: contentMap.equipe_commit1_desc || "Chaque client bénéficie d’un suivi adapté à ses besoins, de la première visite à la remise des clés.",
      icon: Users
    },
    {
      title: contentMap.equipe_commit2_title || "Biens de qualité",
      description: contentMap.equipe_commit2_desc || "Nous sélectionnons uniquement des biens fiables, sécurisés et à fort potentiel de valorisation.",
      icon: ShieldCheck
    },
    {
      title: contentMap.equipe_commit3_title || "Expertise locale",
      description: contentMap.equipe_commit3_desc || "Notre connaissance approfondie d’Abidjan et du Grand Abidjan garantit les meilleures opportunités du marché.",
      icon: MapPin
    }
  ];

  return (
    <div className="flex flex-col font-sans">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={contentMap.equipe_hero_image || "/images/equipe.jpeg"}
            alt="L'équipe Limobilié"
            fill
            className="object-cover opacity-40"
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
          className="relative z-20 text-center text-white px-4"
        >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-[var(--color-primary)] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-xl shadow-red-900/10"
            >
              {contentMap.equipe_hero_badge || "L'Humain d'abord"}
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-black font-heading leading-tight tracking-tighter uppercase drop-shadow-2xl">
              {contentMap.equipe_hero_title ? contentMap.equipe_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.equipe_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>NOTRE <span className="text-[var(--color-primary)]">ÉQUIPE</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto mt-6">
              {contentMap.equipe_intro_text || "Découvrez les visages derrière l'excellence de Limobilié."}
            </p>
        </motion.div>
      </section>

      {/* DIRECTOR SPOTLIGHT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            {/* Director Photo */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -inset-6 bg-slate-100 rounded-[48px]"></div>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
                <Image
                  src={contentMap.equipe_dir_image || "/images/photo1.jpeg"}
                  alt="Tédie Ange - Directeur Limobilié"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* Director Info */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <span className="text-[var(--color-primary)] font-black tracking-[0.4em] uppercase text-xs block">
                  Direction Générale
                </span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 font-heading leading-tight">
                  {contentMap.equipe_dir_name || "TÉDIE ANGE"}
                </h2>
                <p className="text-2xl font-bold text-slate-500 uppercase tracking-widest">
                  {contentMap.equipe_dir_role || "Directeur"}
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex items-center gap-6 group hover:border-[var(--color-primary)] transition-colors">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <Phone size={32} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Téléphone Direct</p>
                  <a href="tel:+2250787026518" className="text-2xl md:text-3xl font-black text-slate-900 font-heading cursor-pointer hover:text-[var(--color-primary)] transition-colors">
                    +225 07 87 02 65 18
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-xl text-slate-600 leading-relaxed font-medium italic border-l-4 border-slate-200 pl-6 whitespace-pre-wrap">
                  {contentMap.equipe_dir_quote || "\"Chez Limobilié, nous plaçons la satisfaction de nos clients au cœur de notre métier. Chaque projet est une aventure humaine que nous menons avec rigueur et passion.\""}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMITMENT SECTION */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-heading tracking-tight leading-none whitespace-pre-wrap">
              {contentMap.equipe_commit_title ? contentMap.equipe_commit_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.equipe_commit_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>NOTRE <span className="text-[var(--color-primary)] uppercase">ENGAGEMENT</span></>}
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed whitespace-pre-wrap">
              {contentMap.equipe_commit_subtitle || "Nous construisons des relations durables basées sur la confiance et l'expertise."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagements.map((item: EngagementData, index: number) => (
              <motion.div 
                key={index}
                className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-12">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-heading tracking-tighter leading-none uppercase">
            PARLONS DE VOTRE <span className="text-[var(--color-primary)]">PROJET</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium">
            Notre équipe d&apos;experts est à votre écoute pour vous conseiller et vous accompagner.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
            <Link href="/contact" className="bg-[var(--color-primary)] text-white px-12 py-5 rounded-full text-xl font-black hover:bg-red-700 transition-all shadow-xl hover:scale-105 active:scale-95 flex items-center gap-3 justify-center">
              Contactez-nous
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
