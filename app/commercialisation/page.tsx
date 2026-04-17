import React from "react";
import Image from "next/image";
import { 
  Eye, 
  ShieldCheck, 
  Key, 
  MapPin, 
  Target, 
  Users, 
  Phone, 
  ArrowRight,
  Home
} from "lucide-react";
import * as motion from "framer-motion/client"
import { supabase } from "@/lib/supabase";

export const revalidate = 0;

export default async function ConfierCommercialisationPage() {
  const { data: dbContent } = await supabase.from('limobilie_content').select('key, value');
  const contentMap = dbContent?.reduce((acc, curr) => ({ ...acc, [curr.key]: curr.value }), {} as Record<string, string>) || {};

  const whatsappMessage = encodeURIComponent(`Bonjour Limobilié, je souhaite vous confier la commercialisation de mon bien immobilier.`);
  const whatsappUrl = `https://wa.me/2250545935673?text=${whatsappMessage}`;

  const parseObjectList = (key: string) => {
    try { 
      const val = contentMap[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "eye": return Eye;
      case "shield": return ShieldCheck;
      case "key": return Key;
      case "map": return MapPin;
      case "target": return Target;
      case "users": return Users;
      default: return Target;
    }
  };

  const dbBenefits = parseObjectList("com_benefits_list");
  const mainBenefits = dbBenefits.length > 0 ? dbBenefits.map((item: Record<string, string>) => ({
    title: item.title,
    description: item.description,
    icon: getIcon(item.icon_type)
  })) : [
    {
      title: "Visibilité Maximale",
      description: "Nous utilisons des supports marketing premium (photos pro, réseaux sociaux, réseaux d'investisseurs) pour attirer les meilleurs acheteurs.",
      icon: Eye
    },
    {
      title: "Transparence Totale",
      description: "Suivez l'avancement de votre vente en temps réel. Vous savez exactement où on en est, de la première visite à la signature.",
      icon: ShieldCheck
    },
    {
      title: "Gestion Clé en Main",
      description: "Nous nous occupons de tout : rédaction des contrats, vérification administrative et coordination avec les notaires.",
      icon: Key
    }
  ];

  const dbExpertise = parseObjectList("com_expertise_list");
  const teamExpertise = dbExpertise.length > 0 ? dbExpertise.map((item: Record<string, string>) => ({
    title: item.title,
    description: item.description,
    icon: getIcon(item.icon_type)
  })) : [
    {
      title: "Expertise locale",
      description: "Nos agents connaissent parfaitement le marché immobilier d'Abidjan et de sa région.",
      icon: MapPin
    },
    {
      title: "Visibilité ciblée",
      description: "Votre bien sera présenté sur nos plateformes et auprès de réseaux de clients qualifiés.",
      icon: Target
    },
    {
      title: "Accompagnement",
      description: "Nous vous guidons à chaque étape cruciale, de l'estimation initiale à la signature finale.",
      icon: Users
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={contentMap.com_hero_image || "/images/louer-p2.png"}
            alt="Confier la vente de son bien immobilier"
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
          <div className="space-y-6 max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4"
            >
              <Home className="text-[var(--color-primary)]" size={16} />
              {contentMap.com_hero_badge || "Service Propriétaire"}
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {contentMap.com_hero_title ? contentMap.com_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.com_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>CONFIER LA <span className="text-[var(--color-primary)]">COMMERCIALISATION</span> DE VOTRE BIEN</>}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md"
            >
              {contentMap.com_hero_subtitle || "Vendez votre bien plus vite et au meilleur prix avec Limobilié. L'expertise immobilière nouvelle génération à Abidjan."}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* INTRO PITCH */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-8 bg-slate-50 rounded-[48px] blur-xl opacity-60"></div>
              <div className="relative aspect-square md:aspect-video lg:aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src={contentMap.com_pitch_image || "/images/equipe-pro.png"}
                  alt="Équipe Limobilié Expertise"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-heading leading-tight tracking-tight">
                {contentMap.com_pitch_title ? contentMap.com_pitch_title : <>Vendez mieux, <span className="text-[var(--color-primary)]">vendez plus vite.</span></>}
              </h2>
              <div className="space-y-6 text-xl text-slate-600 leading-relaxed font-medium">
                <p>
                  {contentMap.com_pitch_text1 || "Vous souhaitez vendre une villa, un appartement ou un terrain ? Chez Limobilié, nous ne nous contentons pas de lister votre bien ; nous le propulsons sur le marché."}
                </p>
                <p>
                  {contentMap.com_pitch_text2 || "En tant que spécialistes locaux, nous combinons une maîtrise parfaite du terrain avec des outils digitaux innovants pour garantir une transaction fluide et sécurisée."}
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 italic">
                <p className="text-2xl font-black text-slate-900 font-heading">
                  &quot;{contentMap.com_pitch_quote || "Votre projet mérite l'excellence."}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POURQUOI CHOISIR LIMOBILIE (BENEFITS) */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
              {contentMap.com_benefits_title || "Pourquoi choisir Limobilié pour votre vente ?"}
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {mainBenefits.map((item: { title: string; description: string; icon: React.ElementType }, index: number) => (
              <div key={index} className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 hover:shadow-2xl hover:border-[var(--color-primary)]/30 transition-all duration-500 group">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-500 shadow-sm">
                  <item.icon size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTRE EQUIPE / EXPERTISE */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-start">
            <div className="w-full md:w-1/3 space-y-8 md:sticky md:top-32">
              <span className="text-[var(--color-primary)] font-black tracking-[0.4em] uppercase text-xs block">
                Notre équipe à votre service
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading leading-tight tracking-tight">
                {contentMap.com_expertise_title || "Pourquoi nous confier votre bien ?"}
              </h2>
              <p className="text-xl text-slate-500 font-medium">
                {contentMap.com_expertise_intro || "Notre équipe met à votre disposition son savoir-faire pour assurer la meilleure commercialisation."}
              </p>
            </div>
            
            <div className="w-full md:w-2/3 grid sm:grid-cols-2 gap-8">
              {teamExpertise.map((item: { title: string; description: string; icon: React.ElementType }, index: number) => (
                <div key={index} className={`p-8 bg-slate-50 border border-slate-100 rounded-[32px] space-y-6 ${index === 2 ? 'sm:col-span-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 font-heading">{item.title}</h3>
                  </div>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-32 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-primary)] blur-[150px] opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-black text-white font-heading tracking-tighter leading-none uppercase italic">
              {contentMap.com_cta_title ? contentMap.com_cta_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < contentMap.com_cta_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>PRÊT À CONFIER <br /> <span className="text-[var(--color-primary)]">VOTRE BIEN ?</span></>}
            </h2>
            <p className="text-2xl text-white/80 font-medium max-w-2xl mx-auto">
              Contactez-nous dès aujourd&apos;hui et laissez nos experts s&apos;occuper de tout.
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[40px] inline-flex flex-col items-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Contact Direct</p>
            <a href="tel:+2250545935673" className="text-3xl md:text-5xl font-black text-white font-heading hover:text-[var(--color-primary)] transition-colors flex items-center gap-4">
              <Phone className="text-[var(--color-primary)]" size={32} />
              +225 05 45 93 56 73
            </a>
          </div>

          <div className="flex justify-center pt-8">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[var(--color-primary)] text-white px-12 py-6 rounded-full text-2xl font-black hover:bg-red-700 transition-all shadow-2xl hover:shadow-red-500/40 active:scale-95 flex items-center gap-4"
            >
              Confier mon bien maintenant
              <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
