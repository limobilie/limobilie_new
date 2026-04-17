"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Connexion via Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        // Redirection vers le dashboard
        router.push("/admin");
      }
    } catch (err: any) {
      console.error(err);
      // Hardcoded fallback for now if Auth not yet set up on Supabase side
      if (email === "limobili225@gmail.com" && password === "PRUNI.23") {
         router.push("/admin");
         return;
      }
      setError("Identifiants incorrects ou compte introuvable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl p-8 border border-slate-100 relative overflow-hidden">
        {/* Motif décoratif */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] -z-0 opacity-50"></div>
        
        <div className="relative z-10 text-center mb-8 pt-4">
          <div className="inline-block relative h-[60px] w-[200px] mb-4">
            <Image src="/images/logo2.png" alt="Logo Limobilié" fill className="object-contain" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Accès Sécurisé</h1>
          <p className="text-slate-500 mt-2 font-medium">Espace réservé à l'administration</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start space-x-3 text-sm font-medium border border-red-100">
            <AlertCircle size={20} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Adresse E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
                placeholder="limobili225@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:bg-white focus:border-transparent transition-all outline-none font-medium placeholder-slate-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-red-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] mt-4 shadow-[0_8px_20px_-8px_rgba(220,38,38,0.5)] disabled:opacity-70"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Se connecter</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
