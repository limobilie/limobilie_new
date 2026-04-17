"use client";

import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Trash2, Edit3, UploadCloud, Loader2, CheckCircle2, AlertCircle, X, MapPin, Tag, Home, ShoppingBag } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

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
}

export default function BiensManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    price_value: 0,
    description: "",
    surface: "",
    location: "",
    city: "",
    type: "terrain",
    offer_type: "vente",
    image_url: ""
  });
  
  const [uploadingImage, setUploadingImage] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("limobilie_properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      price: "",
      price_value: 0,
      description: "",
      surface: "",
      location: "",
      city: "",
      type: "terrain",
      offer_type: "vente",
      image_url: ""
    });
    setEditingId(null);
  };

  const handleEdit = (prop: Property) => {
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
      image_url: prop.image_url || ""
    });
    setEditingId(prop.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce bien ?")) return;
    
    const { error } = await supabase.from("limobilie_properties").delete().eq("id", id);
    if (error) {
      alert("Erreur lors de la suppression");
    } else {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `properties/${fileName}`;

    try {
      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from('limobilie_media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('limobilie_media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: publicUrl });
      setNotification({ type: "success", message: "Image téléchargée avec succès !" });
    } catch (error: unknown) {
      setNotification({ type: "error", message: "Erreur d'upload : " + (error as Error).message });
    } finally {
      setUploadingImage(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSave = {
        ...formData,
        updated_at: new Date()
      };

      if (editingId) {
        const { error } = await supabase
          .from("limobilie_properties")
          .update(dataToSave)
          .eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("limobilie_properties")
          .insert([dataToSave]);
        if (error) throw error;
      }

      setNotification({ type: "success", message: "Bien enregistré avec succès !" });
      setIsModalOpen(false);
      resetForm();
      fetchProperties();
    } catch (error: unknown) {
      setNotification({ type: "error", message: "Erreur : " + (error as Error).message });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gestion du Parcours Client</p>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Catalogue des Biens</h1>
        </div>
        <button 
          onClick={() => { resetForm(); setIsModalOpen(true); }}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          <span>Ajouter un Bien</span>
        </button>
      </div>

      {notification && (
         <div className={`fixed bottom-8 right-8 z-[100] p-4 rounded-2xl flex items-center space-x-3 shadow-2xl border animate-in slide-in-from-right-10 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
            {notification.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
            <p className="font-bold text-sm tracking-tight">{notification.message}</p>
         </div>
      )}

      {/* Analytics Mini Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Biens", value: properties.length, icon: Tag, color: "blue" },
          { label: "Terrains", value: properties.filter(p => p.type === 'terrain').length, icon: MapPin, color: "green" },
          { label: "Villas/Maisons", value: properties.filter(p => p.type !== 'terrain').length, icon: Home, color: "orange" },
          { label: "À Vendre", value: properties.filter(p => p.offer_type === 'vente').length, icon: ShoppingBag, color: "red" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between h-full group hover:shadow-md transition-shadow">
             <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.color === 'blue' ? 'bg-blue-50 text-blue-500' : stat.color === 'green' ? 'bg-green-50 text-green-500' : stat.color === 'orange' ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-600'}`}>
                <stat.icon size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Rechercher par titre, ville..." 
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Détails du bien</th>
                <th className="px-6 py-4">Type / Offre</th>
                <th className="px-6 py-4">Localisation</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 size={32} className="animate-spin text-slate-300 mx-auto" />
                  </td>
                </tr>
              ) : properties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium italic">
                    Aucun bien enregistré pour le moment.
                  </td>
                </tr>
              ) : (
                properties.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden relative border border-slate-100 flex-shrink-0">
                          {prop.image_url ? (
                            <Image src={prop.image_url} alt={prop.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                               <MapPin size={24} />
                            </div>
                          )}
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
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${prop.offer_type === 'vente' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                          {prop.offer_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{prop.city}</span>
                        <span className="text-xs text-slate-400 truncate max-w-[150px]">{prop.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">{prop.price}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(prop)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(prop.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal (Simplified Slide-over logic) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                {editingId ? "Modifier le Bien" : "Ajouter un nouveau Bien"}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
              <form id="propertyForm" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Photo Principal</label>
                  <div className="relative group overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl h-64 flex flex-col items-center justify-center transition-colors hover:border-[var(--color-primary)]/50">
                    {formData.image_url ? (
                      <>
                        <Image src={formData.image_url} alt="Aperçu" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label className="cursor-pointer bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center space-x-2 transform translate-y-2 group-hover:translate-y-0 transition-all">
                             <UploadCloud size={18} />
                             <span>Changer la photo</span>
                             <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={`w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-slate-300 mb-4 ${uploadingImage ? 'animate-pulse' : ''}`}>
                          {uploadingImage ? <Loader2 className="animate-spin text-[var(--color-primary)]" /> : <UploadCloud size={28} />}
                        </div>
                        <p className="text-sm font-bold text-slate-500">
                          {uploadingImage ? "Téléchargement en cours..." : "Cliquez pour uploader une photo"}
                        </p>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                      </>
                    )}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Titre de l&apos;annonce</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ex: Magnifique terrain à Azaguié..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Prix affiché (Texte)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="Ex: 3 500 000 FCFA"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Valeur Numérique (pour le tri)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price_value}
                    onChange={(e) => setFormData({...formData, price_value: parseInt(e.target.value)})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2">
                   <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Type de Bien</label>
                   <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-bold text-slate-700"
                   >
                     <option value="terrain">Terrain</option>
                     <option value="maison">Maison</option>
                     <option value="villa">Villa</option>
                     <option value="appartement">Appartement</option>
                     <option value="autres">Autres</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Type d&apos;Offre</label>
                   <select 
                    value={formData.offer_type}
                    onChange={(e) => setFormData({...formData, offer_type: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-bold text-slate-700"
                   >
                     <option value="vente">Vente</option>
                     <option value="location">Location</option>
                     <option value="neuf">Promotion Immobilière</option>
                   </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Ville</label>
                  <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    placeholder="Ex: Azaguié"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Localisation précise</label>
                  <input 
                    type="text" 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Ex: Route d'Adzopé"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Surface (Ex: 500 m²)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.surface}
                    onChange={(e) => setFormData({...formData, surface: e.target.value})}
                    placeholder="Ex: 500 m²"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Description détaillée</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Décrivez les atouts du bien..."
                    className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] transition-all font-medium" 
                  />
                </div>
              </form>
            </div>

            {/* Modal Footer */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Annuler
              </button>
              <button 
                form="propertyForm"
                type="submit"
                disabled={saving || uploadingImage}
                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-[var(--color-primary)] transition-all shadow-xl active:scale-95 disabled:opacity-50 flex items-center space-x-2"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : editingId ? <Edit3 size={18} /> : <CheckCircle2 size={18} />}
                <span>{saving ? "Enregistrement..." : editingId ? "Enregistrer les modifications" : "Publier l'annonce"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
