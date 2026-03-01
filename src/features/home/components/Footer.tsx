import logo from "@/assets/images/image copy.png";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Debo Ethiopia"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </a>
            <p className="text-sm leading-relaxed mb-6">
              Empowering Ethiopian communities through sustainable development,
              education, and healthcare since 2005.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-brand-main hover:text-white transition-all"
                aria-label="Follow us on Twitter"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-brand-main hover:text-white transition-all"
                aria-label="Follow us on Facebook"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Our Work */}
          <div>
            <h3 className="text-white font-semibold mb-6">Our Work</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/programs?type=education"
                  className="hover:text-brand-main transition-colors"
                >
                  Education Support
                </a>
              </li>
              <li>
                <a
                  href="/programs?type=health"
                  className="hover:text-brand-main transition-colors"
                >
                  Community Health
                </a>
              </li>
              <li>
                <a
                  href="/programs?type=agriculture"
                  className="hover:text-brand-main transition-colors"
                >
                  Sustainable Agriculture
                </a>
              </li>
              <li>
                <a
                  href="/programs?type=economic"
                  className="hover:text-brand-main transition-colors"
                >
                  Economic Empowerment
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/about"
                  className="hover:text-brand-main transition-colors"
                >
                  Who We Are
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="hover:text-brand-main transition-colors"
                >
                  Current Projects
                </a>
              </li>
              <li>
                <a
                  href="/news"
                  className="hover:text-brand-main transition-colors"
                >
                  Latest News
                </a>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="hover:text-brand-main transition-colors"
                >
                  Media Gallery
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-brand-main transition-colors"
                >
                  Get In Touch
                </a>
              </li>
            </ul>
          </div>

          {/* Support Us */}
          <div>
            <h3 className="text-white font-semibold mb-6">Support Us</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="/donate"
                  className="text-accent-600 hover:text-accent-700 font-medium transition-colors"
                >
                  Make a Donation
                </a>
              </li>
              <li>
                <a
                  href="/volunteer"
                  className="hover:text-brand-main transition-colors"
                >
                  Volunteer Opportunities
                </a>
              </li>
              <li>
                <a
                  href="/partner"
                  className="hover:text-brand-main transition-colors"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-brand-main transition-colors"
                >
                  Fundraising Inquiries
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Debo Ethiopia. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="hover:text-white transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
