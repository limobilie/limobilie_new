export interface Property {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  description: string;
  surface: string;
  location: string;
  city: string;
  type: "terrain" | "maison" | "villa" | "appartement" | "autres" | "neuf";
  offerType: "vente" | "location" | "neuf" | "autres";
  specs: {
    pieces?: string;
    chambres?: number;
    salleBain?: number;
    balcon?: boolean;
    ascenseur?: boolean;
    stationnement?: boolean;
    pmr?: boolean;
    piscine?: boolean;
  };
  image: string;
  gallery: string[];
}

export const properties: Property[] = [
  {
    id: "azaguie-500m2",
    title: "Terrain à vendre à AZAGUIÉ",
    price: "3 000 000 FCFA",
    priceValue: 3000000,
    description: "A VENDRE – Terrain de 500 m² situé à Azaguié, idéal pour un projet de construction résidentielle ou un investissement foncier. Zone calme et accessible, offrant un bon potentiel de valorisation à moyen et long terme.",
    surface: "500 m²",
    location: "AZAGUIÉ",
    city: "AZAGUIÉ",
    type: "terrain",
    offerType: "vente",
    specs: {
      chambres: 0,
      salleBain: 0,
      balcon: false,
      ascenseur: false,
      stationnement: false,
      pmr: false,
      piscine: false
    },
    image: "/images/terrain11.png",
    gallery: ["/images/terrain11.png"]
  },
  {
    id: "azaguie-ahoua-adzope",
    title: "Terrain AZAGUIÉ AHOUA - ROUTE D’ADZOPÉ",
    price: "3 500 000 FCFA",
    priceValue: 3500000,
    description: "A VENDRE – Terrain de 500 m² situé à Azaguié Ahoua, sur la route d’Adzopé. Emplacement stratégique dans une zone en plein développement, idéal pour un projet immobilier ou un investissement sécurisé.",
    surface: "500 m²",
    location: "ROUTE D’ADZOPÉ",
    city: "AZAGUIÉ",
    type: "terrain",
    offerType: "vente",
    specs: {
      chambres: 0,
      salleBain: 0,
      balcon: false,
      ascenseur: false,
      stationnement: false,
      pmr: false,
      piscine: false
    },
    image: "/images/terrain222.png",
    gallery: ["/images/terrain222.png"]
  },
  {
    id: "assinie-8-pieces",
    title: "Maison à vendre, 8 pièces - Assinie",
    price: "950 000 000 FCFA",
    priceValue: 950000000,
    description: "A VENDRE - RESIDENCE HOTELIERE - ASSOUINDE. Magnifique propriété en bordure de lagune.",
    surface: "1 800 m²",
    location: "ASSINIE PLAGE",
    city: "ASSINIE",
    type: "maison",
    offerType: "vente",
    specs: {
      pieces: "8 pièces",
      chambres: 5,
      salleBain: 4,
      balcon: true,
      ascenseur: false,
      stationnement: true,
      pmr: false,
      piscine: true
    },
    image: "/images/duplex1.png",
    gallery: ["/images/duplex1.png", "/images/duplex-inter.png"]
  },
  {
    id: "port-bouet-5-pieces",
    title: "Villa à vendre, 5 pièces - Abidjan PORT-BOUET",
    price: "450 000 000 FCFA",
    priceValue: 450000000,
    description: "Superbe villa moderne avec piscine proche de l'aéroport.",
    surface: "700 m²",
    location: "PORT-BOUËT",
    city: "ABIDJAN",
    type: "villa",
    offerType: "vente",
    specs: {
      pieces: "5 pièces",
      chambres: 3,
      salleBain: 2,
      balcon: true,
      ascenseur: true,
      stationnement: true,
      pmr: true,
      piscine: true
    },
    image: "/images/villa1.png",
    gallery: ["/images/villa1.png", "/images/villa-salon.png", "/images/villa-chambre.png", "/images/villa-douche.png", "/images/villa-cusine.png"]
  },
  {
    id: "ciment-qualite",
    title: "CIMENT DE QUALITE",
    price: "35 500 FCFA",
    priceValue: 35500,
    description: "Ciment de haute qualité pour vos constructions.",
    surface: "Sac 50kg",
    location: "COCODY",
    city: "ABIDJAN",
    type: "autres",
    offerType: "autres",
    specs: {
      chambres: 0,
      salleBain: 0
    },
    image: "/images/ciment1.jpg",
    gallery: ["/images/ciment1.jpg"]
  },
  {
    id: "cocody-riviera-3-pieces",
    title: "Appartement neuf, 3 pièces - Cocody Riviera",
    price: "250 000 000 FCFA",
    priceValue: 250000000,
    description: "Appartement moderne et lumineux avec vue dégagée.",
    surface: "120 m²",
    location: "COCODY Riviera",
    city: "ABIDJAN",
    type: "appartement",
    offerType: "neuf",
    specs: {
      pieces: "3 pièces",
      chambres: 2,
      salleBain: 1,
      balcon: true,
      ascenseur: true,
      stationnement: true,
      pmr: true,
      piscine: false
    },
    image: "/images/duplex1.png",
    gallery: ["/images/duplex1.png"]
  },
  {
    id: "azaguie-40-lots",
    title: "Terrain à vendre - Azaguié Ahoua - 40 lots de 500 m²",
    price: "4 000 000 FCFA",
    priceValue: 4000000,
    description: "40 lots de 500 mètres carrés chacun, avec poteaux en bordure de voie, situés à Azaguié Ahoua.",
    surface: "500 m² par lot",
    location: "AZAGUIÉ AHOUA",
    city: "AZAGUIÉ",
    type: "terrain",
    offerType: "vente",
    specs: {
      chambres: 0,
      salleBain: 0,
      balcon: false,
      ascenseur: false,
      stationnement: false,
      pmr: false,
      piscine: false
    },
    image: "/images/terrain3.png",
    gallery: ["/images/terrain3.png"]
  }
];
