import { useState } from "react";
import Image from "next/image";
import { X, MapPin, Maximize2, Bed, Bath, Phone, ShieldCheck, Check } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [activeImg, setActiveImg] = useState(0);

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Bonjour Limobilié, je souhaite obtenir des détails sur : ${property.title} (${property.price})`);
    window.open(`https://wa.me/2250545935673?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-xl"
        >
          <X size={24} />
        </button>

        {/* Gallery Section */}
        <div className="w-full md:w-3/5 bg-slate-100 flex flex-col h-[300px] sm:h-[400px] md:h-auto shrink-0">
          <div className="relative flex-grow">
            <Image
              src={property.gallery[activeImg]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-contain p-4 md:p-8"
              priority
            />
          </div>
          {property.gallery.length > 1 && (
            <div className="p-6 md:p-8 flex gap-4 overflow-x-auto no-scrollbar bg-white/50 backdrop-blur-sm">
              {property.gallery.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 transition-all border-4 ${
                    activeImg === i ? 'border-[var(--color-primary)] scale-110 shadow-lg' : 'border-white opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${property.title} gallery ${i}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="w-full md:w-2/5 p-8 md:p-12 overflow-y-auto no-scrollbar flex flex-col flex-1 md:flex-none">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                {property.offerType}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 font-heading leading-tight">
                {property.title}
              </h2>
              <div className="flex items-center gap-2 text-slate-500 font-bold">
                <MapPin size={20} className="text-[var(--color-primary)]" />
                <span>{property.location}, {property.city}</span>
              </div>
            </div>

            <div className="text-4xl font-black text-[var(--color-primary)] font-heading">
              {property.price}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-3xl space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                  <Maximize2 size={16} />
                  Surface
                </div>
                <div className="text-xl font-black text-slate-900">{property.surface}</div>
              </div>
              {property.specs.chambres !== undefined && property.specs.chambres > 0 && (
                 <div className="bg-slate-50 p-6 rounded-3xl space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Bed size={16} />
                    Chambres
                  </div>
                  <div className="text-xl font-black text-slate-900">{property.specs.chambres}</div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Description</h4>
              <p className="text-slate-600 leading-relaxed font-medium">
                {property.description}
              </p>
            </div>

            {/* Features list */}
            <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
               {property.specs.piscine && <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700"><Check size={14} className="text-[var(--color-primary)]" /> Piscine</span>}
               {property.specs.stationnement && <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700"><Check size={14} className="text-[var(--color-primary)]" /> Parking</span>}
               {property.specs.ascenseur && <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700"><Check size={14} className="text-[var(--color-primary)]" /> Ascenseur</span>}
               {property.specs.balcon && <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700"><Check size={14} className="text-[var(--color-primary)]" /> Balcon</span>}
               <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-700"><ShieldCheck size={14} className="text-[var(--color-primary)]" /> Sécurité 24/7</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 italic font-bold">
            <button 
              onClick={openWhatsApp}
              className="w-full bg-slate-900 text-white flex items-center justify-center gap-4 py-6 rounded-[24px] text-lg font-black hover:bg-[var(--color-primary)] transition-all shadow-xl active:scale-95"
            >
              <Phone size={24} />
              Contacter sur WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
