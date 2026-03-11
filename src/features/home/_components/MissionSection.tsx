import { motion } from "framer-motion";
import { Target, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import imgAbout from "@/assets/images/IMG_20231104_083345.jpg";

export const MissionSection = () => {
  const values = [
    {
      title: "Locally Led",
      desc: "Our projects originate from and are managed by the communities themselves.",
    },
    {
      title: "Sustainable Growth",
      desc: "We focus on long-term infrastructure and self-reliant systems.",
    },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-zinc-900">
      <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand-main font-bold uppercase tracking-widest text-sm mb-6 block">
              Our Heart & Mission
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              Driven by{" "}
              <span className="text-brand-main italic">
                Ancient Traditions,
              </span>{" "}
              Focused on Tomorrow.
            </h2>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Established in 2005, Debo Ethiopia is a non-profit dedicated to
              improving life in rural Ethiopia through the communal culture of
              "Debo".
            </p>
            <div className="space-y-6 mb-12">
              {values.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-brand-main/20 flex items-center justify-center shrink-0">
                    <Target className="text-brand-main w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-1 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/about"
              className="btn btn-primary rounded-2xl px-8 h-14 font-black"
            >
              Our Full Story <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-brand-main/30 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0" />
            <div className="relative aspect-4/5 rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src={imgAbout}
                className="w-full h-full object-cover"
                alt="About Debo"
              />
              <div className="absolute bottom-10 left-10 text-white">
                <Award className="w-12 h-12 mb-4 text-brand-main" />
                <h5 className="text-3xl font-bold mb-2">Impact First</h5>
                <p className="opacity-80 font-medium">
                  Serving 12+ Districts in rural Ethiopia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
