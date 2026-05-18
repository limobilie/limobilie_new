"use client";

import React, { useState } from "react";
import { Property } from "@/data/properties";
import PropertyCard from "@/components/real-estate/PropertyCard";
import PropertyModal from "@/components/real-estate/PropertyModal";

interface FeaturedPropertiesClientProps {
  properties: Property[];
}

export default function FeaturedPropertiesClient({ properties }: FeaturedPropertiesClientProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {properties.map((prop) => (
          <PropertyCard
            key={prop.id}
            property={prop}
            onClick={(p) => setSelectedProperty(p)}
          />
        ))}
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </>
  );
}
