"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, AlertCircle, ArrowLeft, Loader2, CheckCircle2, UploadCloud, FileImage, FileVideo, Plus, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

type FieldType = "text" | "textarea" | "image" | "video" | "list" | "group-list";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyType = any;
interface SubField {
  key: string;
  label: string;
  type: Exclude<FieldType, "group-list">;
  placeholder?: AnyType;
}

interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: AnyType;
  fields?: SubField[]; // Pour le type group-list
}

// Configuration des champs éditables par page
const pageConfigs: Record<string, { title: string; fields: FieldConfig[] }> = {
  accueil: {
    title: "Page Accueil",
    fields: [
      { key: "hero_video", label: "Vidéo d'arrière-plan", type: "video", placeholder: "/videos/video-acceuil.mp4" },
      { key: "hero_badge", label: "Badge au-dessus du titre", type: "text", placeholder: "Agence Immobilière à Abidjan" },
      { key: "hero_title", label: "Titre principal de la bannière", type: "textarea", placeholder: "ENSEMBLE,\\nCONSTRUISONS\\nL'AVENIR" },
      { key: "hero_subtitle", label: "Texte descriptif de la bannière", type: "textarea", placeholder: "Vente · Location · Gestion Immobilière · Aménagement · Conseils" },
      
      { key: "impact_image", label: "Image Limobilié Impact", type: "image", placeholder: "/images/impact-img.png" },
      { key: "impact_square", label: "Texte dans le petit carré sur l'image", type: "textarea", placeholder: "Un achat utile,\\nun acte responsable." },
      { key: "impact_title", label: "Titre section Impact", type: "text", placeholder: "LIMOBILIÉ IMPACT" },
      { key: "accueil_about", label: "Section À propos (Paragraphe complet)", type: "textarea", placeholder: "Au-delà de l'investissement, LIMOBILIÉ a créé LIMOBILIÉ Impact, un programme d'aide sociale intégré à chaque vente de terrain." },
      { key: "trust_title", label: "Titre section Confiance", type: "text", placeholder: "Votre Confiance, Notre Priorité" },
      { key: "trust_subtitle", label: "Sous-titre confiance", type: "textarea", placeholder: "Nous sélectionnons rigoureusement des lots sécurisés avec documents administratifs traçables." },
    ],
  },
  acheter: {
    title: "Page Acheter",
    fields: [
      { key: "acheter_hero_image", label: "Image principale", type: "image", placeholder: "/images/louer-vil1.png" },
      { key: "acheter_title", label: "Titre principal", type: "text", placeholder: "TROUVER MON BIEN" },
      { key: "acheter_intro", label: "Texte d'introduction", type: "textarea", placeholder: "Explorez notre sélection exclusive de terrains et propriétés de prestige en Côte d'Ivoire." },
      {
        key: "acheter_additional_list",
        label: "Sections Additionnelles (Optionnel)",
        type: "group-list",
        fields: [
          { key: "title", label: "Titre du bloc", type: "text", placeholder: "Ex: Nos Garanties" },
          { key: "content", label: "Texte du bloc", type: "textarea", placeholder: "Description..." },
          { key: "image", label: "Image du bloc (Optionnel)", type: "image" },
          { key: "cta_text", label: "Texte bouton (Optionnel)", type: "text" },
          { key: "cta_link", label: "Lien bouton (Optionnel)", type: "text" }
        ]
      }
    ],
  },
  rapports: {
    title: "Rapports Immobiliers",
    fields: [
      { key: "rapports_hero_image", label: "Image d'arrière-plan Hero", type: "image", placeholder: "/images/rapport1.jpg" },
      { key: "rapports_badge", label: "Badge Hero", type: "text", placeholder: "Intelligence Marché" },
      { key: "rapports_title", label: "Titre de la page", type: "textarea", placeholder: "RAPPORTS & ANALYSES" },
      { key: "rapports_desc", label: "Description Hero", type: "textarea", placeholder: "Éclairez vos décisions d'investissement avec nos données exclusives sur le marché ivoirien." },
      { 
        key: "rapports_dynamic_list", 
        label: "Liste des Rapports (Dynamique)", 
        type: "group-list",
        placeholder: [
          {
            title: "Analyse du Marché Côte d’Ivoire 2025",
            subtitle: "Étude complète sur l'évolution des prix au m² à Cocody, Marcory et Assinie.",
            intro: "Voici une analyse claire et structurée du marché immobilier en Côte d’Ivoire en 2025...",
            pdf_url: "/documents/analyse-marche-2026.pdf",
            wa_context: "Analyse du Marché 2025 C.I.",
            icon_type: "chart",
            sec1_title: "1. Taille et perspectives",
            sec1_text: "En 2025, le marché immobilier ivoirien est important et en croissance, avec une valeur estimée à environ 377,62 milliards USD. D’ici 2029, il pourrait atteindre 459,6 milliards USD (+5% / an).",
            sec2_title: "2. Dynamique régionale",
            sec2_text: "Abidjan reste en tête. Secteurs haut de gamme (Cocody, Marcory, Riviera) : Prix variant entre 1 200 000 et 1 500 000 FCFA/m².",
            sec3_title: "3. Segments principaux",
            sec3_text: "Immobilier résidentiel dominant avec 335,5 milliards USD en 2025. Forte demande pour le moderne.",
            sec4_title: "4. Facteurs clés",
            sec4_text: "✓ Accélérateurs : Croissance du PIB et digitalisation.\\n⚠ Freins : Accès difficile au crédit pour les primo-accédants."
          },
          {
            title: "Guide de l'Investisseur 2025",
            subtitle: "Tout savoir sur la fiscalité immobilière et les zones à fort potentiel.",
            intro: "",
            pdf_url: "/documents/guide-investisseur-2025.pdf",
            wa_context: "Guide Investisseur",
            icon_type: "bulb",
            sec1_title: "1️⃣ Pourquoi investir ?",
            sec1_text: "Urbanisation rapide, déficit de logements et rendements supérieurs à la moyenne africaine.",
            sec2_title: "2️⃣ Grandes zones d’investissement",
            sec2_text: "Abidjan : Cocody/Riviera (Sécurité), Marcory (Premium), Bingerville (Spéculation). Villes secondaires : Bouaké, San Pedro, Yamoussoukro.",
            sec3_title: "3️⃣ Budget & Stratégies",
            sec3_text: "De 5M FCFA (périphérie) à +100M FCFA (Promotion immobilière)."
          },
          {
            title: "Rapport Juridique Foncière",
            subtitle: "Sécurisation foncière : comprendre l'ACD et les étapes clés de l'achat.",
            intro: "Analyser le cadre juridique applicable aux investissements immobiliers en Côte d’Ivoire.",
            pdf_url: "/documents/rapport-juridique-2025.pdf",
            wa_context: "Rapport Juridique Immobilier",
            icon_type: "scale",
            sec1_title: "I. Objet du rapport",
            sec1_text: "Analyser le cadre juridique applicable aux investissements immobiliers en Côte d’Ivoire.",
            sec2_title: "II. Typologie des droits",
            sec2_text: "ACD (Arrêté de Concession Définitive) : Le titre le plus sécurisé en droit ivoirien. Il confère un droit de propriété absolu et définitif.",
            sec3_title: "III. Procédure légale (Les Indispensables)",
            sec3_text: "01. Vérification de l'historique et du titre foncier.\\n02. Signature devant notaire.\\n03. Enregistrement officiel."
          }
        ],
        fields: [
          { key: "title", label: "Titre du rapport", type: "text", placeholder: "Analyse du Marché Côte d’Ivoire 2025" },
          { key: "subtitle", label: "Sous-titre/Accroche", type: "text", placeholder: "Étude complète sur l'évolution des prix..." },
          { key: "intro", label: "Citation d'introduction", type: "textarea", placeholder: "Voici une analyse claire..." },
          { key: "pdf_url", label: "Lien PDF (Téléchargement)", type: "text", placeholder: "/documents/rapport.pdf" },
          { key: "wa_context", label: "Sujet WhatsApp", type: "text", placeholder: "Analyse du Marché" },
          { key: "icon_type", label: "Type d'icône (chart/bulb/scale)", type: "text", placeholder: "chart" },
          { key: "sec1_title", label: "Section 1 : Titre", type: "text" },
          { key: "sec1_text", label: "Section 1 : Texte", type: "textarea" },
          { key: "sec2_title", label: "Section 2 : Titre", type: "text" },
          { key: "sec2_text", label: "Section 2 : Texte", type: "textarea" },
          { key: "sec3_title", label: "Section 3 : Titre", type: "text" },
          { key: "sec3_text", label: "Section 3 : Texte", type: "textarea" },
          { key: "sec4_title", label: "Section 4 : Titre", type: "text" },
          { key: "sec4_text", label: "Section 4 : Texte", type: "textarea" },
          { key: "r2_matrice_title", label: "Titre Matrice (Optionnel)", type: "text" },
          { key: "r2_matrice_l1_label", label: "Ligne 1 Label", type: "text" },
          { key: "r2_matrice_l1_val", label: "Ligne 1 Valeur", type: "text" },
          { key: "r2_matrice_l2_label", label: "Ligne 2 Label", type: "text" },
          { key: "r2_matrice_l2_val", label: "Ligne 2 Valeur", type: "text" },
        ]
      },
    ],
  },
  commercialisation: { 
    title: "Commercialisation", 
    fields: [
      { key: "com_hero_image", label: "Image Hero", type: "image", placeholder: "/images/louer-p2.png" },
      { key: "com_hero_badge", label: "Badge Hero", type: "text", placeholder: "Service Propriétaire" },
      { key: "com_hero_title", label: "Titre principal Hero", type: "textarea", placeholder: "CONFIER LA COMMERCIALISATION DE VOTRE BIEN" },
      { key: "com_hero_subtitle", label: "Sous-titre Hero", type: "textarea", placeholder: "Vendez votre bien plus vite et au meilleur prix avec Limobilié." },
      { key: "com_pitch_image", label: "Image Argumentaire", type: "image", placeholder: "/images/equipe-pro.png" },
      { key: "com_pitch_title", label: "Titre Argumentaire", type: "text", placeholder: "Vendez mieux, vendez plus vite." },
      { key: "com_pitch_text1", label: "Paragraphe Argumentaire 1", type: "textarea", placeholder: "Vous souhaitez vendre une villa, un appartement ou un terrain ? Chez Limobilié..." },
      { key: "com_pitch_text2", label: "Paragraphe Argumentaire 2", type: "textarea", placeholder: "En tant que spécialistes locaux, nous combinons une maîtrise parfaite du terrain..." },
      { key: "com_pitch_quote", label: "Citation finale", type: "text", placeholder: "Votre projet mérite l'excellence." },
      { key: "com_benefits_title", label: "Titre Section Avantages", type: "text", placeholder: "Pourquoi choisir Limobilié pour votre vente ?" },
      {
        key: "com_benefits_list",
        label: "Liste des Avantages (Dynamique)",
        type: "group-list",
        placeholder: [
          { title: "Visibilité Maximale", description: "Nous utilisons des supports marketing premium (photos pro, réseaux sociaux, réseaux d'investisseurs) pour attirer les meilleurs acheteurs.", icon_type: "eye" },
          { title: "Transparence Totale", description: "Suivez l'avancement de votre vente en temps réel. Vous savez exactement où on en est, de la première visite à la signature.", icon_type: "shield" },
          { title: "Gestion Clé en Main", description: "Nous nous occupons de tout : rédaction des contrats, vérification administrative et coordination avec les notaires.", icon_type: "key" }
        ],
        fields: [
          { key: "title", label: "Titre", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon_type", label: "Icone (eye/shield/key/map/target/users)", type: "text" }
        ]
      },
      { key: "com_expertise_title", label: "Titre Section Expertise", type: "text", placeholder: "Pourquoi nous confier votre bien ?" },
      { key: "com_expertise_intro", label: "Texte Intro Expertise", type: "textarea", placeholder: "Notre équipe met à votre disposition son savoir-faire..." },
      {
        key: "com_expertise_list",
        label: "Liste des Expertises (Dynamique)",
        type: "group-list",
        placeholder: [
          { title: "Expertise locale", description: "Nos agents connaissent parfaitement le marché immobilier d'Abidjan et de sa région.", icon_type: "map" },
          { title: "Visibilité ciblée", description: "Votre bien sera présenté sur nos plateformes et auprès de réseaux de clients qualifiés.", icon_type: "target" },
          { title: "Accompagnement", description: "Nous vous guidons à chaque étape cruciale, de l'estimation initiale à la signature finale.", icon_type: "users" }
        ],
        fields: [
          { key: "title", label: "Titre", type: "text" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "icon_type", label: "Icone (eye/shield/key/map/target/users)", type: "text" }
        ]
      },
      { key: "com_cta_title", label: "Titre Appel à l'action final", type: "textarea", placeholder: "PRÊT À CONFIER\\nVOTRE BIEN ?" },
    ] 
  },
  travaux: { 
    title: "Travaux & BTP", 
    fields: [
      { key: "travaux_hero_image", label: "Image Hero", type: "image", placeholder: "/images/btp1.jpg" },
      { key: "travaux_hero_badge", label: "Badge Hero", type: "text", placeholder: "Division Technique" },
      { key: "travaux_hero_title", label: "Titre principal Hero", type: "textarea", placeholder: "CONFIEZ-NOUS VOS TRAVAUX" },
      { key: "travaux_hero_subtitle", label: "Sous-titre Hero", type: "textarea", placeholder: "BTP, décoration et rénovation réalisés par des professionnels qualifiés pour transformer vos projets en réalité." },
      { key: "travaux_services_title", label: "Titre Section Services", type: "text", placeholder: "Nos Domaines d'Intervention" },
      { 
        key: "travaux_services_list", 
        label: "Liste des Services (Dynamique)", 
        type: "group-list",
        fields: [
          { key: "title", label: "Titre du service", type: "text", placeholder: "Ex: Peinture" },
          { key: "desc", label: "Description courte", type: "textarea", placeholder: "Description du service..." },
          { key: "image", label: "Image du service", type: "image", placeholder: "/images/btp1.jpg" },
        ]
      },
      { key: "travaux_cta_title", label: "Titre Section CTA", type: "textarea", placeholder: "Un projet en vue ?\\nParlons-en." },
      { key: "travaux_cta_subtitle", label: "Sous-titre Section CTA", type: "textarea", placeholder: "Nos experts sont à votre disposition pour évaluer vos besoins et fournir un devis détaillé." },
    ] 
  },
  gestion: { 
    title: "Gestion Immobilière", 
    fields: [
      { key: "gestion_hero_image", label: "Image principale", type: "image", placeholder: "/images/gere-bien.webp" },
      { key: "gestion_hero_badge", label: "Badge Hero", type: "text", placeholder: "Partenaire de confiance" },
      { key: "gestion_hero_title", label: "Titre principal Hero", type: "textarea", placeholder: "Faites-nous confiance pour gérer vos biens" },
      { key: "gestion_intro_text", label: "Texte Introduction", type: "textarea", placeholder: "Une gestion sur-mesure pour sécuriser vos revenus et valoriser votre patrimoine immobilier en Côte d'Ivoire." },
      { 
        key: "gestion_services_list", 
        label: "Liste des Services (Dynamique)", 
        type: "group-list",
        fields: [
          { key: "title", label: "Titre du service", type: "text", placeholder: "Ex: Gestion locative" },
          { key: "description", label: "Description détaillée", type: "textarea", placeholder: "Description du service..." },
          { key: "image", label: "Image illustrative", type: "image", placeholder: "/images/louer-loca1.png" },
          { key: "points", label: "Points forts (Un par ligne)", type: "list", placeholder: ["Point 1", "Point 2"] },
        ]
      },
      { key: "gestion_cta_title", label: "Titre CTA Final", type: "textarea", placeholder: "Prêt à déléguer la gestion de votre patrimoine ?" },
      { key: "gestion_cta_subtitle", label: "Sous-Titre CTA", type: "textarea", placeholder: "Contactez notre équipe de gestionnaires immobiliers et gagnez en sérénité dès aujourd'hui." },
    ] 
  },
  tontine: { 
    title: "Tontine Immobilière", 
    fields: [
      { key: "tontine_hero_image", label: "Image Hero", type: "image", placeholder: "/images/tontine133.png" },
      { key: "tontine_hero_badge", label: "Badge Hero", type: "text", placeholder: "Innovation Foncière" },
      { key: "tontine_hero_title", label: "Titre principal Hero", type: "textarea", placeholder: "LIMOBILIÉ \\nTONTINE FONCIÈRE" },
      { key: "tontine_hero_subtitle", label: "Sous-Titre Hero", type: "textarea", placeholder: "Transformez votre contribution mensuelle en un patrimoine immobilier concret." },
      { key: "tontine_intro_title", label: "Titre Concept", type: "text", placeholder: "Le principe, simplement" },
      { key: "tontine_intro_text", label: "Description Concept", type: "textarea", placeholder: "Avec LIMOBILIÉ Tontine Infra, vous ne cotisez pas pour de l’argent liquide..." },
      { key: "tontine_cond1_title", label: "Condition 1 (Titre)", type: "text", placeholder: "Investissement" },
      { key: "tontine_cond1_value", label: "Condition 1 (Valeur)", type: "text", placeholder: "1.000.000 FCFA" },
      { key: "tontine_cond1_desc", label: "Condition 1 (Désc)", type: "text", placeholder: "Par souscripteur / membre" },
      { key: "tontine_cond2_title", label: "Condition 2 (Titre)", type: "text", placeholder: "Cycle Court" },
      { key: "tontine_cond2_value", label: "Condition 2 (Valeur)", type: "text", placeholder: "10 Mois" },
      { key: "tontine_cond2_desc", label: "Condition 2 (Désc)", type: "text", placeholder: "Un lot de terrain garanti" },
      { key: "tontine_cond3_title", label: "Condition 3 (Titre)", type: "text", placeholder: "Transparence" },
      { key: "tontine_cond3_value", label: "Condition 3 (Valeur)", type: "text", placeholder: "Flux Sécurisés" },
      { key: "tontine_cond3_desc", label: "Condition 3 (Désc)", type: "text", placeholder: "Visibilité totale des fonds" },
      { key: "tontine_machine_image", label: "Image Machine D7", type: "image", placeholder: "/images/btp1.jpg" },
      { key: "tontine_machine_title", label: "Titre Machine", type: "textarea", placeholder: "La Machine D7" },
      { key: "tontine_machine1_title", label: "Etape Machine 1", type: "text", placeholder: "Décapage et ouverture de voies" },
      { key: "tontine_machine1_desc", label: "Desc Machine 1", type: "text", placeholder: "Mise en accessibilité immédiate du site." },
      { key: "tontine_machine2_title", label: "Etape Machine 2", type: "text", placeholder: "Viabilisation aux normes" },
      { key: "tontine_machine2_desc", label: "Desc Machine 2", type: "text", placeholder: "Préparation des infrastructures essentielles." },
      { key: "tontine_machine3_title", label: "Etape Machine 3", type: "text", placeholder: "Accélération administrative" },
      { key: "tontine_machine3_desc", label: "Desc Machine 3", type: "text", placeholder: "Traitement prioritaire des dossiers fonciers." },
      { key: "tontine_recep_title", label: "Titre Réception", type: "text", placeholder: "Ce que vous recevez" },
      { key: "tontine_recep_points", label: "Points de Réception", type: "list", placeholder: ["1 lot de terrain approuvé", "Localisation stratégique", "Documents juridiques conformes", "Terrain déjà valorisé"] },
      { key: "tontine_quote", label: "Citation finale", type: "textarea", placeholder: "“Votre argent ne dort pas. Il travaille, il creuse, il ouvre des routes… et devient votre terrain.”" },
    ] 
  },
  impact: { 
    title: "Limobilié Impact", 
    fields: [
      { key: "impact_hero_video", label: "Vidéo d'arrière-plan Hero", type: "video", placeholder: "/videos/video-acceuil.mp4" },
      { key: "impact_page_title", label: "Titre de la page", type: "text", placeholder: "LIMOBILIÉ IMPACT" },
      { key: "impact_hero_badge", label: "Badge Hero", type: "text", placeholder: "Impact Social" },
      { key: "impact_action1_title", label: "Titre Action Cœur", type: "text", placeholder: "Action Cœur" },
      { key: "impact_action1_subtitle", label: "Sous-Titre Action Cœur", type: "textarea", placeholder: "Limobilié soutient la lutte contre le cancer infantile" },
      { key: "impact_action1_desc", label: "Description Action Cœur", type: "textarea", placeholder: "Parce que chaque vie est precious, Limobilié s'engage..." },
      { key: "impact_action1_video", label: "Vidéo Action Cœur", type: "video", placeholder: "/videos/impac1.mp4" },
      { key: "impact_action2_title", label: "Titre Solidarité", type: "text", placeholder: "Engagement Social" },
      { key: "impact_action2_subtitle", label: "Sous-Titre Solidarité", type: "textarea", placeholder: "Don à l'Orphelinat de Bingerville" },
      { key: "impact_action2_desc", label: "Description Solidarité", type: "textarea", placeholder: "Plus qu'une entreprise, Limobilié est un acteur du cœur..." },
      { key: "impact_action2_video", label: "Vidéo Solidarité", type: "video", placeholder: "/videos/impac2.mp4" },
      { key: "impact_action3_title", label: "Titre Éducation", type: "text", placeholder: "Éducation" },
      { key: "impact_action3_subtitle", label: "Sous-Titre Éducation", type: "textarea", placeholder: "Kits Scolaires & Écoles" },
      { key: "impact_action3_desc", label: "Description Éducation", type: "textarea", placeholder: "Parce que l'avenir se construit dès l'école..." },
      { key: "impact_action3_video", label: "Vidéo Éducation", type: "video", placeholder: "/videos/impac3.mp4" },
    ] 
  },
  equipe: { 
    title: "Equipe & Partenaires", 
    fields: [
      { key: "equipe_hero_image", label: "Image Hero", type: "image", placeholder: "/images/equipe.jpeg" },
      { key: "equipe_hero_badge", label: "Badge Hero", type: "text", placeholder: "L'Humain d'abord" },
      { key: "equipe_hero_title", label: "Titre principal Hero", type: "textarea", placeholder: "NOTRE ÉQUIPE" },
      { key: "equipe_intro_text", label: "Texte présentation", type: "textarea", placeholder: "Découvrez les visages derrière l'excellence de Limobilié." },
      { key: "equipe_dir_image", label: "Photo Directeur", type: "image", placeholder: "/images/photo1.jpeg" },
      { key: "equipe_dir_name", label: "Nom Directeur", type: "text", placeholder: "TÉDIE ANGE" },
      { key: "equipe_dir_role", label: "Rôle Directeur", type: "text", placeholder: "Directeur" },
      { key: "equipe_dir_quote", label: "Citation Directeur", type: "textarea", placeholder: "\"Chez Limobilié, nous plaçons la satisfaction de nos clients au cœur de notre métier...\"" },
      { key: "equipe_commit_title", label: "Titre Engagement", type: "textarea", placeholder: "NOTRE ENGAGEMENT" },
      { key: "equipe_commit_subtitle", label: "Sous-Titre", type: "textarea", placeholder: "Nous construisons des relations durables basées sur la confiance et l'expertise." },
      { 
        key: "equipe_engagements_list", 
        label: "Liste des Engagements (Dynamique)", 
        type: "group-list",
        fields: [
          { key: "title", label: "Titre", type: "text", placeholder: "Ex: Accompagnement" },
          { key: "description", label: "Description", type: "textarea", placeholder: "Description de l'engagement..." },
        ]
      },
    ] 
  },
  blog: { 
    title: "Page Blog", 
    fields: [
      { key: "blog_title", label: "Titre de la page", type: "text", placeholder: "ACTUALITÉS & CONSEILS" },
      { key: "blog_subtitle", label: "Sous-titre", type: "textarea", placeholder: "Restez informé des dernières tendances du marché immobilier en Côte d'Ivoire." },
    ] 
  },
  contact: { 
    title: "Page Contact", 
    fields: [
      { key: "contact_title", label: "Titre principal", type: "text", placeholder: "CONTACTEZ-NOUS" },
      { key: "contact_subtitle", label: "Sous-titre", type: "textarea", placeholder: "Notre équipe est à votre écoute pour tous vos projets immobiliers." },
      { key: "contact_phone", label: "Téléphone de contact", type: "text", placeholder: "+225 05 45 93 56 73" },
      { key: "contact_email", label: "Email de contact", type: "text", placeholder: "info@limobilie.ci" },
    ] 
  },
  partenaire: { 
    title: "Devenir Partenaire", 
    fields: [
      { key: "partenaire_title", label: "Titre de la page", type: "text", placeholder: "DEVENEZ PARTENAIRE" },
      { key: "partenaire_intro", label: "Texte introduction", type: "textarea", placeholder: "Rejoignez le réseau Limobilié et développez votre activité avec nous." },
    ] 
  },
  demarcheur: { 
    title: "Espace Démarcheur", 
    fields: [
      { key: "demarcheur_title", label: "Titre de la page", type: "text", placeholder: "PROGRAMME DÉMARCHEURS" },
      { key: "demarcheur_intro", label: "Texte introduction", type: "textarea", placeholder: "Gagnez des commissions sur chaque vente réussie." },
    ] 
  },
};


export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const config = pageConfigs[slug];

  useEffect(() => {
    if (!config) {
      router.push("/admin");
      return;
    }

    async function fetchContent() {
      try {
        const { data, error } = await supabase
          .from("limobilie_content")
          .select("key, value")
          .in("key", config.fields.map(f => f.key));

        if (error && error.code !== '42P01') { 
          console.error(error);
        }

        const initialData: Record<string, string> = {};
        
        config.fields.forEach((field) => {
          if (field.type === "list" || field.type === "group-list") {
             initialData[field.key] = "[]"; // Initialiser comme tableau vide JSON
             if (field.placeholder && Array.isArray(field.placeholder)) {
               initialData[field.key] = JSON.stringify(field.placeholder);
             }
          } else {
            initialData[field.key] = (field.placeholder as string) || "";
          }
        });

        if (data) {
          data.forEach((item) => {
            if (item.value !== null && item.value !== undefined && item.value !== '') {
              initialData[item.key] = item.value;
            }
          });
        }
        
        setFormData(initialData);
      } catch (err) {
        console.error("Erreur de chargement", err);
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [slug, config, router]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = async (key: string, file: File, type: string) => {
    setUploadingKey(key);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `pages/${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
          .from('limobilie_media')
          .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
          .from('limobilie_media')
          .getPublicUrl(filePath);

      setUploadingKey(null);
      return publicUrl;
    } catch (err: unknown) {
      console.error(err);
      setNotification({ type: "error", message: "Erreur lors du téléchargement." });
      setUploadingKey(null);
      return null;
    }
  };

  const handleListChange = (key: string, index: number, value: string) => {
    try {
      const currentVal = formData[key] || "[]";
      const arr = JSON.parse(currentVal);
      arr[index] = value;
      handleChange(key, JSON.stringify(arr));
    } catch (e) {
      console.error("Erreur parsing liste", e);
    }
  };

  const handleGroupListChange = (key: string, index: number, subKey: string, value: string | string[]) => {
    try {
      const currentVal = formData[key] || "[]";
      const arr = JSON.parse(currentVal);
      if (!arr[index]) arr[index] = {};
      arr[index][subKey] = value;
      handleChange(key, JSON.stringify(arr));
    } catch (e) {
      console.error("Erreur parsing group-list", e);
    }
  };

  const handleAddGroupListItem = (key: string, template: Record<string, AnyType>) => {
    try {
      const currentVal = formData[key] || "[]";
      const arr = JSON.parse(currentVal);
      arr.push(template);
      handleChange(key, JSON.stringify(arr));
    } catch (e) {
       console.error("Erreur parsing group-list", e);
    }
  };

  const handleRemoveGroupListItem = (key: string, index: number) => {
    try {
      const currentVal = formData[key] || "[]";
      const arr = JSON.parse(currentVal);
      arr.splice(index, 1);
      handleChange(key, JSON.stringify(arr));
    } catch (e) {
       console.error("Erreur parsing group-list", e);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setNotification(null);

    try {
      const updates = config.fields.map((field) => ({
        key: field.key,
        value: formData[field.key] || (field.type === 'group-list' || field.type === 'list' ? '[]' : ""),
        updated_at: new Date(),
      }));

      const { error } = await supabase.from("limobilie_content").upsert(updates);
      if (error) throw error;

      setNotification({ type: "success", message: "Modifications enregistrées avec succès !" });
    } catch (err: unknown) {
       console.error("Erreur lors de la sauvegarde", err);
       setNotification({ type: "error", message: "Impossible d'enregistrer." });
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  if (!config) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 pb-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="p-2 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-500 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Édition de contenu</p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">{config.title}</h1>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={loading || saving}
          className="bg-[var(--color-primary)] hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          <span>{saving ? "Sauvegarde..." : "Enregistrer les modifications"}</span>
        </button>
      </div>

      {notification && (
        <div className={`p-4 rounded-xl flex items-start space-x-3 text-sm font-bold border ${notification.type === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p>{notification.message}</p>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Informations Modifiables</h2>
          <p className="text-slate-500 text-sm mt-1">Gérez le contenu de votre page de manière dynamique.</p>
        </div>

        <div className="p-6 sm:p-8 space-y-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
               <Loader2 size={32} className="animate-spin mb-4" />
               <p className="font-medium text-sm">Chargement des données...</p>
            </div>
          ) : (
            config.fields.map((field) => (
              <div key={field.key} className="space-y-4 border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                <label className="block text-sm font-black text-slate-900 uppercase tracking-wide">
                  {field.label}
                </label>

                {field.type === "group-list" ? (
                   <div className="space-y-6">
                      {(() => {
                        const items = JSON.parse(formData[field.key] || "[]");
                        return (
                          <>
                            {items.map((item: Record<string, AnyType>, index: number) => (
                              <div key={index} className="bg-slate-50 rounded-[32px] p-6 sm:p-8 border border-slate-200 relative group/item shadow-sm">
                                <button 
                                  onClick={() => handleRemoveGroupListItem(field.key, index)}
                                  className="absolute top-4 right-4 p-2 bg-white text-red-400 hover:text-red-600 rounded-full shadow-sm opacity-0 group-hover/item:opacity-100 transition-opacity"
                                >
                                  <X size={20} />
                                </button>
                                <div className="grid grid-cols-1 gap-6">
                                  {field.fields?.map((sub) => (
                                    <div key={sub.key} className="space-y-2">
                                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.label}</label>
                                      {sub.type === "textarea" ? (
                                        <textarea
                                          value={item[sub.key] || ""}
                                          onChange={(e) => handleGroupListChange(field.key, index, sub.key, e.target.value)}
                                          placeholder={sub.placeholder as string}
                                          className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                                        />
                                      ) : sub.type === "image" ? (
                                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                                          <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 overflow-hidden relative flex-shrink-0">
                                            {item[sub.key] ? (
                                              <Image src={item[sub.key]} alt="Aperçu" fill className="object-cover" />
                                            ) : (
                                              <div className="w-full h-full flex items-center justify-center text-slate-200">
                                                <FileImage size={32} />
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex-1 w-full">
                                            <input 
                                              type="text"
                                              value={item[sub.key] || ""}
                                              onChange={(e) => handleGroupListChange(field.key, index, sub.key, e.target.value)}
                                              placeholder="URL de l'image..."
                                              className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs outline-none mb-2"
                                            />
                                            <label className="cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs inline-flex items-center space-x-2">
                                              {uploadingKey === `${field.key}-${index}-${sub.key}` ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                                              <span>Uploader</span>
                                              <input type="file" className="hidden" accept="image/*" onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                  const url = await handleFileUpload(`${field.key}-${index}-${sub.key}`, file, "image");
                                                  if (url) handleGroupListChange(field.key, index, sub.key, url);
                                                }
                                              }} />
                                            </label>
                                          </div>
                                        </div>
                                      ) : sub.type === "list" ? (
                                        <div className="space-y-2">
                                          {(item[sub.key] || []).map((point: string, pIdx: number) => (
                                            <div key={pIdx} className="flex gap-2">
                                              <input 
                                                type="text"
                                                value={point}
                                                onChange={(e) => {
                                                  const newPoints = [...(item[sub.key] || [])];
                                                  newPoints[pIdx] = e.target.value;
                                                  handleGroupListChange(field.key, index, sub.key, newPoints);
                                                }}
                                                className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-sm"
                                              />
                                              <button onClick={() => {
                                                const newPoints = [...(item[sub.key] || [])];
                                                newPoints.splice(pIdx, 1);
                                                handleGroupListChange(field.key, index, sub.key, newPoints);
                                              }} className="p-2 text-red-300 hover:text-red-500"><X size={16} /></button>
                                            </div>
                                          ))}
                                          <button onClick={() => {
                                            const newPoints = [...(item[sub.key] || [])];
                                            newPoints.push("");
                                            handleGroupListChange(field.key, index, sub.key, newPoints);
                                          }} className="text-xs font-bold text-[var(--color-primary)]">+ Ajouter un point</button>
                                        </div>
                                      ) : (
                                        <input
                                          type="text"
                                          value={item[sub.key] || ""}
                                          onChange={(e) => handleGroupListChange(field.key, index, sub.key, e.target.value)}
                                          placeholder={sub.placeholder as string}
                                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                                        />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const template = field.fields?.reduce((acc, f) => ({ ...acc, [f.key]: f.type === 'list' ? [] : "" }), {} as Record<string, AnyType>) || {};
                                handleAddGroupListItem(field.key, template);
                              }}
                              className="w-full bg-slate-100 border-2 border-dashed border-slate-300 p-8 rounded-[32px] text-slate-400 font-black uppercase tracking-widest hover:bg-slate-200 hover:text-slate-600 transition-all flex items-center justify-center gap-4"
                            >
                              <Plus size={24} />
                              Ajouter un {field.label.replace('Liste des ', '').replace(' (Dynamique)', '')}
                            </button>
                          </>
                        );
                      })()}
                   </div>
                ) : field.type === "list" ? (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    {(() => {
                      const currentVal = formData[field.key] || "[]";
                      let arr: string[] = [];
                      try { arr = JSON.parse(currentVal); } catch {}
                      
                      return (
                        <>
                          {arr.map((item, index) => (
                            <div key={index} className="flex gap-2 items-start">
                              <span className="bg-slate-200 text-slate-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 mt-2 text-xs">{index + 1}</span>
                              <textarea
                                value={item}
                                onChange={(e) => handleListChange(field.key, index, e.target.value)}
                                className="flex-1 min-h-[60px] p-3 bg-white border border-slate-200 rounded-xl outline-none resize-y text-sm"
                              />
                              <button 
                                onClick={() => {
                                   const newArr = [...arr];
                                   newArr.splice(index, 1);
                                   handleChange(field.key, JSON.stringify(newArr));
                                }}
                                className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl mt-1 transition-colors"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ))}
                          <button
                            onClick={() => {
                              const newArr = [...arr, ""];
                              handleChange(field.key, JSON.stringify(newArr));
                            }}
                            className="w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-500 bg-white border-2 border-dashed border-slate-200 px-4 py-3 rounded-xl hover:border-slate-300 hover:text-slate-700 transition-colors mt-4"
                          >
                            <Plus size={16} /> Ajouter un élément
                          </button>
                        </>
                      );
                    })()}
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder as string}
                    className="w-full min-h-[120px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-slate-700 font-medium"
                  />
                ) : (field.type === "image" || field.type === "video") ? (
                  <div className="flex flex-col sm:flex-row gap-6 items-center bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                    <div className="w-32 h-32 rounded-[24px] bg-white border border-slate-200 overflow-hidden relative flex-shrink-0 shadow-sm">
                      {formData[field.key] ? (
                        field.type === 'image' ? (
                          <Image src={formData[field.key]} alt="Preview" fill className="object-cover" />
                        ) : (
                          <video src={formData[field.key]} className="w-full h-full object-cover" />
                        )
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-200">
                           {field.type === 'image' ? <FileImage size={40} /> : <FileVideo size={40} />}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-4">
                      <input 
                        type="text"
                        value={formData[field.key] || ""}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder="URL du média..."
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                      />
                      <label className="cursor-pointer bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold text-sm inline-flex items-center space-x-2 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-all">
                        {uploadingKey === field.key ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                        <span>Télécharger {field.type === 'image' ? "une image" : "une vidéo"}</span>
                        <input type="file" className="hidden" accept={field.type === 'image' ? "image/*" : "video/*"} onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = await handleFileUpload(field.key, file, field.type);
                            if (url) handleChange(field.key, url);
                          }
                        }} />
                      </label>
                    </div>
                  </div>
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder as string}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-slate-700 font-medium"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
