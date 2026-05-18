"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  { name: "Accueil", href: "/" },
  {
    name: "Produits",
    children: [
      { name: "Tontine immobilière", href: "/tontine" },
      { name: "Limobilié impact", href: "/impact" },
    ],
  },
  {
    name: "Immobilier",
    children: [
      { name: "Acheter", href: "/acheter" },
      { name: "Rapports Immobiliers", href: "/rapports" },
    ],
  },
  {
    name: "Services",
    children: [
      { name: "Confier la commercialisation", href: "/commercialisation" },
      { name: "Confier vos travaux", href: "/travaux" },
      { name: "Faire gérer votre bien", href: "/gestion" },
    ],
  },
  {
    name: "Partenariat",
    children: [
      { name: "Partenaire", href: "/partenaire" },
      { name: "Devenir démarcheur", href: "/demarcheur" },
    ],
  },
  {
    name: "Compagnie",
    children: [
      { name: "Notre équipe", href: "/equipe" },
      { name: "Blog", href: "/blog" },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Bloquer le défilement quand le menu est ouvert (Scroll Lock)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Fermer le dropdown quand on clique en dehors (essentiel pour le tactile)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (activeDropdown && !(e.target as HTMLElement).closest(".relative.group")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [activeDropdown]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-[1000] transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-md border-b border-slate-100"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-28">
            {/* Logo Section - Professional Sizing */}
            <div className="flex items-center">
              <Link href="/" className="relative block h-[50px] w-[140px] md:h-[80px] md:w-[240px] transition-transform active:scale-95">
                <Image
                  src="/images/logo2.png"
                  alt="Limobilié Logo"
                  fill
                  sizes="(max-width: 768px) 140px, 240px"
                  className="object-contain object-left"
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeDropdown === item.name) {
                          setActiveDropdown(null);
                        } else {
                          setActiveDropdown(item.name);
                        }
                      }}
                      className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "text-[var(--color-primary)] bg-red-50/50"
                          : scrolled 
                            ? "text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50/50"
                            : "text-slate-800 hover:text-[var(--color-primary)] bg-white/50 backdrop-blur-sm lg:bg-transparent"
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                        scrolled 
                          ? "text-slate-700 hover:text-[var(--color-primary)] hover:bg-slate-50/50"
                          : "text-slate-800 hover:text-[var(--color-primary)] bg-white/50 backdrop-blur-sm lg:bg-transparent"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.children && (
                    <div
                      className={`absolute top-full left-0 w-72 pt-4 transition-all duration-300 transform origin-top ${
                        activeDropdown === item.name
                          ? "opacity-100 visible scale-y-100 translate-y-0"
                          : "opacity-0 invisible scale-y-95 -translate-y-4 pointer-events-none"
                      }`}
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100/50 overflow-hidden p-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-5 py-3.5 text-sm font-medium text-slate-600 hover:text-[var(--color-primary)] hover:bg-slate-50/80 rounded-[16px] transition-all"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className="ml-4 bg-[var(--color-primary)] text-white px-7 py-3 rounded-full text-sm font-bold tracking-wide hover:bg-red-700 transition-colors shadow-[0_8px_20px_-8px_rgba(220,38,38,0.5)] active:scale-95"
              >
                Contact
              </Link>
            </nav>

            {/* Mobile menu button - Guaranteed Visibility */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="flex items-center justify-center w-12 h-12 rounded-xl text-[var(--color-primary)] bg-white shadow-lg border border-slate-100 active:scale-90 transition-all z-[1001] relative"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "open"}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? <X size={28} /> : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 50 50" fill="currentColor">
                        <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
                      </svg>
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Independent Layer */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[9999] xl:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Solid header */}
              <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-white shadow-sm">
                <div className="relative h-10 w-32">
                  <Image
                    src="/images/logo2.png"
                    alt="Limobilié Logo"
                    fill
                    sizes="128px"
                    priority
                    className="object-contain object-left"
                  />
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-slate-500 hover:text-[var(--color-primary)] bg-slate-100 rounded-xl transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto px-6 py-10 bg-white">
                <div className="space-y-10">
                  <Link
                    href="/"
                    onClick={toggleMenu}
                    className="block text-3xl font-black text-slate-900"
                  >
                    Accueil
                  </Link>
                  
                  {navigation.map((item, idx) => (
                    <motion.div 
                      key={item.name} 
                      className="space-y-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {item.children ? (
                        <>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            {item.name}
                          </p>
                          <div className="grid gap-5 border-l-2 border-slate-100 ml-1 pl-6">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={toggleMenu}
                                className="text-xl font-bold text-slate-900 flex items-center group"
                              >
                                {child.name}
                                <ArrowRight size={18} className="ml-2 opacity-0 group-hover:opacity-100 transition-all text-[var(--color-primary)]" />
                              </Link>
                            ))}
                          </div>
                        </>
                      ) : (
                        item.name !== "Accueil" && (
                          <Link
                            href={item.href}
                            onClick={toggleMenu}
                            className="block text-3xl font-black text-slate-900"
                          >
                            {item.name}
                          </Link>
                        )
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-16 pb-12">
                  <Link
                    href="/contact"
                    onClick={toggleMenu}
                    className="flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white px-6 py-6 rounded-[24px] text-xl font-black shadow-xl shadow-red-500/20"
                  >
                    Nous Contacter
                    <ArrowRight size={24} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
