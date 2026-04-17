"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Home, Briefcase, ShoppingBag, Users, Zap, X } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  const menuGroups = [
    {
      title: "Navigation",
      items: [
        { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
      ]
    },
    {
      title: "Catalogue",
      items: [
        { name: "Biens Immobiliers", href: "/admin/biens", icon: ShoppingBag },
      ]
    },
    {
      title: "Pages: Principal",
      items: [
        { name: "Page: Accueil", href: "/admin/pages/accueil", icon: Home },
        { name: "Page: Acheter", href: "/admin/pages/acheter", icon: FileText },
        { name: "Page: Rapports", href: "/admin/pages/rapports", icon: FileText },
      ]
    },
    {
      title: "Pages: Services",
      items: [
        { name: "Commercialisation", href: "/admin/pages/commercialisation", icon: Briefcase },
        { name: "Travaux", href: "/admin/pages/travaux", icon: Briefcase },
        { name: "Gestion", href: "/admin/pages/gestion", icon: Briefcase },
      ]
    },
    {
      title: "Pages: Produits & Autres",
      items: [
        { name: "Tontine", href: "/admin/pages/tontine", icon: ShoppingBag },
        { name: "Impact", href: "/admin/pages/impact", icon: Zap },
        { name: "Équipe & Partenaires", href: "/admin/pages/compagnie", icon: Users },
      ]
    },
    {
      title: "Global",
      items: [
        { name: "Média: Galerie globale", href: "/admin/media", icon: ImageIcon },
        { name: "Paramètres Globaux", href: "/admin/parametres", icon: Settings },
      ]
    }
  ];

  const handleLogout = async () => {
    localStorage.removeItem('limobilie_admin_auth');
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-red-50 text-[var(--color-primary)] rounded-xl flex items-center justify-center font-black text-xl shadow-sm">
            L
          </div>
          <span className="font-black text-slate-800 tracking-wide">ADMIN</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-slate-600 bg-slate-50 rounded-lg">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="p-4 flex-1 space-y-8">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            {group.title !== "Navigation" && (
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 pl-3">
                {group.title}
              </p>
            )}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white font-semibold shadow-[0_4px_12px_rgba(220,38,38,0.3)]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-medium"
                    }`}
                  >
                    <item.icon 
                      size={18} 
                      className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-[var(--color-primary)]"} transition-colors`} 
                    />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 sticky bottom-0 bg-white">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium text-sm group"
        >
          <LogOut size={18} className="text-slate-400 group-hover:text-red-500" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
