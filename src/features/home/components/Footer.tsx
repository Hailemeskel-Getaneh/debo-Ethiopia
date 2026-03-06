import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Globe,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { subscribersService } from "@/services/subscribers.service";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await subscribersService.subscribe({ email });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Projects", href: "/projects" },
    { label: "Achievements", href: "/achievements" },
    { label: "News", href: "/news" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer
      className="bg-zinc-950 text-zinc-400 relative overflow-hidden"
      aria-label="Site Footer"
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-main to-transparent" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-main/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-action/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 pt-20 pb-8 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Section */}
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
              Building resilient Ethiopian communities through sustainable
              development, education, and healthcare since 2005.
            </p>
            <Link
              to="/donate"
              className="btn-action px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 w-fit"
            >
              <Heart className="w-4 h-4 fill-current" />
              Support Us
            </Link>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-zinc-400 hover:text-brand-main hover:translate-x-1 transition-all duration-300 text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-main w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">
                  Bole Sub-city, Woreda 03,
                  <br />
                  House No. 124, Addis Ababa,
                  <br />
                  Ethiopia
                </p>
              </div>
              <a
                href="mailto:info@deboethiopia.org"
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-brand-main transition-colors"
              >
                <Mail className="text-brand-main w-4 h-4" />
                info@deboethiopia.org
              </a>
              <a
                href="tel:+251911000000"
                className="flex items-center gap-3 text-sm text-zinc-300 hover:text-brand-main transition-colors"
              >
                <Phone className="text-brand-main w-4 h-4" />
                +251 911 00 00 00
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Newsletter
            </h3>
            <p className="text-sm leading-relaxed opacity-70 mb-5">
              Subscribe to get latest updates on our impact and community
              stories.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 pr-14 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/30 focus:border-brand-main/50 transition-all placeholder:text-zinc-600"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-brand-main text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : status === "success" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              {status === "success" && (
                <p className="text-xs text-brand-main mt-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3" /> Thank you for
                  subscribing!
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500 mt-2.5">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">
                Secure & Spam-free
              </span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>
          </div>
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
            <Link
              to="/terms"
              className="text-zinc-500 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-xs">Language:</span>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-medium hover:border-zinc-700 transition-colors">
              <Globe className="w-3.5 h-3.5" />
              English
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
