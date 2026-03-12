import { Footer, NavBar } from "@/components";

import { ContactForm } from "./ContactForm";
import ContactHero from "./ContactHero";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <ContactHero />
      <main id="main-content" className="grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
