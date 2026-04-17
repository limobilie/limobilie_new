import { ShieldCheck, Database, Target, Lock, Share2, ServerCrash, Clock, UserCog, Cookie } from "lucide-react";

export default function ConfidentialitePage() {
  const sections = [
    {
      id: "collecte",
      icon: Database,
      title: "Collecte des données",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Dans le cadre de l’utilisation du site, LIMOBILIÉ peut collecter les données suivantes :</p>
          <ul className="list-disc list-inside space-y-2 mt-4 marker:text-[var(--color-primary)] font-medium text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <li>Nom et prénom</li>
            <li>Numéro de téléphone</li>
            <li>Adresse email</li>
            <li>Informations relatives aux demandes immobilières</li>
          </ul>
        </div>
      )
    },
    {
      id: "finalite",
      icon: Target,
      title: "Finalité de la collecte",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Les données collectées sont utilisées pour :</p>
          <ul className="list-disc list-inside space-y-2 mt-4 marker:text-[var(--color-primary)] font-medium text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <li>traiter les demandes des utilisateurs</li>
            <li>assurer le suivi client</li>
            <li>proposer des offres immobilières adaptées</li>
            <li>améliorer les services du site</li>
          </ul>
        </div>
      )
    },
    {
      id: "confidentialite",
      icon: Lock,
      title: "Confidentialité des données",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>LIMOBILIÉ s’engage à protéger la stricte confidentialité des données personnelles hébergées.</p>
          <div className="bg-red-50 text-red-900 p-4 rounded-xl border border-red-100 font-medium font-heading">
            Les données ne sont ni vendues ni cédées à des tiers sans autorisation.
          </div>
        </div>
      )
    },
    {
      id: "partage",
      icon: Share2,
      title: "Partage des données",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Les données peuvent être partagées uniquement avec :</p>
          <ul className="list-disc list-inside space-y-2 mt-4 marker:text-[var(--color-primary)] font-medium text-slate-700">
            <li><strong className="text-slate-900">Partenaires professionnels</strong>  (notaires, agents immobiliers)</li>
            <li><strong className="text-slate-900">Prestataires techniques</strong> (hébergement, maintenance)</li>
          </ul>
          <p className="mt-4 italic">Et uniquement dans le cadre de l&apos;exécution du service demandé.</p>
        </div>
      )
    },
    {
      id: "securite",
      icon: ServerCrash,
      title: "Sécurité des données",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>LIMOBILIÉ met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger les données contre :</p>
          <ul className="list-disc list-inside space-y-2 mt-4 marker:text-[var(--color-primary)] font-medium text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <li>accès non autorisé</li>
            <li>perte accidentelle ou illicite</li>
            <li>altération de l&apos;information</li>
          </ul>
        </div>
      )
    },
    {
      id: "duree",
      icon: Clock,
      title: "Durée de conservation",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Les données sont conservées de manière sécurisée pendant la durée strictement nécessaire au traitement de la relation client et au respect des obligations légales.</p>
        </div>
      )
    },
    {
      id: "droits",
      icon: UserCog,
      title: "Droits des utilisateurs",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Conformément à la réglementation en vigueur, l’utilisateur dispose des droits suivants concernant ses données personnelles :</p>
          <ul className="list-disc list-inside space-y-2 mt-4 marker:text-[var(--color-primary)] font-medium text-slate-700">
            <li>Droit d&apos;accès à ses données</li>
            <li>Droit de modification</li>
            <li>Droit de suppression</li>
          </ul>
          <div className="bg-slate-900 text-white p-6 rounded-2xl mt-6">
            <p className="font-bold mb-2">Exercer vos droits :</p>
            <p>Toute demande peut être adressée directement à : <a href="mailto:limobilie225@gmail.com" className="text-[var(--color-primary)] hover:underline ml-1">limobilie225@gmail.com</a></p>
          </div>
        </div>
      )
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Gestion des Cookies",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Le site peut utiliser des cookies pour améliorer l’expérience de navigation de l&apos;utilisateur et réaliser des statistiques d&apos;audience.</p>
          <p>L’utilisateur conserve à tout moment la liberté de les désactiver via les paramètres de son navigateur web.</p>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* HERO SECTION */}
      <section className="relative h-[40vh] flex items-center justify-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 z-10"></div>
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center text-white pt-20">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-4">
            <ShieldCheck className="text-[var(--color-primary)]" size={16} />
            Protection des données
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-heading leading-tight tracking-tighter uppercase italic">
            POLITIQUE DE <span className="text-[var(--color-primary)]">CONFIDENTIALITÉ</span>
          </h1>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <div className="text-center pb-8 border-b border-slate-100">
             <p className="text-slate-500 font-medium">
               Dernière mise à jour : 17 Avril 2026<br/>
               Découvrez comment Limobilié s&apos;engage à protéger vos informations personnelles.
             </p>
          </div>

          <div className="space-y-16">
            {sections.map((section, index) => (
              <div key={section.id} className="relative pl-8 md:pl-12">
                <div className="absolute left-0 top-0 w-10 md:w-16 h-[2px] bg-slate-100 rounded-full"></div>
                <div className="absolute left-0 top-0 w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full bg-[var(--color-primary)] -mt-[1px] md:-mt-[2px] shadow-[0_0_10px_2px_rgba(220,38,38,0.5)]"></div>
                
                <h2 className="flex items-center gap-4 text-2xl font-black font-heading text-slate-900 mb-6 uppercase tracking-tight">
                  <div className="bg-red-50 p-2 rounded-xl text-[var(--color-primary)]">
                    <section.icon size={24} />
                  </div>
                  {index + 1}. {section.title}
                </h2>
                
                <div className="text-lg leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
