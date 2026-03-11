import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, ChevronDown, Heart } from "lucide-react";
import { FooterNewsLetter } from "./FooterNewsLetter";
import logo from "@/assets/images/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-zinc-950 text-zinc-400 relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Decorative Borders & Glows */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-brand-main to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-main/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 pt-20 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <FooterBrand />

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {["About Us", "Programs", "Projects", "News", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(" ", "")}`}
                      className="hover:text-brand-main transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-main w-5 h-5 shrink-0" />
                <p>Bole Sub-city, Woreda 03, House No. 124, Addis Ababa</p>
              </div>
              <a
                href="mailto:info@deboethiopia.org"
                className="flex items-center gap-3 hover:text-brand-main"
              >
                <Mail className="text-brand-main w-4 h-4" />{" "}
                info@deboethiopia.org
              </a>
              <a
                href="tel:+251911000000"
                className="flex items-center gap-3 hover:text-brand-main"
              >
                <Phone className="text-brand-main w-4 h-4" /> +251 911 00 00 00
              </a>
            </div>
          </div>

          <FooterNewsLetter />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-zinc-500">
            © {currentYear} Debo Ethiopia. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs">
                <Globe className="w-3.5 h-3.5" /> English{" "}
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const FooterBrand = () => (
  <div className="lg:col-span-4 flex flex-col gap-6">
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
        <img
          src={logo}
          alt="Debo Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-heading text-2xl font-bold tracking-tight text-white">
        Debo <span className="text-brand-main">Ethiopia</span>
      </span>
    </Link>
    <p className="text-base leading-relaxed opacity-80 max-w-sm">
      Building resilient Ethiopian communities through sustainable development,
      education, and healthcare since 2005.
    </p>
    <Link
      to="/donate"
      className="btn-action px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 w-fit"
    >
      <Heart className="w-4 h-4 fill-current" />
      Support Us
    </Link>
  </div>
);
