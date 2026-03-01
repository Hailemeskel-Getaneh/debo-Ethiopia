import { useState } from "react";
import {
    Heart, CheckCircle2, Shield, ArrowRight, Sparkles,
    Users, BookOpen, Droplets, Home, CreditCard, Repeat,
    Smartphone, Wallet,
} from "lucide-react";
import NavBar from "../home/components/NavBar";
import Footer from "../home/components/Footer";

const presetAmounts = [10, 25, 50, 100, 250, 500];

const impactMap: Record<number, string> = {
    10: "Provides school supplies for 1 student for a month",
    25: "Funds 5 nutritious school meals for a child",
    50: "Covers one month of tutoring for a struggling student",
    100: "Pays school fees for a girl for an entire term",
    250: "Contributes to drilling a clean water point",
    500: "Sponsors a full scholarship for one semester",
};

const tiers = [
    { label: "Friend", min: 1, max: 49, color: "from-sky-400 to-blue-500", icon: Heart, perks: ["Impact newsletter", "Digital thank-you card"] },
    { label: "Supporter", min: 50, max: 249, color: "from-emerald-400 to-green-600", icon: BookOpen, perks: ["All Friend perks", "Quarterly impact report", "Mentioned in newsletter"] },
    { label: "Champion", min: 250, max: 999, color: "from-amber-400 to-orange-500", icon: Users, perks: ["All Supporter perks", "Personal impact story", "Annual certificate of appreciation"] },
    { label: "Founder", min: 1000, max: Infinity, color: "from-[#DA121A] to-rose-700", icon: Sparkles, perks: ["All Champion perks", "Name on our website", "Direct call with our Executive Director"] },
];

const impactStats = [
    { icon: BookOpen, value: "$10", label: "buys school supplies for 1 student" },
    { icon: Droplets, value: "$50", label: "contributes to clean water access" },
    { icon: Users, value: "$100", label: "pays a girl's school fees for a term" },
    { icon: Home, value: "$500", label: "sponsors one full semester scholarship" },
];

function getTier(amount: number) {
    return tiers.find((t) => amount >= t.min && amount <= t.max);
}

