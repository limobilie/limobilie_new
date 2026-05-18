"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { properties, Property } from "@/data/properties";
import PropertyCard from "@/components/real-estate/PropertyCard";
import FilterBar from "@/components/real-estate/FilterBar";
import PropertyModal from "@/components/real-estate/PropertyModal";
import { SearchX, LayoutGrid } from "lucide-react";
import * as motion from "framer-motion/client"

export default function AcheterClient({ content, dbProperties }: { content: Record<string, string>, dbProperties: any[] }) {
  // Mapping des données Supabase vers le format attendu par le site
  const mappedDbProperties: Property[] = dbProperties.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    priceValue: Number(p.price_value),
    description: p.description,
    surface: p.surface,
    location: p.location,
    city: p.city,
    type: p.type as any,
    offerType: p.offer_type as any,
    image: p.image_url,
    gallery: [p.image_url],
    specs: {
       chambres: 0,
       salleBain: 0,
       balcon: false,
       ascenseur: false,
       stationnement: false,
       pmr: false,
       piscine: false
    }
  }));

  // Fusion avec fallback : on affiche les nouveaux biens de la BDD 
  // + les biens par défaut si la BDD est vide ou pour compléter
  const allProperties = [...mappedDbProperties, ...properties];

  const [activeFilters, setActiveFilters] = useState({
    type: "",
    city: "",
    offerType: "vente",
    budgetMax: "",
    surfaceMin: "",
    searchText: "",
    reference: "",
    piecesMin: "",
    chambresMin: "",
    salleBainMin: "",
    balcon: false,
    ascenseur: false,
    stationnement: false,
    pmr: false,
    piscine: false,
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const parseObjectList = (key: string) => {
    try { 
      const val = content[key];
      if (!val) return [];
      return JSON.parse(val as string);
    } 
    catch { return []; }
  };

  const additionalSections = parseObjectList("acheter_additional_list");

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter(p => {
      const matchOfferType = activeFilters.offerType === "" || p.offerType === activeFilters.offerType;
      const matchType = activeFilters.type === "" || p.type === activeFilters.type;
      const matchCity = activeFilters.city === "" ||
        p.city.toLowerCase().includes(activeFilters.city.toLowerCase()) ||
        p.location.toLowerCase().includes(activeFilters.city.toLowerCase());
      const matchBudget = activeFilters.budgetMax === "" ||
        p.priceValue <= parseInt(activeFilters.budgetMax.replace(/[^0-9]/g, ""));
      const matchSurface = activeFilters.surfaceMin === "" ||
        (parseInt(p.surface.replace(/[^0-9]/g, "")) || 0) >= parseInt(activeFilters.surfaceMin);
      const matchSearchText = activeFilters.searchText === "" ||
        p.title.toLowerCase().includes(activeFilters.searchText.toLowerCase()) ||
        p.description.toLowerCase().includes(activeFilters.searchText.toLowerCase());
      const matchReference = activeFilters.reference === "" ||
        p.id.toLowerCase().includes(activeFilters.reference.toLowerCase());
      const matchChambres = activeFilters.chambresMin === "" ||
        (p.specs.chambres ?? 0) >= parseInt(activeFilters.chambresMin);
      const matchPieces = activeFilters.piecesMin === "" ||
        parseInt((p.specs.pieces ?? "0").replace(/[^0-9]/g, "")) >= parseInt(activeFilters.piecesMin);
      const matchSalleBain = activeFilters.salleBainMin === "" ||
        (p.specs.salleBain ?? 0) >= parseInt(activeFilters.salleBainMin);
      const matchBalcon = !activeFilters.balcon || p.specs.balcon === true;
      const matchAscenseur = !activeFilters.ascenseur || p.specs.ascenseur === true;
      const matchStationnement = !activeFilters.stationnement || p.specs.stationnement === true;
      const matchPmr = !activeFilters.pmr || p.specs.pmr === true;
      const matchPiscine = !activeFilters.piscine || p.specs.piscine === true;

      return matchOfferType && matchType && matchCity && matchBudget && matchSurface &&
        matchSearchText && matchReference && matchChambres && matchPieces &&
        matchSalleBain && matchBalcon && matchAscenseur && matchStationnement && matchPmr && matchPiscine;
    });
  }, [activeFilters]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[340px] lg:h-[40vh] lg:min-h-[400px] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={content.acheter_hero_image || "/images/louer-vil1.png"}
            alt="Immobilier Limobilié"
            fill
            sizes="100vw"
            className="object-cover opacity-30"
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
          className="relative z-20 text-center px-4 pt-12"
        >
          <h1 className="text-4xl md:text-7xl font-black font-heading text-white leading-tight tracking-tighter uppercase italic drop-shadow-2xl">
            {content.acheter_title ? content.acheter_title.split('\\n').map((line: string, i: number) => <React.Fragment key={i}>{line}{i < content.acheter_title.split('\\n').length - 1 && <br />}</React.Fragment>) : <>TROUVER MON <span className="text-[var(--color-primary)]">BIEN</span></>}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-white text-lg md:text-xl font-medium mt-4 max-w-2xl mx-auto drop-shadow-md"
          >
            {content.acheter_intro || "Explorez notre sélection exclusive de terrains et propriétés de prestige en Côte d'Ivoire."}
          </motion.p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="relative z-30 -mt-16 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <FilterBar onFilterChange={setActiveFilters} />
      </section>

      {/* Results Section */}
      <section className="py-24 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center">
              <LayoutGrid size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 font-heading">Propriétés disponibles</h2>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{filteredProperties.length} résultats trouvés</p>
            </div>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onClick={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl text-slate-300">
              <SearchX size={48} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 font-heading">Aucun résultat</h3>
              <p className="text-slate-500 font-medium">Réessayez avec d&apos;autres critères ou une autre localisation.</p>
            </div>
            <button
              onClick={() => setActiveFilters({ type: "", city: "", offerType: "vente", budgetMax: "", surfaceMin: "", searchText: "", reference: "", piecesMin: "", chambresMin: "", salleBainMin: "", balcon: false, ascenseur: false, stationnement: false, pmr: false, piscine: false })}
              className="text-[var(--color-primary)] font-black uppercase tracking-widest text-xs hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </section>

      {/* ADDITIONAL SECTIONS (DYNAMIQUE) */}
      {additionalSections.length > 0 && (
         <section className="py-24 bg-slate-50 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
               {additionalSections.map((section: any, idx: number) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
                  >
                     {section.image && (
                        <div className="flex-1 w-full h-[400px] relative rounded-[40px] overflow-hidden shadow-2xl">
                           <Image src={section.image} alt={section.title} fill className="object-cover" />
                        </div>
                     )}
                     <div className="flex-1 space-y-6 text-center md:text-left">
                        <h2 className="text-4xl font-black text-slate-900 font-heading leading-tight uppercase tracking-tighter">
                           {section.title}
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap italic">
                           {section.content}
                        </p>
                        {section.cta_text && (
                           <a 
                             href={section.cta_link || "#"} 
                             className="inline-flex items-center justify-center px-10 py-5 bg-[var(--color-primary)] text-white text-sm font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:bg-red-700 transition-all hover:scale-105 active:scale-95"
                           >
                              {section.cta_text}
                           </a>
                        )}
                     </div>
                  </motion.div>
               ))}
            </div>
         </section>
      )}

      {/* Property Modal */}
      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
