"use client";

import React, { useState } from "react";
import { UploadCloud, Trash2, Image as ImageIcon, Video, Plus, CheckCircle2 } from "lucide-react";

export default function MediaManager() {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"photos" | "videos">("photos");

  const mockupPhotos = [
    { id: 1, url: "/images/proprietes/villa-moderne.jpg", title: "Villa Moderne Abidjan" },
    { id: 2, url: "/images/proprietes/terrain-vue.jpg", title: "Terrain vue lagune" },
    { id: 3, url: "/images/proprietes/chantier.jpg", title: "Chantier Zone 4" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in w-full pb-12">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4 border-b border-slate-200 pb-6">
        <div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">MÉDIAS & VISUELS</p>
           <h1 className="text-3xl font-black text-slate-900">Galerie Globale</h1>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button 
            onClick={() => setMode("photos")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors flex items-center space-x-2 ${mode === "photos" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <ImageIcon size={16} /> <span>Photos</span>
          </button>
          <button 
            onClick={() => setMode("videos")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-colors flex items-center space-x-2 ${mode === "videos" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
          >
            <Video size={16} /> <span>Vidéos</span>
          </button>
        </div>
      </div>

      {/* Zone de Drop / Upload */}
      <div className="border-2 border-dashed border-red-200 bg-red-50/50 rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-colors hover:bg-red-50 hover:border-red-300 group cursor-pointer">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 group-hover:scale-110 transition-transform mb-4">
           <UploadCloud size={28} />
        </div>
        <h3 className="text-lg font-black text-slate-800">Glissez-déposez vos fichiers ici</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto font-medium">
          Formats acceptés : JPG, PNG, WEBP, MP4. Taille maximale de 5MB.
        </p>
        <button className="mt-6 bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 active:scale-95">
          Parcourir les fichiers
        </button>
      </div>

      {/* Grille existante */}
      <div>
        <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-4">Fichiers actuels</h2>
        {mode === "photos" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {mockupPhotos.map((photo) => (
              <div key={photo.id} className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square shadow-sm border border-slate-200">
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex flex-col justify-end p-4">
                  <p className="text-white font-bold text-sm truncate">{photo.title}</p>
                </div>
                <button className="absolute top-3 right-3 w-8 h-8 bg-white text-red-500 rounded-full flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 hover:bg-red-50 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <Trash2 size={16} />
                </button>
                {/* Simulation de photo (le vrai comp prendra un src valide avec la BDD) */}
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                  <ImageIcon size={48} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500 border border-slate-100 rounded-3xl bg-white">
            <Video size={48} className="mx-auto mb-4 text-slate-300" />
            <p className="font-medium">Aucune vidéo paramétrée. Vous ajouterez vos vidéos YouTube ou MP4 ici.</p>
          </div>
        )}
      </div>
    </div>
  );
}
