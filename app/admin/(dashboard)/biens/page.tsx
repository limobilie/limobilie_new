"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Plus, Search, Trash2, Edit3, UploadCloud, Loader2,
  CheckCircle2, AlertCircle, X, MapPin, Tag, Home, ShoppingBag
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { IVORY_COAST_LOCATIONS } from "@/data/locations";

interface Property {
  id: string;
  title: string;
  price: string;
  price_value: number;
  description: string;
  surface: string;
  location: string;
  city: string;
  type: string;
  offer_type: string;
  image_url: string;
  pieces?: string;
  chambres?: number;
  salle_bain?: number;
  balcon?: boolean;
  ascenseur?: boolean;
  stationnement?: boolean;
  pmr?: boolean;
  piscine?: boolean;
}

const EMPTY_FORM = {
  title: "",
  price: "",
  price_value: 0,
  description: "",
  surface: "",
  location: "",
  city: "",
  type: "terrain",
  offer_type: "vente",
  image_url: "",
  pieces: "",
  chambres: 0,
  salle_bain: 0,
  balcon: false,
  ascenseur: false,
  stationnement: false,
  pmr: false,
  piscine: false,
};

export default function BiensManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [formData, setFormData] = useState({ ...EMPTY_FORM });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [surfaceNum, setSurfaceNum] = useState("");
  const [surfaceUnit, setSurfaceUnit] = useState("m²");

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("limobilie_properties")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setProperties(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ ...EMPTY_FORM });
    setEditingId(null);
    setSurfaceNum("");
    setSurfaceUnit("m²");
  };

  const handleEdit = (prop: Property) => {
    // Parser la surface existante ex: "500 m²" → num="500" unit="m²"
    const surfaceMatch = (prop.surface || "").match(/^([0-9.,]+)\s*(.*)$/);
    const parsedNum = surfaceMatch ? surfaceMatch[1] : "";
    const parsedUnit = surfaceMatch && surfaceMatch[2] ? surfaceMatch[2].trim() : "m²";
    setSurfaceNum(parsedNum);
    setSurfaceUnit(["m²", "ha", "km²", "ares"].includes(parsedUnit) ? parsedUnit : "m²");

    setFormData({
      title: prop.title,
      price: prop.price,
      price_value: prop.price_value,
      description: prop.description || "",
      surface: prop.surface || "",
      location: prop.location || "",
      city: prop.city || "",
      type: prop.type,
      offer_type: prop.offer_type,
      image_url: prop.image_url || "",
      pieces: prop.pieces || "",
      chambres: prop.chambres || 0,
      salle_bain: prop.salle_bain || 0,
      balcon: prop.balcon || false,
      ascenseur: prop.ascenseur || false,
      stationnement: prop.stationnement || false,
      pmr: prop.pmr || false,
      piscine: prop.piscine || false,
    });
    setEditingId(prop.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce bien ?")) return;
    const { error } = await supabase.from("limobilie_properties").delete().eq("id", id);
    if (error) alert("Erreur lors de la suppression");
    else setProperties(properties.filter(p => p.id !== id));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `properties/${Math.random()}.${fileExt}`;
    try {
      const { error: uploadError } = await supabase.storage.from('limobilie_media').upload(filePath, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('limobilie_media').getPublicUrl(filePath);
      setFormData(prev => ({ ...prev, image_url: publicUrl }));
      showNotif("success", "Image téléchargée avec succès !");
    } catch (error: unknown) {
      showNotif("error", "Erreur d'upload : " + (error as Error).message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const dataToSave = { ...formData, updated_at: new Date() };
      if (editingId) {
        const { error } = await supabase.from("limobilie_properties").update(dataToSave).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("limobilie_properties").insert([dataToSave]);
        if (error) throw error;
      }
      showNotif("success", "Bien enregistré avec succès !");
      setIsModalOpen(false);
      resetForm();
      fetchProperties();
    } catch (error: unknown) {
      showNotif("error", "Erreur : " + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const showNotif = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredProperties = useMemo(() =>
    properties.filter(p =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.city.toLowerCase().includes(searchText.toLowerCase()) ||
      p.location.toLowerCase().includes(searchText.toLowerCase())
    ), [properties, searchText]);

  const isAutres = formData.offer_type === "autres";

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 w-full">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gestion du Catalogue</p>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Biens Immobiliers</h1>
        </div>
        <button
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95"
        >
          <Plus size={20} /><span>Ajouter un Bien</span>
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-8 right-8 z-[200] p-4 rounded-2xl flex items-center space-x-3 shadow-2xl border animate-in slide-in-from-right-10 ${notification.type === "success" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-700 border-red-100"}`}>
          {notification.type === "success" ? <CheckCircle2 size={22} /> : <AlertCircle size={22} />}
          <p className="font-bold text-sm">{notification.message}</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Biens", value: properties.length, icon: Tag, color: "blue" },
          { label: "Terrains", value: properties.filter(p => p.type === "terrain").length, icon: MapPin, color: "green" },
          { label: "Villas / Maisons", value: properties.filter(p => ["villa","maison"].includes(p.type)).length, icon: Home, color: "orange" },
          { label: "À Vendre", value: properties.filter(p => p.offer_type === "vente").length, icon: ShoppingBag, color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.color === "blue" ? "bg-blue-50 text-blue-500" : stat.color === "green" ? "bg-green-50 text-green-500" : stat.color === "orange" ? "bg-orange-50 text-orange-500" : "bg-red-50 text-red-600"}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="relative max-w-md">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par titre, ville, localisation..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Bien</th>
                <th className="px-6 py-4">Type / Offre</th>
                <th className="px-6 py-4">Localisation</th>
                <th className="px-6 py-4">Specs</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center"><Loader2 size={32} className="animate-spin text-slate-300 mx-auto" /></td></tr>
              ) : filteredProperties.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium italic">Aucun bien trouvé.</td></tr>
              ) : filteredProperties.map(prop => (
                <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden relative border border-slate-100 flex-shrink-0">
                        {prop.image_url ? <Image src={prop.image_url} alt={prop.title} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><MapPin size={24} /></div>}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 truncate max-w-[200px]">{prop.title}</p>
                        <p className="text-xs text-slate-400 font-medium">{prop.surface}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-400">{prop.type}</span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${prop.offer_type === "vente" ? "bg-blue-50 text-blue-600 border-blue-100" : prop.offer_type === "location" ? "bg-orange-50 text-orange-600 border-orange-100" : "bg-slate-50 text-slate-600 border-slate-100"}`}>{prop.offer_type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-700">{prop.city}</span>
                    <p className="text-xs text-slate-400 truncate max-w-[150px]">{prop.location}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-slate-500 space-y-0.5">
                      {prop.pieces && <p>🏠 {prop.pieces}</p>}
                      {(prop.chambres ?? 0) > 0 && <p>🛏 {prop.chambres} ch.</p>}
                      {(prop.salle_bain ?? 0) > 0 && <p>🚿 {prop.salle_bain} sdb.</p>}
                      <div className="flex gap-1 flex-wrap mt-1">
                        {prop.piscine && <span title="Piscine" className="text-blue-400">🏊</span>}
                        {prop.balcon && <span title="Balcon" className="text-slate-400">🏙️</span>}
                        {prop.ascenseur && <span title="Ascenseur" className="text-slate-400">🛗</span>}
                        {prop.stationnement && <span title="Parking" className="text-slate-400">🚗</span>}
                        {prop.pmr && <span title="PMR" className="text-slate-400">♿</span>}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><span className="text-sm font-black text-slate-900">{prop.price}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(prop)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(prop.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajout / Modification */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">

            {/* Header modal */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                {editingId ? "Modifier le Bien" : "Ajouter un Bien"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors"><X size={22} /></button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <form id="propertyForm" onSubmit={handleSubmit} className="space-y-10">

                {/* Photo principale */}
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Photo principale</label>
                  <div className="relative group bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-56 flex flex-col items-center justify-center overflow-hidden hover:border-[var(--color-primary)]/50 transition-colors">
                    {formData.image_url ? (
                      <>
                        <Image src={formData.image_url} alt="Aperçu" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer bg-white text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2">
                            <UploadCloud size={16} /><span>Changer</span>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 mb-3">
                          {uploadingImage ? <Loader2 className="animate-spin text-[var(--color-primary)]" size={24} /> : <UploadCloud size={24} />}
                        </div>
                        <p className="text-sm font-bold text-slate-400">{uploadingImage ? "Téléchargement..." : "Cliquez pour uploader une photo"}</p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                      </>
                    )}
                  </div>
                </div>

                {/* Infos de base */}
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Informations générales</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Titre de l&apos;annonce *</label>
                      <input required type="text" value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))} placeholder="Ex: Magnifique villa à Cocody Riviera" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Prix affiché *</label>
                      <input required type="text" value={formData.price} onChange={e => setFormData(p => ({...p, price: e.target.value}))} placeholder="Ex: 45 000 000 FCFA" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Valeur numérique (tri/filtre) *</label>
                      <input required type="number" value={formData.price_value} onChange={e => setFormData(p => ({...p, price_value: parseInt(e.target.value) || 0}))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Type de bien *</label>
                      <select value={formData.type} onChange={e => setFormData(p => ({...p, type: e.target.value}))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-bold text-slate-700">
                        <option value="terrain">Terrain</option>
                        <option value="maison">Maison</option>
                        <option value="villa">Villa</option>
                        <option value="appartement">Appartement</option>
                        <option value="autres">Autres</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Type d&apos;offre *</label>
                      <select value={formData.offer_type} onChange={e => setFormData(p => ({...p, offer_type: e.target.value}))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-bold text-slate-700">
                        <option value="vente">Vente</option>
                        <option value="location">Location</option>
                        <option value="neuf">Promotion Immobilière</option>
                        <option value="autres">Autres</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Ville *</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          list="admin-cities-list"
                          autoComplete="off"
                          value={formData.city}
                          onChange={e => setFormData(p => ({ ...p, city: e.target.value }))}
                          placeholder="Entrez ou sélectionnez une ville"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium"
                        />
                        <datalist id="admin-cities-list">
                          {IVORY_COAST_LOCATIONS.map((loc) => (
                            <option key={loc} value={loc} />
                          ))}
                        </datalist>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Localisation précise *</label>
                      <input required type="text" value={formData.location} onChange={e => setFormData(p => ({...p, location: e.target.value}))} placeholder="Ex: Cocody Riviera" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{isAutres ? "Quantité / Taille" : "Surface"} *</label>
                      {isAutres ? (
                        <input
                          required
                          type="text"
                          value={formData.surface}
                          onChange={e => setFormData(p => ({ ...p, surface: e.target.value }))}
                          placeholder="Ex: Sac 50kg"
                          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium"
                        />
                      ) : (
                        <div className="flex gap-2">
                          <input
                            required
                            type="number"
                            min={0}
                            value={surfaceNum}
                            onChange={e => {
                              const val = e.target.value;
                              setSurfaceNum(val);
                              setFormData(p => ({ ...p, surface: val ? `${val} ${surfaceUnit}` : "" }));
                            }}
                            placeholder="Ex: 500"
                            className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium"
                          />
                          <select
                            value={surfaceUnit}
                            onChange={e => {
                              const unit = e.target.value;
                              setSurfaceUnit(unit);
                              setFormData(p => ({ ...p, surface: surfaceNum ? `${surfaceNum} ${unit}` : "" }));
                            }}
                            className="px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-black text-slate-700 cursor-pointer"
                          >
                            <option value="m²">m²</option>
                            <option value="ha">ha</option>
                            <option value="ares">ares</option>
                            <option value="km²">km²</option>
                          </select>
                        </div>
                      )}
                      {!isAutres && formData.surface && (
                        <p className="text-xs text-[var(--color-primary)] font-bold mt-1 ml-1">
                          ✓ Surface enregistrée : {formData.surface}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Description</label>
                      <textarea value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} placeholder="Décrivez les atouts du bien..." className="w-full min-h-[100px] p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                    </div>
                  </div>
                </div>


                {/* Specs — masqué pour "autres" */}
                {!isAutres && (
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Caractéristiques du bien</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Pièces (texte)</label>
                        <input type="text" value={formData.pieces} onChange={e => setFormData(p => ({...p, pieces: e.target.value}))} placeholder="Ex: 5 pièces" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Chambres</label>
                        <input type="number" min={0} value={formData.chambres} onChange={e => setFormData(p => ({...p, chambres: parseInt(e.target.value) || 0}))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Salles de bain</label>
                        <input type="number" min={0} value={formData.salle_bain} onChange={e => setFormData(p => ({...p, salle_bain: parseInt(e.target.value) || 0}))} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" />
                      </div>
                    </div>

                    {/* Équipements */}
                    <div className="mt-6">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">✨ Équipements & Services</p>
                      <div className="flex flex-wrap gap-3">
                        {([
                          { key: "balcon", label: "🏙️ Balcon" },
                          { key: "ascenseur", label: "🛗 Ascenseur" },
                          { key: "stationnement", label: "🚗 Parking" },
                          { key: "pmr", label: "♿ PMR" },
                          { key: "piscine", label: "🏊 Piscine" },
                        ] as { key: keyof typeof formData; label: string }[]).map(({ key, label }) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFormData(p => ({ ...p, [key]: !p[key] }))}
                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all select-none ${formData[key] ? "bg-slate-900 text-white shadow-lg" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </form>
            </div>

            {/* Footer modal */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-4">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors">
                Annuler
              </button>
              <button
                form="propertyForm"
                type="submit"
                disabled={saving || uploadingImage}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-[var(--color-primary)] transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center space-x-2"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : editingId ? <Edit3 size={18} /> : <CheckCircle2 size={18} />}
                <span>{saving ? "Enregistrement..." : editingId ? "Sauvegarder les modifications" : "Publier l'annonce"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
