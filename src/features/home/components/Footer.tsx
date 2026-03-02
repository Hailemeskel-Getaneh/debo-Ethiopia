import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Globe, Mail, Phone, MapPin, ChevronDown, Send, Loader2, CheckCircle2 } from "lucide-react";
import { subscribersService } from "@/services/subscribers.service";
import logo from "@/assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900" aria-label="Site Footer">
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Identity */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden">
                <img src={logo} alt="Debo Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Debo <span className="text-brand-main">Ethiopia</span>
              </span>
            </Link>
            <p className="text-base leading-relaxed max-w-sm opacity-80">
              Building resilient Ethiopian communities through sustainable development, education, and healthcare since 2005.
            </p>
            <div className="flex gap-4">
              <Link to="/donate" className="btn-action px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4 fill-current" />
                Support Us
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:ml-4">
            <h3 className="text-white font-heading font-bold text-lg mb-8 uppercase tracking-widest text-xs opacity-50">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              {['About Us', 'Programs', 'Projects', 'Achievements', 'News', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '')}`} className="text-zinc-400 hover:text-brand-main transition-colors duration-300 text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <h3 className="text-white font-heading font-bold text-lg mb-8 uppercase tracking-widest text-xs opacity-50">Connect</h3>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-brand-main w-5 h-5 shrink-0 mt-1" />
                <p className="text-sm leading-snug">Bole Sub-city, Woreda 03, House No. 124, Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-brand-main w-5 h-5 shrink-0" />
                <a href="mailto:info@deboethiopia.org" className="text-sm text-white hover:text-brand-main transition-colors">info@deboethiopia.org</a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-brand-main w-5 h-5 shrink-0" />
                <a href="tel:+251911000000" className="text-sm text-white hover:text-brand-main transition-colors">+251 911 00 00 00</a>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-white font-heading font-bold text-lg mb-2 uppercase tracking-widest text-xs opacity-50">Newsletter</h3>
            <p className="text-sm leading-relaxed mb-4">
              Subscribe to get latest updates on our impact and community stories.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <div className="relative group">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl px-5 py-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/50 focus:border-brand-main/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-brand-main text-white flex items-center justify-center hover:brightness-110 active:scale-95 transition-all disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : status === "success" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              {status === "success" && (
                <p className="text-xs text-brand-main mt-3 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 className="w-3 h-3" /> Thank you for subscribing!
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500 mt-3 animate-in fade-in slide-in-from-top-1">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[10px] uppercase tracking-widest font-bold opacity-30">Secure & Spam-free</span>
              <div className="h-px flex-1 bg-zinc-900" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8 text-sm">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {currentYear} Debo Ethiopia. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Language:</span>
            <button className="flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 transition-colors">
              <Globe className="w-3 h-3" />
              English
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

