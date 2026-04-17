import Image from "next/image";
import { MapPin, Maximize2, Bed, Bath, ArrowRight } from "lucide-react";
import { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  return (
    <div 
      className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(property)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
            {property.offerType}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Container */}
      <div className="p-8 flex flex-col flex-grow space-y-4">
        <div className="space-y-2">
          <div className="text-2xl font-black text-[var(--color-primary)] font-heading">
            {property.price}
          </div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2 min-h-[3rem]">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={16} className="shrink-0" />
          <span className="text-xs font-bold uppercase tracking-wider line-clamp-1">
            {property.location}, {property.city}
          </span>
        </div>

        <div className="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4 text-slate-500">
             <div className="flex items-center gap-1.5">
              <Maximize2 size={16} />
              <span className="text-xs font-black">{property.surface}</span>
            </div>
            {property.specs.chambres !== undefined && property.specs.chambres > 0 && (
              <div className="flex items-center gap-1.5">
                <Bed size={16} />
                <span className="text-xs font-black">{property.specs.chambres}</span>
              </div>
            )}
          </div>
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
            <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}
