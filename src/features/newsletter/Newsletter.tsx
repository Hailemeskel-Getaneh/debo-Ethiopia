import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight, Sparkles, Bell, BookOpen, Calendar, Heart } from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const pastIssues = [
    {
        title: "February 2025: Reaching Every Child",
        summary: "Our STEM program hits 1,200 students. Clean water borehole #2 drilled in Hawassa. Meet our new Director of Programs.",
        date: "Feb 1, 2025",
        tag: "Latest Issue",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=350&fit=crop",
    },
    {
        title: "January 2025: A New Year, New Goals",
        summary: "Year-in-review: 5,000 students served. Launching 3 new projects in 2025. Bahir Dar Solar Project announced.",
        date: "Jan 1, 2025",
        tag: null,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop",
    },
    {
        title: "December 2024: Celebrating Milestones",
        summary: "50 scholarship girls celebrated at Gondar City Hall. $120,000 raised at the Annual Gala. Thank you from our team.",
        date: "Dec 1, 2024",
        tag: null,
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=350&fit=crop",
    },
    {
        title: "November 2024: Health First",
        summary: "Community Health Fair reaches 2,000+ people. New mental health pilot approved for Harar. Nutrition stats update.",
        date: "Nov 1, 2024",
        tag: null,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=350&fit=crop",
    },
];

const benefits = [
    { icon: Bell, title: "Latest Updates", desc: "Be the first to know about new programs, projects, and events." },
    { icon: BookOpen, title: "Impact Stories", desc: "Real stories from students, families, and communities we serve." },
    { icon: Calendar, title: "Upcoming Events", desc: "Never miss a gala, workshop, or fundraiser." },
    { icon: Heart, title: "Exclusive Insights", desc: "Donor reports, behind-the-scenes, and impact data." },
];

export function Newsletter() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[60vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />
                    <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />


                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                        <div className="grid lg:grid-cols-2 gap-14 items-center">
                            {/* Left: copy */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
                                    <Sparkles className="w-4 h-4 text-[#00b359]" /> Monthly Newsletter
                                </div>
                                <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
                                    Stay Connected to the{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                                        Mission
                                    </span>
                                </h1>
                                <p className="text-xl text-white/75 mb-8 leading-relaxed">
                                    Every month we send one email packed with impact stories, program updates,
                                    upcoming events, and ways you can help. No spam, ever.
                                </p>
                                <div className="flex items-center gap-6 text-sm text-white/60">
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free, monthly</span>
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unsubscribe anytime</span>
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 2,400+ readers</span>
                                </div>
                            </div>

                            {/* Right: form */}
                            <div className="bg-white rounded-3xl p-8 shadow-2xl">
                                {submitted ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">You're subscribed!</h2>
                                        <p className="text-gray-500">
                                            Welcome to the DeboEthiopia community, {name || "friend"}. Check your inbox for a
                                            welcome email from us.
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subscribe for Free</h2>
                                        <p className="text-gray-500 text-sm mb-6">Join 2,400+ readers who follow our monthly impact stories.</p>
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name</label>
                                                <input
                                                    type="text"
                                                    placeholder="Tigist Alemu"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009639] text-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                                                <input
                                                    type="email"
                                                    required
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#009639] text-gray-900"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full flex items-center justify-center gap-2 bg-[#009639] text-white font-bold py-3.5 rounded-xl hover:bg-[#007a2e] transition-all duration-300 hover:shadow-lg disabled:opacity-60"
                                            >
                                                {loading ? (
                                                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <><Mail className="w-5 h-5" /> Subscribe Now</>
                                                )}
                                            </button>
                                            <p className="text-center text-xs text-gray-400">
                                                We respect your privacy. Unsubscribe at any time.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── WHY SUBSCRIBE ── */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">What You'll Receive</h2>
                            <p className="text-lg text-gray-500 max-w-xl mx-auto">Every issue is crafted to keep you informed, inspired, and connected to our mission.</p>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {benefits.map((b, i) => (
                                <div key={i} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 text-center group">
                                    <div className="w-14 h-14 bg-[#009639]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <b.icon className="w-7 h-7 text-[#009639]" />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── PAST ISSUES ── */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Past Issues</h2>
                            <p className="text-lg text-gray-500 max-w-xl mx-auto">Browse previous newsletters to see what our readers receive each month.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {pastIssues.map((issue, i) => (
                                <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className="h-44 overflow-hidden relative">
                                        <img src={issue.image} alt={issue.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                        {issue.tag && (
                                            <span className="absolute top-3 left-3 bg-[#009639] text-white text-xs font-bold px-3 py-1 rounded-full">{issue.tag}</span>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <p className="text-xs text-gray-400 mb-2">{issue.date}</p>
                                        <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{issue.title}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed">{issue.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── BOTTOM CTA ── */}
                <section className="py-20 bg-gradient-to-br from-[#003d1a] to-[#009639] text-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <h2 className="text-4xl font-extrabold mb-4">Ready to Join 2,400+ Readers?</h2>
                        <p className="text-white/75 text-lg mb-8">Subscribe above or share this page with someone who cares about Ethiopia's future.</p>
                        <a href="/donate" className="inline-flex items-center gap-2 bg-[#00b359] text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300">
                            Also Consider Donating <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
