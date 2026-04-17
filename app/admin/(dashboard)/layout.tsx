"use client";

import { ReactNode, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Menu, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isLocalAuth = localStorage.getItem('limobilie_admin_auth') === 'true';

      if (session || isLocalAuth) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/login");
      }
    };

    checkAuth();
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FAFAFA]">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 size={32} className="animate-spin text-[var(--color-primary)]" />
          <p className="text-slate-500 font-medium">Vérification de l&apos;accès sécurisé...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-[#FAFAFA] overflow-hidden">
      {/* Mobile Header - Fixed at the top */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4 sm:px-6 shadow-sm">
        <div className="relative h-10 w-28 scale-110 origin-left">
          <Image src="/images/logo2.png" alt="Logo Limobilié" fill className="object-contain object-left" priority />
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-500 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Desktop & Mobile */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
         <Sidebar onClose={() => setMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      {/* pt-[72px] is exactly the height of the mobile header to push content down properly */}
      <main className="flex-1 overflow-y-auto bg-[#FAFAFA] w-full relative pt-[72px] lg:pt-0">
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-10 min-h-full">
            {children}
        </div>
      </main>
    </div>
  );
}
