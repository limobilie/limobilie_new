import { Scale, Building2, Server, Globe2, ShieldAlert, FileText, Link } from "lucide-react";

export default function MentionsLegalesPage() {
  const sections = [
    {
      id: "editeur",
      icon: Building2,
      title: "Éditeur du site",
      content: (
        <div className="space-y-4">
          <p className="font-bold text-lg text-slate-900">LIMOBILIÉ</p>
          <p className="text-slate-600">
            Société immobilière spécialisée dans la commercialisation de biens immobiliers en Côte d’Ivoire.
          </p>
          <ul className="space-y-2 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <li><strong className="text-slate-900">Représentant légal :</strong> Monsieur TÉDIE ANGE ELIE</li>
            <li><strong className="text-slate-900">Siège social :</strong> Abidjan, Côte d’Ivoire</li>
            <li><strong className="text-slate-900">Téléphone :</strong> +225 0545935673</li>
            <li><strong className="text-slate-900">Email :</strong> limobilie225@gmail.com</li>
          </ul>
        </div>
      )
    },
    {
      id: "hebergement",
      icon: Server,
      title: "Hébergement du site",
      content: (
        <ul className="space-y-3 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-slate-600">
          <li><strong className="text-slate-900">Nom de l’hébergeur :</strong> Vercel Inc.</li>
          <li><strong className="text-slate-900">Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
          <li><strong className="text-slate-900">Téléphone :</strong> +1 559-288-7060</li>
          <li><strong className="text-slate-900">Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-[var(--color-primary)] hover:underline">https://vercel.com</a></li>
        </ul>
      )
    },
    {
      id: "acces",
      icon: Globe2,
      title: "Accès au site",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Le site est accessible à tout utilisateur disposant d’un accès internet.</p>
          <p>LIMOBILIÉ s’efforce d’assurer un accès continu au site, sans pour autant garantir son absence d’interruptions ou de dysfonctionnements liés aux réseaux.</p>
        </div>
      )
    },
    {
      id: "responsabilite",
      icon: ShieldAlert,
      title: "Responsabilité",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Les informations publiées sur le site sont fournies à titre strictement informatif.</p>
          <p>LIMOBILIÉ ne saurait être tenue responsable des erreurs, omissions ou résultats obtenus suite à l’utilisation inappropriée de ces informations.</p>
        </div>
      )
    },
    {
      id: "propriete",
      icon: FileText,
      title: "Propriété intellectuelle",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>L’ensemble des contenus présents sur le site (textes, images, logos, vidéos) est la propriété exclusive de LIMOBILIÉ, sauf mention contraire explicite.</p>
          <div className="bg-red-50 text-red-900 p-4 rounded-xl border border-red-100 font-medium font-heading">
            Toute reproduction ou utilisation sans autorisation préalable et écrite est formellement interdite.
          </div>
        </div>
      )
    },
    {
      id: "liens",
      icon: Link,
      title: "Liens externes",
      content: (
        <div className="space-y-4 text-slate-600">
          <p>Le site peut contenir des liens hypertexte orientant vers d’autres sites internet.</p>
          <p>LIMOBILIÉ ne peut être tenue responsable du contenu éditorial ni des politiques de confidentialité de ces sites tiers.</p>
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
            <Scale className="text-[var(--color-primary)]" size={16} />
            Transparence & Droit
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-heading leading-tight tracking-tighter uppercase italic">
            MENTIONS <span className="text-[var(--color-primary)]">LÉGALES</span>
          </h1>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-8 md:p-12 space-y-12">
          
          <div className="text-center pb-8 border-b border-slate-100">
             <p className="text-slate-500 font-medium">
               Dernière mise à jour : 17 Avril 2026<br/>
               Veuillez lire attentivement les mentions légales avant d&apos;utiliser le site <strong>Limobilié</strong>.
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
