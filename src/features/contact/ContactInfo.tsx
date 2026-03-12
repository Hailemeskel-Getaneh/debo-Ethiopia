import { MapPin, Phone, Mail } from "lucide-react";
import GoogleMap from "./GoogleMap";

const CONTACT_DATA = [
  {
    icon: MapPin,
    title: "Our Location",
    content: "Mehal Meda, Amhara Region, Ethiopia",
  },
  {
    icon: Phone,
    title: "Phone Number",
    links: [{ label: "+251 911 234 567", href: "tel:+251911234567" }],
  },
  {
    icon: Mail,
    title: "Email Address",
    links: [
      { label: "info@deboethiopia.org", href: "mailto:info@deboethiopia.org" },
    ],
  },
];

export const ContactInfo = () => (
  <div className="space-y-8">
    <div className="bg-white p-8 rounded-4xl shadow-sm border border-zinc-100">
      <h2 className="text-2xl font-black text-zinc-900 mb-8">
        Contact Information
      </h2>
      <div className="space-y-8">
        {CONTACT_DATA.map((item, i) => (
          <div key={i} className="flex gap-5">
            <div className="w-12 h-12 bg-brand-main/10 rounded-2xl flex items-center justify-center shrink-0">
              <item.icon className="w-6 h-6 text-brand-main" />
            </div>
            <div>
              <h4 className="font-bold text-zinc-900">{item.title}</h4>
              {item.content && (
                <p className="text-zinc-500 mt-1">{item.content}</p>
              )}
              {item.links?.map((link, li) => (
                <a
                  key={li}
                  href={link.href}
                  className="block text-zinc-500 hover:text-brand-main transition-colors mt-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    <GoogleMap />
  </div>
);
