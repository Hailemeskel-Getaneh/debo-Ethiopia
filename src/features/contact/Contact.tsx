import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";
import { contactService } from "@/services";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await contactService.submit(form);
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 bg-[#003d1a] overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#009639]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Get in Touch with <span className="text-[#00b359]">Us</span>
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Have a question, want to volunteer, or interested in partnering with
            DeboEthiopia? We'd love to hear from you. Drop us a message below!
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main id="main-content" className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-start">
            {/* LEFT: Contact Information & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009639]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#009639]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Our Location
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Mehal Meda
                        <br />
                        Amhara Region, Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009639]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#009639]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Phone Number
                      </h3>
                      <p className="text-gray-600 mt-1">
                        <a
                          href="tel:+251911234567"
                          className="hover:text-[#009639] transition-colors"
                        >
                          +251 911 234 567
                        </a>
                        <br />
                        <a
                          href="tel:+251116123456"
                          className="hover:text-[#009639] transition-colors"
                        >
                          +251 116 123 456
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009639]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#009639]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Email Address
                      </h3>
                      <p className="text-gray-600 mt-1">
                        <a
                          href="mailto:info@deboethiopia.org"
                          className="hover:text-[#009639] transition-colors"
                        >
                          info@deboethiopia.org
                        </a>
                        <br />
                        <a
                          href="mailto:support@deboethiopia.org"
                          className="hover:text-[#009639] transition-colors"
                        >
                          support@deboethiopia.org
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Embed */}
              <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-[300px] relative">
                <iframe
                  title="DeboEthiopia Location Map"
                  src="https://maps.google.com/maps?q=Mehal%20Meda,%20Ethiopia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full rounded-2xl border-0"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* RIGHT: Contact Form */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Thank you for reaching out,{" "}
                    {form.first_name || form.last_name || "friend"}. We'll get
                    back to you at <strong>{form.email}</strong> as soon as
                    possible.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        first_name: "",
                        last_name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          First Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Abebe"
                          value={form.first_name}
                          onChange={(e) =>
                            setForm({ ...form, first_name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Last Name
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Bikila"
                          value={form.last_name}
                          onChange={(e) =>
                            setForm({ ...form, last_name: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="abebe@example.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Type your message here..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-[#009639] text-white font-bold py-4 rounded-xl hover:bg-[#007a2e] transition-all hover:shadow-lg disabled:opacity-70 text-lg mt-2"
                    >
                      {loading ? (
                        <span className="w-6 h-6 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5 ml-1" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
