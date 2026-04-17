import React from "react";
import { FileText, Image as ImageIcon, Briefcase, Settings, ArrowRight, LayoutTemplate } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const quickAccess = [
    { title: "GALERIE MÉDIAS", desc: "Gérez vos photos et vidéos", icon: ImageIcon, href: "/admin/media", baseColor: "blue" },
    { title: "PAGE ACCUEIL", desc: "Bannière, textes d'intro...", icon: LayoutTemplate, href: "/admin/pages/accueil", baseColor: "orange" },
    { title: "SERVICES", desc: "Gestion des offres", icon: Briefcase, href: "/admin/pages/commercialisation", baseColor: "green" },
    { title: "MESSAGERIE", desc: "Demandes de contact", icon: FileText, href: "/admin/parametres", baseColor: "purple" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-full pb-10">
      
      {/* Header Section */}
      <div className="space-y-4">
         <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-100/50">
          <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></div>
          <span className="text-[10px] sm:text-xs font-black text-[var(--color-primary)] tracking-widest uppercase">Espace Administration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase font-outfit break-words">
          Bienvenue, <span className="text-[var(--color-primary)]">ADMIN</span>
        </h1>
        <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-3xl font-medium leading-relaxed">
          Gérez l'impact de Limobilié. Modifiez vos contenus, mettez à jour la galerie et suivez vos différentes pages en temps réel.
        </p>
      </div>

      {/* Accès Rapides */}
      <div className="space-y-5">
        <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest px-1">Accès Rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
          {quickAccess.map((item, i) => (
            <Link 
              key={i} 
              href={item.href}
              className="group bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col h-full"
            >
              {/* Le conteneur occupe toute la hauteur dispo */}
              <div className="flex-1">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 mb-5 sm:mb-6 transition-transform group-hover:scale-110 duration-500 
                  ${item.baseColor === 'blue' ? 'bg-blue-50 text-blue-500' : ''}
                  ${item.baseColor === 'orange' ? 'bg-orange-50 text-orange-500' : ''}
                  ${item.baseColor === 'green' ? 'bg-green-50 text-green-500' : ''}
                  ${item.baseColor === 'purple' ? 'bg-purple-50 text-purple-500' : ''}
                `}>
                  <item.icon size={24} className="sm:w-7 sm:h-7" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-wide mb-1.5 group-hover:text-[var(--color-primary)] transition-colors">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6 line-clamp-2">{item.desc}</p>
              </div>
              
              <div className="flex items-center text-[10px] sm:text-xs font-bold text-slate-400 tracking-widest uppercase group-hover:text-[var(--color-primary)] transition-colors mt-auto">
                <span>Éditer</span>
                <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activités Récentes (Style Tableau) */}
      <div className="space-y-5">
        <h2 className="text-xs sm:text-sm font-black text-slate-900 uppercase tracking-widest px-1">Activités Récentes</h2>
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden text-sm">
          <div className="hidden lg:grid grid-cols-12 gap-4 p-5 border-b border-slate-100 bg-slate-50/80 text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-12 md:col-span-6">Action</div>
            <div className="col-span-12 md:col-span-4">Date & Heure</div>
            <div className="col-span-12 md:col-span-2 text-right">Statut</div>
          </div>
          
          <div className="divide-y divide-slate-100/80">
            {[
              { action: "Mise à jour de la Galerie (3 photos)", date: "Il y a 2 heures", status: "Terminé" },
              { action: "Modification : Page Accueil (Bannière)", date: "Hier à 14:30", status: "Terminé" },
              { action: "Ajout : Rapport Immobilier Q2", date: "15 Avril 2026", status: "Terminé" },
              { action: "MAJ Partenaire : Nouvelle entreprise", date: "10 Avril 2026", status: "Terminé" },
            ].map((row, i) => (
              <div key={i} className="flex flex-col lg:grid lg:grid-cols-12 gap-3 p-5 hover:bg-slate-50/50 transition-colors">
                <div className="col-span-12 lg:col-span-6 flex flex-row items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                     <Settings size={14} />
                  </div>
                  <span className="text-sm font-bold text-slate-700 truncate">{row.action}</span>
                </div>
                
                <div className="col-span-6 lg:col-span-4 flex items-center text-xs sm:text-sm text-slate-500 font-medium pl-11 lg:pl-0">
                  {row.date}
                </div>
                
                <div className="col-span-6 lg:col-span-2 flex items-center justify-end absolute lg:static right-5 mt-2 lg:mt-0">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                    {row.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 text-center">
            <button className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[var(--color-primary)] transition-colors inline-flex items-center">
              Voir tout l'historique <ArrowRight size={14} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
