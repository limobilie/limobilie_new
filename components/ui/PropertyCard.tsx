import Image from "next/image";
import { Maximize, MapPin, Tag } from "lucide-react";

interface PropertyCardProps {
  title: string;
  price: string;
  area: string;
  image: string;
  location?: string;
  type?: string;
}

export default function PropertyCard({ title, price, area, image, location, type }: PropertyCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[var(--color-primary)] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {type || "À Vendre"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
            {title}
          </h3>
        </div>
        
        {location && (
          <div className="flex items-center text-[var(--color-text-light)] text-sm mb-4">
            <MapPin size={14} className="mr-1 text-[var(--color-primary)]" />
            {location}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-[var(--color-text-light)] text-sm">
            <Maximize size={16} className="mr-2 text-slate-400" />
            <span>{area}</span>
          </div>
          <div className="flex items-center text-[var(--color-text-light)] text-sm">
            <Tag size={16} className="mr-2 text-slate-400" />
            <span>Premium</span>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="text-2xl font-black text-[var(--color-primary)]">
            {price}
          </div>
          <button className="p-2 rounded-full bg-slate-50 text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
