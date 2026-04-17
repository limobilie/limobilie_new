import { Search, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { IVORY_COAST_LOCATIONS } from "@/data/locations";

export interface FilterState {
  type: string;
  city: string;
  offerType: string;
  budgetMax: string;
  surfaceMin: string;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    offerType: "vente",
    budgetMax: "",
    surfaceMin: ""
  });

  const [isAdvanced, setIsAdvanced] = useState(false);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 p-8 space-y-8">
      <div className="flex flex-col lg:flex-row items-end gap-6">
        {/* Type d'offre */}
        <div className="w-full lg:w-48 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Offre</label>
          <div className="relative">
            <select 
              name="offerType"
              value={filters.offerType}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              <option value="vente">À vendre</option>
              <option value="location">À louer</option>
              <option value="neuf">Neuf</option>
              <option value="autres">Autres</option>
            </select>
            <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Type de bien */}
        <div className="w-full lg:w-48 space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Type de bien</label>
          <div className="relative">
            <select 
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              <option value="">Tous les types</option>
              <option value="terrain">Terrain</option>
              <option value="maison">Maison</option>
              <option value="villa">Villa</option>
              <option value="appartement">Appartement</option>
            </select>
            <ChevronDown size={16} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Localisation */}
        <div className="flex-grow space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Localisation</label>
          <div className="relative">
            <input 
              type="text"
              name="city"
              list="ci-locations"
              placeholder="Ville ou quartier..."
              value={filters.city}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
            <datalist id="ci-locations">
              {IVORY_COAST_LOCATIONS.map((loc, i) => (
                <option key={i} value={loc} />
              ))}
            </datalist>
            <Search size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <button 
          onClick={() => setIsAdvanced(!isAdvanced)}
          className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${
            isAdvanced ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <SlidersHorizontal size={18} />
          Filtres
        </button>
      </div>

      {isAdvanced && (
        <div className="grid md:grid-cols-4 gap-6 pt-8 border-t border-slate-50 animate-in fade-in slide-in-from-top-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Budget Max (FCFA)</label>
            <input 
              type="number"
              name="budgetMax"
              placeholder="Ex: 50 000 000"
              value={filters.budgetMax}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] opacity-100"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Surface Min (m²)</label>
            <input 
              type="number"
              name="surfaceMin"
              placeholder="Ex: 500"
              value={filters.surfaceMin}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
