"use client";

import React, { useState, useEffect } from "react";
import { Save, Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { FaFacebook as Facebook, FaInstagram as Instagram, FaXTwitter as Twitter, FaLinkedin as Linkedin } from "react-icons/fa6";
import { supabase } from "@/lib/supabase";

const KEYS = ["global_email", "global_phone", "global_address", "global_facebook", "global_instagram", "global_linkedin", "global_twitter"] as const;
type Key = typeof KEYS[number];

const DEFAULTS: Record<Key, string> = {
  global_email: "limobili225@gmail.com",
  global_phone: "+225 05 45 93 56 73",
  global_address: "Côte d'Ivoire, Abidjan\nBingerville, Paris-Village",
  global_facebook: "https://www.facebook.com/share/1DEKHno3b9/",
  global_instagram: "https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==",
  global_linkedin: "",
  global_twitter: "",
};

export default function ParametresGlobaux() {
  const [formData, setFormData] = useState<Record<Key, string>>({ ...DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase
          .from("limobilie_content")
          .select("key, value")
          .in("key", [...KEYS]);
        if (error) throw error;
        if (data) {
          const loaded = { ...DEFAULTS };
          data.forEach(row => {
            if (row.key in loaded) loaded[row.key as Key] = row.value || "";
          });
          setFormData(loaded);
        }
      } catch (err) {
        console.error("Erreur chargement paramètres", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = KEYS.map(key => ({ key, value: formData[key], updated_at: new Date() }));
      const { error } = await supabase.from("limobilie_content").upsert(updates);
      if (error) throw error;
      showNotif("success", "Paramètres enregistrés avec succès !");
    } catch (err) {
      console.error(err);
      showNotif("error", "Impossible d'enregistrer les paramètres.");
    } finally {
      setSaving(false);
    }
  };

  const showNotif = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in w-full pb-12">

      {/* Notification toast */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-[200] p-4 rounded-2xl flex items-center space-x-3 shadow-2xl border animate-in slide-in-from-right-10 ${notification.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
          {notification.type === "success" ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
          <p className="font-bold text-sm">{notification.message}</p>
        </div>
      )}

      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Configuration</p>
        <h1 className="text-3xl font-black text-slate-900">Paramètres Globaux</h1>
        <p className="text-slate-400 text-sm mt-1 font-medium">Ces informations sont utilisées sur l&apos;ensemble du site.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">

        {/* Informations de contact */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informations de Contact</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">E-mail Principal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="email" value={formData.global_email} onChange={e => setFormData(p => ({...p, global_email: e.target.value}))} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Téléphone Affiché</label>
              <div className="relative">
                <Phone className="absolute left-4 top-4 text-slate-400" size={18} />
                <input type="text" value={formData.global_phone} onChange={e => setFormData(p => ({...p, global_phone: e.target.value}))} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">Adresse Physique</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-slate-400" size={18} />
                <textarea value={formData.global_address} onChange={e => setFormData(p => ({...p, global_address: e.target.value}))} className="w-full min-h-[90px] pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" />
              </div>
            </div>
          </div>
        </div>

        {/* Réseaux sociaux */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Réseaux Sociaux</h2>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              { icon: Facebook, key: "global_facebook" as Key, label: "Facebook" },
              { icon: Instagram, key: "global_instagram" as Key, label: "Instagram" },
              { icon: Linkedin, key: "global_linkedin" as Key, label: "LinkedIn" },
              { icon: Twitter, key: "global_twitter" as Key, label: "Twitter / X" },
            ]).map(social => (
              <div key={social.key} className="space-y-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide">{social.label}</label>
                <div className="relative">
                  <social.icon className="absolute left-4 top-4 text-slate-400" size={18} />
                  <input type="url" placeholder={`Lien ${social.label}...`} value={formData[social.key]} onChange={e => setFormData(p => ({...p, [social.key]: e.target.value}))} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-sm font-medium" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-slate-900 hover:bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 disabled:opacity-50">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{saving ? "Sauvegarde..." : "Enregistrer les Paramètres"}</span>
        </button>
      </form>
    </div>
  );
}
