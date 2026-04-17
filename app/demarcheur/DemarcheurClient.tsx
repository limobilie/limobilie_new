"use client";

import Image from "next/image";
import {
  Users,
  Wallet,
  Clock,
  GraduationCap,
  TrendingUp,
  MapPin,
  ArrowRight,
  Phone
} from "lucide-react";
import * as motion from "framer-motion/client"
import React from "react";

export default function DemarcheurClient({ content }: { content: Record<string, string> }) {
  const openWhatsApp = () => {
    const message = encodeURIComponent(`Bonjour Limobilié, je souhaite rejoindre votre réseau en tant que démarcheur indépendant.`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };

  const benefits = [
    {
      icon: Wallet,
      title: "Commissions attractives",
      description: "Gagnez des commissions motivantes sur chaque transaction conclue.",
      color: "text-[var(--color-primary)]",
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      icon: Clock,
      title: "Horaires flexibles",
      description: "Travaillez librement selon votre disponibilité et votre rythme.",
      color: "text-[var(--color-primary)]",
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      icon: GraduationCap,
      title: "Accompagnement pro",
      description: "Nous vous formons et vous accompagnons sur le terrain.",
      color: "text-[var(--color-primary)]",
      bg: "bg-red-50",
      border: "border-red-100"
    },
    {
      icon: TrendingUp,
      title: "Opportunités illimitées",
      description: "Accédez à un large réseau de biens et de clients en pleine croissance.",
      color: "text-[var(--color-primary)]",
      bg: "bg-red-50",
      border: "border-red-100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content.demarcheur_hero_image || "/images/equipe1.jpg"} 
            alt="Devenir démarcheur immobilier Limobilié"
            fill
            sizes="100vw"
            className="object-cover opacity-20 scale-105"
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
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-xl shadow-red-900/20"
            >
              <Users size={16} />
              Rejoignez le réseau
            </motion.span>
            <h1 className="text-4xl md:text-7xl font-black font-heading leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
              {content.demarcheur_hero_title ? content.demarcheur_hero_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.demarcheur_hero_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>DEVENEZ <span className="text-[var(--color-primary)]">DÉMARCHEUR</span> IMMOBILIER</>}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-3xl mx-auto leading-relaxed drop-shadow-md whitespace-pre-wrap"
            >
              {content.demarcheur_hero_subtitle || "Générez des revenus exceptionnels en apportant des biens et des clients à une agence de confiance."}
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* INTRODUCTION SECTION */}
      <section className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Pourquoi devenir démarcheur chez nous ?
          </h2>

          <div className="relative bg-slate-50 border border-slate-100 p-8 md:p-12 rounded-[40px] shadow-sm text-left">
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-[var(--color-primary)] rounded-[20px] flex items-center justify-center text-white shadow-xl -rotate-6">
              <MapPin size={32} />
            </div>
            <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed pl-4 md:pl-8">
              <p>
                Notre agence immobilière, basée à <strong className="text-slate-900">Abidjan</strong>, collabore étroitement avec des démarcheurs indépendants pour identifier des opportunités immobilières fiables à travers toute la région : terrains, maisons, immeubles commerciaux et nouveaux clients.
              </p>
              <div className="bg-slate-900 text-white p-6 rounded-2xl">
                <p>
                  <strong>Le meilleur atout ? Votre réseau.</strong> Que vous soyez étudiant en quête de revenus, entrepreneur ou un professionnel aguerri, vous pouvez démarrer <strong className="text-[var(--color-primary)]">sans expérience préalable</strong>. Nous valorisons votre connaissance du terrain et votre capacité à créer du lien.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 opacity-[0.03] pointer-events-none">
          <Users size={400} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading tracking-tight">
              Vos Avantages Exclusifs
            </h2>
            <div className="w-24 h-1.5 bg-[var(--color-primary)] mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`group bg-white p-8 rounded-[32px] border ${benefit.border} shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}
              >
                <div className={`w-16 h-16 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 font-heading mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-slate-950 text-center relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-slate-950 to-slate-950 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 space-y-10 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black font-heading tracking-tight italic uppercase">
            Prêt à booster vos revenus ?
          </h2>
          <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Contactez-nous dès maintenant et commencez à collaborer avec une agence immobilière qui récompense votre potentiel.
          </p>
          <div className="pt-8">
            <button
              onClick={openWhatsApp}
              className="group bg-[var(--color-primary)] text-white px-10 py-5 rounded-[24px] text-xl font-black hover:bg-white hover:text-slate-950 transition-all shadow-2xl hover:shadow-white/20 active:scale-95 flex items-center justify-center gap-4 mx-auto"
            >
              <Phone size={24} className="group-hover:text-[var(--color-primary)] transition-colors" />
              Continuer sur WhatsApp
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
