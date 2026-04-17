import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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

  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="relative block h-[70px] w-[260px]">
              <Image
                src="/images/logo2.png"
                alt="Limobilié Logo"
                fill
                sizes="340px"
                className="object-contain object-left scale-[3] transform origin-left"
              />
            </Link>
            <p className="text-slate-500 text-lg leading-relaxed max-w-sm font-medium">
              L&apos;excellence immobilière en Côte d&apos;Ivoire. Nous transformons vos projets en réalités durables avec passion et rigueur.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { Icon: FaWhatsapp, href: "https://wa.me/+2250545935673" },
                { Icon: FaFacebook, href: "https://www.facebook.com/share/1DEKHno3b9/" },
                { Icon: FaYoutube, href: "https://youtube.com/@limobilie?si=Q_G4FCcjsH08d3xi" },
                { Icon: FaInstagram, href: "https://www.instagram.com/limobilie?igsh=MWVnbjhsMHBid2Noag==" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] hover:bg-red-50 transition-all duration-300"
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-black text-[var(--color-text)] uppercase tracking-widest text-xs mb-8">
                {group.title}
              </h3>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-slate-500 font-medium hover:text-[var(--color-primary)] transition-colors inline-flex items-center group"
                    >
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
              <p className="font-semibold text-slate-900 whitespace-pre-line text-[15px]">Côte d’Ivoire, Abidjan{"\n"}Bingerville, Paris-Village</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Appelez-nous</p>
              <p className="font-semibold text-slate-900 text-[15px]">+225 05 45 93 56 73</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-[var(--color-primary)] shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Email</p>
              <p className="font-semibold text-slate-900 tracking-tight text-[15px]">limobilie225@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-slate-400 space-y-4 md:space-y-0">
          <p>© {currentYear} Limobilié. L&apos;excellence par nature.</p>
          <div className="flex space-x-8">
            <Link href="/mentions-legales" className="hover:text-slate-900 transition-colors">
              Mentions Légales
            </Link>
            <Link href="/confidentialite" className="hover:text-slate-900 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
