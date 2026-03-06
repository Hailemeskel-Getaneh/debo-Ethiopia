import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Heart, Globe, Search } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "About",
    href: "#",
    dropdown: [
      { name: "About Us", href: "/about" },
      { name: "Achievements", href: "/achievements" },
      { name: "Board Leadership", href: "/boardleadership" },
    ],
  },
  { name: "Programs", href: "/programs" },
  {
    name: "Work",
    href: "#",
    dropdown: [
      { name: "Active Projects", href: "/projects?status=active" },
      { name: "Completed Projects", href: "/projects?status=completed" },
      { name: "Upcoming Projects", href: "/projects?status=upcoming" },
    ],
  },
  {
    name: "Media",
    href: "#",
    dropdown: [
      { name: "Latest News", href: "/news" },
      { name: "Photo Gallery", href: "/gallery" },
    ],
  },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white border-b border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
          : "py-4 bg-white border-b border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.05)]"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src={logo}
                alt="Debo Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span
              className={`font-heading text-xl font-bold tracking-tight text-gray-900`}
            >
              Debo <span className="text-[#16A34A]">Ethiopia</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isScrolled
                        ? "text-gray-700 hover:text-[#16A34A] hover:bg-gray-50"
                        : "text-gray-800 hover:text-[#16A34A] hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isScrolled
                        ? "text-gray-700 hover:text-[#16A34A] hover:bg-gray-50"
                        : "text-gray-800 hover:text-[#16A34A] hover:bg-gray-50"
                    }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 p-2 rounded-md bg-white shadow-sm border border-gray-100"
                    >
                      {link.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="flex items-center px-4 py-3 rounded-md text-sm text-gray-600 hover:bg-gray-100 hover:text-[#16A34A] transition-all group"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              className={`p-2 rounded-md transition-colors text-gray-700 hover:text-[#16A34A] hover:bg-gray-100`}
            >
              <Search className="w-5 h-5" />
            </button>
            <Link to="/donate">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#16A34A] hover:bg-[#15803D] text-white px-6 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <Heart className="w-4 h-4 fill-current" />
                Donate
              </motion.button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden relative z-50 p-2 rounded-md transition-all ${
              mobileMenuOpen
                ? "bg-[#16A34A] text-white"
                : isScrolled
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-900"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-white lg:hidden flex flex-col pt-24 px-6 overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.dropdown ? (
                    <div className="py-2">
                      <div className="text-gray-400 text-xs font-semibold uppercase tracking-widest px-4 mb-2">
                        {link.name}
                      </div>
                      <div className="flex flex-col gap-1 pl-4">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-3 px-4 rounded-xl text-lg font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-4 px-4 rounded-xl text-2xl font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto py-10 flex flex-col gap-4">
              <Link
                to="/donate"
                className="btn-gradient w-full py-4 rounded-xl text-center font-bold text-lg flex items-center justify-center gap-2"
              >
                <Heart className="w-6 h-6 fill-current" />
                Donate Now
              </Link>
              <div className="flex justify-center gap-6">
                {/* Social placeholders */}
                <div className="text-gray-400 p-2 hover:text-[#16A34A] transition-colors">
                  <Globe className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
