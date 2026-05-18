import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  // Récupération des paramètres globaux depuis Supabase
  const { data } = await supabase
    .from("limobilie_content")
    .select("key, value")
    .in("key", ["global_email", "global_phone", "global_address", "global_facebook", "global_instagram", "global_linkedin", "global_twitter"]);

  const settings = (data || []).reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {} as Record<string, string>);

  const email    = settings.global_email    || "limobili225@gmail.com";
  const phone    = settings.global_phone    || "+225 05 45 93 56 73";
  const address  = settings.global_address  || "Côte d'Ivoire, Abidjan\nBingerville, Paris-Village";
  const facebook = settings.global_facebook || "https://www.facebook.com/share/1DEKHno3b9/";
  const instagram = settings.global_instagram || "https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==";


  const footerGroups = [
    {
      title: "Produits",
      links: [
        { name: "Tontine immobilière", href: "/tontine" },
        { name: "Limobilié impact", href: "/impact" },
      ],
    },
    {
      title: "Immobilier",
      links: [
        { name: "Acheter", href: "/acheter" },
        { name: "Rapports Immobiliers", href: "/rapports" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "Confier la commercialisation", href: "/commercialisation" },
        { name: "Confier vos travaux", href: "/travaux" },
        { name: "Faire gérer votre bien", href: "/gestion" },
      ],
    },
    {
      title: "Compagnie",
      links: [
        { name: "Notre équipe", href: "/equipe" },
        { name: "Blog", href: "/blog" },
        { name: "Partenaire", href: "/partenaire" },
        { name: "Devenir démarcheur", href: "/demarcheur" },
      ],
    },
  ];

  const socials = [
    { Icon: FaWhatsapp,  href: `https://wa.me/${phone.replace(/[^0-9]/g, "")}` },
    { Icon: FaFacebook,  href: facebook },
    { Icon: FaYoutube,   href: "https://youtube.com/@limobilie?si=Q_G4FCcjsH08d3xi" },
    { Icon: FaInstagram, href: instagram },
  ];

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="relative block h-[60px] w-[180px] hover:opacity-90 transition-opacity">
              <Image src="/images/logo2.png" alt="Limobilié Logo" fill sizes="180px" className="object-contain object-left" />
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed max-w-sm font-medium">
              L&apos;excellence immobilière en Côte d&apos;Ivoire. Nous transformons vos projets en réalités durables avec passion et rigueur.
            </p>
            <div className="flex space-x-4 pt-2">
              {socials.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-red-50 transition-all duration-300">
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-black text-[var(--color-text)] uppercase tracking-widest text-xs mb-8">{group.title}</h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-500 font-medium hover:text-[var(--color-primary)] transition-colors inline-flex items-center group">
                      <span className="relative pb-0.5">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="py-12 border-y border-slate-100 mb-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Localisation</p>
              <p className="font-semibold text-slate-900 whitespace-pre-line text-[15px]">{address}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Appelez-nous</p>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-slate-900 text-[15px] hover:text-[var(--color-primary)] transition-colors">
                {phone}
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</p>
              <a href={`mailto:${email}`} className="font-semibold text-slate-900 tracking-tight text-[15px] hover:text-[var(--color-primary)] transition-colors">
                {email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-400 space-y-4 md:space-y-0">
          <p>© {currentYear} Limobilié. L&apos;excellence par nature.</p>
          <div className="flex space-x-8">
            <Link href="/mentions-legales" className="hover:text-slate-900 transition-colors">Mentions Légales</Link>
            <Link href="/confidentialite" className="hover:text-slate-900 transition-colors">Confidentialité</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

