import { useState, useEffect } from "react";
import { IVORY_COAST_LOCATIONS } from "@/data/locations";

export interface FilterState {
  type: string;
  city: string;
  offerType: string;
  budgetMax: string;
  surfaceMin: string;
  searchText: string;
  reference: string;
  piecesMin: string;
  chambresMin: string;
  salleBainMin: string;
  balcon: boolean;
  ascenseur: boolean;
  stationnement: boolean;
  pmr: boolean;
  piscine: boolean;
}

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
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

  const [isExpanded, setIsExpanded] = useState(false);

  // Debounce 300ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange(filters);
    }, 300);
    return () => clearTimeout(timeout);
  }, [filters, onFilterChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" && e.target instanceof HTMLInputElement
      ? e.target.checked
      : undefined;
    setFilters(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const isAutres = filters.offerType.toLowerCase() === "autres";

  return (
    <div className="bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
      {/* HEADER */}
      <div className="px-8 pt-8 pb-4">
        <h2 className="text-2xl font-black text-slate-900 font-heading tracking-tight">Trouvez votre bien idéal</h2>
        <p className="text-sm text-slate-400 font-medium mt-1">Affinez votre recherche avec nos filtres avancés</p>
      </div>

      {/* BARRE PRINCIPALE */}
      <div className="px-8 pb-6">
        {isAutres ? (
          /* MODE AUTRES : champ texte libre uniquement */
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Recherche libre</label>
            <input
              type="text"
              name="searchText"
              placeholder="Ex: Ciment, Services..."
              value={filters.searchText}
              onChange={handleChange}
              className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            />
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, offerType: "vente", searchText: "" }))}
              className="text-xs text-slate-400 hover:text-[var(--color-primary)] font-bold underline mt-1 ml-1 transition-colors"
            >
              ← Retour à la recherche normale
            </button>
          </div>
        ) : (
          /* MODE NORMAL */
          <div className="flex flex-col lg:flex-row items-stretch lg:items-end gap-4 flex-wrap">
            {/* Type d'offre */}
            <div className="w-full lg:w-36 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Type</label>
              <div className="relative">
                <select
                  name="offerType"
                  value={filters.offerType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 pr-10 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
                >
                  <option value="vente">Vente</option>
                  <option value="location">Location</option>
                  <option value="neuf">Neuf</option>
                  <option value="autres">Autres</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
              </div>
            </div>

            {/* Type de bien */}
            <div className="w-full lg:w-36 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Bien</label>
              <div className="relative">
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 pr-10 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
                >
                  <option value="">Tous</option>
                  <option value="terrain">Terrain</option>
                  <option value="appartement">Appartement</option>
                  <option value="maison">Maison</option>
                  <option value="villa">Villa</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
              </div>
            </div>

            {/* Localisation */}
            <div className="w-full lg:flex-grow space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Localisation</label>
              <div className="relative">
                <select
                  name="city"
                  value={filters.city}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border-none rounded-2xl px-4 pr-10 py-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
                >
                  <option value="">Toutes les villes</option>
                  {IVORY_COAST_LOCATIONS.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
              </div>
            </div>

            {/* Budget max */}
            <div className="w-full lg:w-36 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Budget</label>
              <input
                type="text"
                name="budgetMax"
                placeholder="Max (FCFA)"
                value={filters.budgetMax}
                onChange={handleChange}
                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>

            {/* Surface min */}
            <div className="w-full lg:w-36 space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Surface min</label>
              <input
                type="text"
                name="surfaceMin"
                placeholder="À partir de (m²)"
                value={filters.surfaceMin}
                onChange={handleChange}
                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
              />
            </div>

            {/* Bouton Avancé */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-black transition-all shrink-0 w-full lg:w-auto ${
                isExpanded ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span className="text-lg leading-none">{isExpanded ? "−" : "+"}</span>
              <span>Avancé</span>
            </button>
          </div>
        )}
      </div>

      {/* FILTRES AVANCÉS */}
      {isExpanded && !isAutres && (
        <div className="border-t border-slate-100 px-8 py-6 space-y-6 bg-slate-50/50">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">Filtres avancés</h3>

          {/* Champs texte avancés */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Référence</label>
              <input
                type="text"
                name="reference"
                placeholder="Ex: REF-001"
                value={filters.reference}
                onChange={handleChange}
                className="w-full bg-white border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Pièces min</label>
              <input
                type="text"
                name="piecesMin"
                placeholder="Ex: 3"
                value={filters.piecesMin}
                onChange={handleChange}
                className="w-full bg-white border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Chambres min</label>
              <input
                type="text"
                name="chambresMin"
                placeholder="Ex: 2"
                value={filters.chambresMin}
                onChange={handleChange}
                className="w-full bg-white border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Salle de bain min</label>
              <input
                type="text"
                name="salleBainMin"
                placeholder="Ex: 1"
                value={filters.salleBainMin}
                onChange={handleChange}
                className="w-full bg-white border-none rounded-2xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Équipements */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">✨ Équipements &amp; Services</h4>
            <div className="flex flex-wrap gap-3">
              {([
                { name: "balcon", label: "🏙️ Balcon" },
                { name: "ascenseur", label: "🛗 Ascenseur" },
                { name: "stationnement", label: "🚗 Parking" },
                { name: "pmr", label: "♿ PMR" },
                { name: "piscine", label: "🏊 Piscine" },
              ] as { name: keyof FilterState; label: string }[]).map(({ name, label }) => (
                <label
                  key={name}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold cursor-pointer transition-all select-none ${
                    filters[name]
                      ? "bg-slate-900 text-white shadow-lg"
                      : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
                  }`}
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={filters[name] as boolean}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
