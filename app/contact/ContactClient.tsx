"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  MapPin,
  Mail,
  MessageCircle,
  Clock,
  ArrowRight
} from "lucide-react";

export default function ContactClient({ content }: { content: Record<string, string> }) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: ""
  });

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Merci de remplir au moins votre nom et votre message.");
      return;
    }
    const text = `Bonjour Limobilié.\nJe suis ${formData.name}.\n${formData.subject ? `\nSujet : ${formData.subject}\n` : ''}\nMessage :\n${formData.message}`;
    window.open(`https://wa.me/2250545935673?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert("Merci de remplir au moins votre nom et votre message.");
      return;
    }
    const body = `Bonjour Limobilié.\n\nJe suis ${formData.name}.\n\nMessage :\n${formData.message}`;
    const subject = formData.subject || `Nouveau message de ${formData.name}`;
    window.location.href = `mailto:${content.contact_email || "info@limobilie.ci"}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gere-bien.webp" // An elegant background
            alt="Contactez Limobilié"
            fill
            sizes="100vw"
            className="object-cover opacity-30 scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-slate-950/80 to-slate-950 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-10">
          <div className="space-y-6 max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4">
              <MessageCircle className="text-[var(--color-primary)]" size={16} />
              Contactez-nous
            </span>
            <h1 className="text-4xl md:text-6xl font-black font-heading leading-tight tracking-tighter uppercase italic">
              {content.contact_title ? content.contact_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.contact_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>PARLONS DE VOTRE <span className="text-[var(--color-primary)]">PROJET</span></>}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium tracking-tight max-w-2xl mx-auto leading-relaxed whitespace-pre-wrap">
              {content.contact_subtitle || "Une expertise immobilière à votre écoute pour un accompagnement sur mesure."}
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">

          {/* Left Column: Info Boxes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 flex items-start gap-6 group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-red-50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading mb-2">Appelez-nous</h3>
                <a href={`tel:${content.contact_phone || "+2250545935673"}`} className="text-lg font-medium text-slate-600 hover:text-[var(--color-primary)] transition-colors">
                  {content.contact_phone || "+225 05 45 93 56 73"}
                </a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-100 flex items-start gap-6 group hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-red-50 text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 font-heading mb-2">Adresse</h3>
                <p className="text-lg font-medium text-slate-600">
                  Côte d’Ivoire, Abidjan<br />
                  Bingerville, Paris-Village
                </p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[32px] shadow-2xl flex items-center gap-4 text-white">
              <Clock className="text-[var(--color-primary)] shrink-0" size={32} />
              <p className="text-lg font-medium font-heading">
                Réponse généralement en moins de <span className="text-[var(--color-primary)] font-black">1 heure</span>.
              </p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-slate-100 flex flex-col h-full">
            <h2 className="text-3xl font-black font-heading text-slate-900 mb-8">Envoyez-nous un message</h2>

            <form className="space-y-6 flex-grow flex flex-col">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Nom & Prénom <span className="text-[var(--color-primary)]">*</span></label>
                <input
                  type="text"
                  placeholder="Ex: Jean Kouassi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium placeholder:text-slate-400 text-slate-900"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Sujet de votre demande</label>
                <input
                  type="text"
                  placeholder="Ex: Achat de terrain / Devis"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium placeholder:text-slate-400 text-slate-900"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2 flex-grow flex flex-col">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Votre message <span className="text-[var(--color-primary)]">*</span></label>
                <textarea
                  placeholder="Détaillez votre préoccupation ici..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all font-medium placeholder:text-slate-400 text-slate-900 min-h-[160px] flex-grow resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <div className="pt-6 grid sm:grid-cols-2 gap-4">
                <button
                  onClick={handleEmail}
                  className="flex items-center justify-center gap-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black py-4 px-6 rounded-2xl transition-all border border-slate-200"
                >
                  <Mail size={20} /> Envoyer par Mail
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="group flex items-center justify-center gap-3 bg-[var(--color-primary)] hover:bg-red-700 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-red-900/20 active:scale-95"
                >
                  <MessageCircle size={20} />
                  Continuer sur WhatsApp
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform ml-1" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
