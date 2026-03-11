import { motion } from "framer-motion";
import { Heart, ShieldCheck, TrendingUp, Users } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description:
      "We care deeply about the communities we serve and approach our work with empathy and genuine concern.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of partnership and working together for greater, lasting impact.",
    gradient: "from-brand-main to-primary-700",
  },
  {
    icon: ShieldCheck,
    title: "Accountability",
    description:
      "We operate with honesty and complete transparency to our donors and the communities we serve.",
    gradient: "from-amber-500 to-orange-600",
  },
  {
    icon: TrendingUp,
    title: "Sustainability",
    description:
      "We focus on long-term infrastructure and systems that empower communities to be self-reliant.",
    gradient: "from-blue-500 to-indigo-600",
  },
];

const ValueGrid = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6 text-center">
        <span className="text-[#16A34A] font-bold uppercase tracking-wider text-xs mb-4 block">
          Our DNA
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          What Drives Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-md bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-md ${value.gradient} flex items-center justify-center text-white mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform`}
              >
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueGrid;
