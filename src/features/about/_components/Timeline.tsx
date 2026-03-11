import { motion } from "framer-motion";

interface Props {
  year: string;
  event: string;
  icon: string;
  index: number;
}

const Timeline = ({ year, event, icon, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ x: 4 }}
      className="relative pl-16 group"
    >
      {/* Timeline dot with icon */}
      <div className="absolute left-0 top-0 w-12 h-12 rounded-full bg-linear-to-br from-[#16A34A] to-[#15803D] flex items-center justify-center shadow-lg z-10 group-hover:scale-110 group-hover:shadow-xl transition-all">
        <span className="text-lg">{icon}</span>
      </div>
      {/* Year badge */}
      <div className="absolute left-14 top-1">
        <span className="text-xs font-bold text-[#16A34A] uppercase tracking-wider">
          {year}
        </span>
      </div>
      {/* Card */}
      <div className="pt-8">
        <div className="p-5 rounded-xl bg-white shadow-sm border-l-4 border-[#16A34A] hover:shadow-lg hover:border-[#16A34A] transition-all cursor-pointer">
          <p className="text-base text-gray-900 font-medium leading-relaxed">
            {event}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