export function Donate() {
    const [frequency, setFrequency] = useState<"once" | "monthly">("once");
    const [selectedAmount, setSelectedAmount] = useState<number>(50);
    const [customAmount, setCustomAmount] = useState("");
    const [step, setStep] = useState<1 | 2>(1);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "" });
    const [paymentMethod, setPaymentMethod] = useState<"card" | "telebirr" | "cbebirr" | "chapa">("telebirr");
    const [phone, setPhone] = useState("");

    const effectiveAmount = customAmount ? Number(customAmount) : selectedAmount;
    const currentTier = getTier(effectiveAmount);
    const impactText = impactMap[selectedAmount] ?? (effectiveAmount >= 500 ? impactMap[500] : impactMap[10]);

    const handleCustomChange = (v: string) => {
        setCustomAmount(v);
        setSelectedAmount(0);
    };

    const handlePreset = (amt: number) => {
        setSelectedAmount(amt);
        setCustomAmount("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
    };

    return (
        <div className="min-h-screen bg-white">
            <NavBar />
            <main id="main-content">

                {/* ── HERO ── */}
                <section className="relative min-h-[45vh] flex items-center overflow-hidden pt-20">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639]" />
                    <div className="absolute -top-24 -right-24 w-[450px] h-[450px] rounded-full bg-[#00b359]/10 blur-3xl" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center w-full">
                        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-2 rounded-full mb-6">
                            <Heart className="w-4 h-4 text-[#00b359]" /> Every Donation Counts
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-5">
                            Give a Child a{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
                                Brighter Future
                            </span>
                        </h1>
                        <p className="text-xl text-white/75 max-w-2xl mx-auto">
                            Your donation directly funds education, health, and community programs for
                            Ethiopia's most vulnerable children. 100% goes to the mission.
                        </p>
                    </div>
                </section>

                {/* ── IMPACT STATS STRIP ── */}
                <section className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                            {impactStats.map((s, i) => (
                                <div key={i} className="py-8 flex flex-col items-center gap-2 text-center px-4">
                                    <div className="w-10 h-10 bg-[#009639]/10 rounded-xl flex items-center justify-center">
                                        <s.icon className="w-5 h-5 text-[#009639]" />
                                    </div>
                                    <p className="text-2xl font-black text-[#009639]">{s.value}</p>
                                    <p className="text-xs text-gray-500 leading-tight">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── MAIN CONTENT ── */}
                <section className="py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-5 gap-12">

                            {/* ── LEFT: DONATION FORM ── */}
                            <div className="lg:col-span-3">
                                {submitted ? (
                                    <div className="bg-white border border-gray-100 rounded-3xl p-12 shadow-xl text-center">
                                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                                        </div>
                                        <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Thank You, {form.name || "Friend"}!</h2>
                                        <p className="text-lg text-gray-500 mb-6">
                                            Your {frequency === "monthly" ? "monthly " : ""}gift of{" "}
                                            <span className="font-bold text-[#009639]">${effectiveAmount}</span> has been received.
                                            You'll get a receipt at <span className="font-semibold">{form.email}</span>.
                                        </p>
                                        {currentTier && (
                                            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${currentTier.color} text-white font-bold px-5 py-2.5 rounded-full mb-6`}>
                                                <currentTier.icon className="w-4 h-4" /> {currentTier.label} Donor
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-400">Together, we're building Ethiopia's future — one child at a time. 🇪🇹</p>
                                    </div>
                                ) : (
                                    <div className="bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden">
                                        {/* Step header */}
                                        <div className="flex border-b">
                                            {[{ n: 1, label: "Choose Amount" }, { n: 2, label: "Your Details" }].map((s) => (
                                                <button
                                                    key={s.n}
                                                    onClick={() => step > s.n && setStep(s.n as 1 | 2)}
                                                    className={`flex-1 py-4 text-sm font-bold transition-all ${step === s.n
                                                        ? "border-b-2 border-[#009639] text-[#009639]"
                                                        : "text-gray-400"
                                                        }`}
                                                >
                                                    {s.n}. {s.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="p-8">
                                            {step === 1 && (
                                                <div className="space-y-7">
                                                    {/* Frequency toggle */}
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-700 mb-3">Donation Frequency</p>
                                                        <div className="flex gap-3">
                                                            {(["once", "monthly"] as const).map((f) => (
                                                                <button
                                                                    key={f}
                                                                    onClick={() => setFrequency(f)}
                                                                    className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all ${frequency === f
                                                                        ? "border-[#009639] bg-[#009639]/5 text-[#009639]"
                                                                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                                                                        }`}
                                                                >
                                                                    {f === "monthly" ? (
                                                                        <span className="flex items-center justify-center gap-2">
                                                                            <Repeat className="w-4 h-4" /> Monthly
                                                                        </span>
                                                                    ) : "One-time"}
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {frequency === "monthly" && (
                                                            <p className="text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1">
                                                                <CheckCircle2 className="w-3.5 h-3.5" /> Monthly donors create lasting, predictable impact
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Preset amounts */}
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-700 mb-3">Select Amount (USD)</p>
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {presetAmounts.map((amt) => (
                                                                <button
                                                                    key={amt}
                                                                    onClick={() => handlePreset(amt)}
                                                                    className={`py-3.5 rounded-xl font-bold text-sm border-2 transition-all ${selectedAmount === amt && !customAmount
                                                                        ? "border-[#009639] bg-[#009639] text-white shadow-md"
                                                                        : "border-gray-200 text-gray-700 hover:border-[#009639]/50"
                                                                        }`}
                                                                >
                                                                    ${amt}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Custom amount */}
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-700 mb-2">Or enter a custom amount</p>
                                                        <div className="relative">
                                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                                                            <input
                                                                type="number"
                                                                min={1}
                                                                placeholder="Enter amount"
                                                                value={customAmount}
                                                                onChange={(e) => handleCustomChange(e.target.value)}
                                                                className="w-full pl-8 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639] text-gray-900 font-semibold"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Impact message */}
                                                    {effectiveAmount > 0 && (
                                                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                                                            <p className="text-sm text-emerald-800 font-medium flex items-start gap-2">
                                                                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-600" />
                                                                <span><strong>${effectiveAmount}</strong> {frequency === "monthly" ? "/month " : ""}— {impactText}.</span>
                                                            </p>
                                                        </div>
                                                    )}

                                                    {/* Donor tier badge */}
                                                    {currentTier && effectiveAmount > 0 && (
                                                        <div className={`flex items-center gap-3 bg-gradient-to-r ${currentTier.color} text-white rounded-2xl p-4`}>
                                                            <currentTier.icon className="w-6 h-6 flex-shrink-0" />
                                                            <div>
                                                                <p className="font-bold text-sm">{currentTier.label} Tier</p>
                                                                <p className="text-xs text-white/80">{currentTier.perks[currentTier.perks.length - 1]}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <button
                                                        disabled={effectiveAmount < 1}
                                                        onClick={() => setStep(2)}
                                                        className="w-full flex items-center justify-center gap-2 bg-[#009639] text-white font-bold py-4 rounded-xl hover:bg-[#007a2e] transition-all hover:shadow-lg disabled:opacity-40 text-lg"
                                                    >
                                                        Continue <ArrowRight className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <form onSubmit={handleSubmit} className="space-y-5">
                                                    <p className="text-sm text-gray-500 mb-2">Donating <strong className="text-gray-900">${effectiveAmount}</strong> {frequency === "monthly" ? "per month" : "one-time"}</p>

                                                    {/* Payment Method Selector */}
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Payment Method</label>
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                                            <button type="button" onClick={() => setPaymentMethod("telebirr")}
                                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === "telebirr" ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm" : "border-gray-200 text-gray-600 hover:border-blue-200"}`}>
                                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                                                                    <Smartphone className="w-4 h-4 text-blue-600" />
                                                                </div>
                                                                <span className="text-xs font-bold">Telebirr</span>
                                                            </button>
                                                            <button type="button" onClick={() => setPaymentMethod("cbebirr")}
                                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === "cbebirr" ? "border-purple-500 bg-purple-50 text-purple-700 shadow-sm" : "border-gray-200 text-gray-600 hover:border-purple-200"}`}>
                                                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                                                                    <Wallet className="w-4 h-4 text-purple-600" />
                                                                </div>
                                                                <span className="text-xs font-bold">CBE Birr</span>
                                                            </button>
                                                            <button type="button" onClick={() => setPaymentMethod("chapa")}
                                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === "chapa" ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm" : "border-gray-200 text-gray-600 hover:border-emerald-200"}`}>
                                                                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
                                                                    <Shield className="w-4 h-4 text-emerald-600" />
                                                                </div>
                                                                <span className="text-xs font-bold">Chapa</span>
                                                            </button>
                                                            <button type="button" onClick={() => setPaymentMethod("card")}
                                                                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === "card" ? "border-gray-800 bg-gray-50 text-gray-900 shadow-sm" : "border-gray-200 text-gray-600 hover:border-gray-300"}`}>
                                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                                                    <CreditCard className="w-4 h-4 text-gray-700" />
                                                                </div>
                                                                <span className="text-xs font-bold">Card</span>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                                                            <input required type="text" placeholder="Yohannes Desta" value={form.name}
                                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                                                            <input required type="email" placeholder="you@example.com" value={form.email}
                                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                        </div>
                                                    </div>

                                                    {paymentMethod === "card" ? (
                                                        <>
                                                            <div>
                                                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
                                                                <div className="relative">
                                                                    <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                    <input required type="text" placeholder="1234 5678 9012 3456" maxLength={19} value={form.card}
                                                                        onChange={(e) => setForm({ ...form, card: e.target.value })}
                                                                        className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                                </div>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry</label>
                                                                    <input required type="text" placeholder="MM / YY" maxLength={7} value={form.expiry}
                                                                        onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                                                                    <input required type="text" placeholder="123" maxLength={4} value={form.cvv}
                                                                        onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : paymentMethod === "telebirr" || paymentMethod === "cbebirr" ? (
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{paymentMethod === "telebirr" ? "Telebirr" : "CBE Birr"} Phone Number</label>
                                                            <div className="relative">
                                                                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                                <input required type="tel" placeholder="+251 911 234 567" value={phone}
                                                                    onChange={(e) => setPhone(e.target.value)}
                                                                    className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#009639]" />
                                                            </div>
                                                            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Have your phone ready to confirm the USSD prompt.
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mt-2 mb-2">
                                                            <p className="text-sm text-emerald-800 font-medium">You will be redirected to Chapa's secure checkout page to complete your payment.</p>
                                                        </div>
                                                    )}

                                                    <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 rounded-xl p-3">
                                                        <Shield className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                        Your payment is secured with 256-bit SSL encryption. We never store payment details.
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <button type="button" onClick={() => setStep(1)}
                                                            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 transition-all">
                                                            Back
                                                        </button>
                                                        <button type="submit" disabled={loading}
                                                            className="flex-[2] flex items-center justify-center gap-2 bg-[#009639] text-white font-bold py-3.5 rounded-xl hover:bg-[#007a2e] transition-all hover:shadow-lg disabled:opacity-60 text-base">
                                                            {loading ? (
                                                                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                            ) : (
                                                                <><Heart className="w-5 h-5" /> Donate ${effectiveAmount}{frequency === "monthly" ? "/mo" : ""}</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* ── RIGHT: INFO SIDEBAR ── */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Trust badges */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <h3 className="font-bold text-gray-900 mb-4">Why Donate to DeboEthiopia?</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "100% of your donation funds programs directly",
                                            "Registered non-profit with full financial transparency",
                                            "Annual audited financial reports published publicly",
                                            "Over 5,000 lives impacted since 2015",
                                            "Secure, encrypted payment processing",
                                        ].map((t, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                <CheckCircle2 className="w-4 h-4 text-[#009639] mt-0.5 flex-shrink-0" /> {t}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Donor tiers */}
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gray-900 mb-4">Donor Recognition Tiers</h3>
                                    <div className="space-y-3">
                                        {tiers.map((tier, i) => {
                                            const TierIcon = tier.icon;
                                            return (
                                                <div key={i} className={`flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r ${tier.color} text-white`}>
                                                    <TierIcon className="w-5 h-5 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <p className="font-bold text-sm">{tier.label}</p>
                                                        <p className="text-xs text-white/75">
                                                            {tier.max === Infinity ? `$${tier.min}+` : `$${tier.min}–$${tier.max}`}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Other ways to give */}
                                <div className="bg-[#003d1a] rounded-2xl p-6 text-white">
                                    <h3 className="font-bold mb-3">Other Ways to Give</h3>
                                    <ul className="space-y-2 text-sm text-white/75">
                                        <li>📦 In-kind donations (books, equipment)</li>
                                        <li>🤝 Corporate partnerships & matching</li>
                                        <li>🎗️ In memory / in honor donations</li>
                                        <li>📋 Legacy giving & estate planning</li>
                                    </ul>
                                    <a href="/contact" className="inline-flex items-center gap-1.5 mt-4 text-[#00b359] font-semibold text-sm hover:underline">
                                        Contact us to learn more <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
