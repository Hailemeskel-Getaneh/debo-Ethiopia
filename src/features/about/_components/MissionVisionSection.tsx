import { motion } from "framer-motion";
import { Globe, Target } from "lucide-react";

const MissionVisionSection = () => {
  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          <Mission />
          <Vision />
        </div>
      </div>
    </section>
  );
};

const Mission = () => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group p-8 rounded-md bg-linear-to-br from-[#16A34A] to-green-800 text-white relative overflow-hidden cursor-pointer"
    >
      <Target className="w-12 h-12 mb-6 opacity-80" />
      <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
      <p className="text-white/80 leading-relaxed">
        To empower rural communities through sustainable development that
        respects local traditions while harnessing modern innovation for a
        better tomorrow.
      </p>
    </motion.div>
  );
};

const Vision = () => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group p-8 rounded-md bg-zinc-800 text-white relative overflow-hidden border border-zinc-700 hover:border-[#16A34A]/50 transition-all"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-main/10 rounded-full -mr-32 -mb-32 blur-3xl" />
      <Globe className="w-12 h-12 mb-6 text-brand-main opacity-80" />
      <h3 className="text-2xl font-bold mb-4 text-white">Our Vision</h3>
      <p className="text-white leading-relaxed">
        A resilient Ethiopia where every community has the resources, skills,
        and infrastructure to build its own flourishing future.
      </p>
    </motion.div>
  );
};
export default MissionVisionSection;
