"use client";

import React, { useState } from "react";
import { Save, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaXTwitter as Twitter, FaLinkedin as Linkedin } from "react-icons/fa6";

export default function ParametresGlobaux() {
  const [formData, setFormData] = useState({
    email: "limobilie225@gmail.com",
    phone: "+225 05 45 93 56 73",
    address: "Côte d’Ivoire, Abidjan\nBingerville, Paris-Village",
    facebook: "https://www.facebook.com/share/1DEKHno3b9/",
    instagram: "https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==",
    linkedin: "",
    twitter: "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulation temporaire (cette page se connectera à Supabase dans l'étape suivante)
    setTimeout(() => {
      setSaving(false);
      alert("Paramètres enregistrés (Ceci est une maquette, attendez la liaison Supabase).");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in w-full pb-12">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">CONFIGURATION</p>
        <h1 className="text-3xl font-black text-slate-900">Paramètres Globaux</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact infos */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informations de Contact</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">E-mail Principal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Téléphone Affiché</label>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" 
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Adresse Physique</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea 
                  value={formData.address} 
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full min-h-[100px] pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reseaux sociaux */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
             <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Réseaux Sociaux (Liens URL)</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Facebook, key: "facebook", label: "Facebook" },
              { icon: Instagram, key: "instagram", label: "Instagram" },
              { icon: Linkedin, key: "linkedin", label: "LinkedIn" },
              { icon: Twitter, key: "twitter", label: "Twitter / X" },
            ].map((social) => (
              <div key={social.key} className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">{social.label}</label>
                <div className="relative">
                  <social.icon className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input 
                    type="url" 
                    placeholder={`Lien vers ${social.label}...`}
                    value={formData[social.key as keyof typeof formData]} 
                    onChange={(e) => setFormData({...formData, [social.key]: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-slate-900 hover:bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 disabled:opacity-50"
        >
          <Save size={18} />
          <span>{saving ? "Sauvegarde..." : "Enregistrer les Paramètres"}</span>
        </button>
      </form>
    </div>
  );
}
