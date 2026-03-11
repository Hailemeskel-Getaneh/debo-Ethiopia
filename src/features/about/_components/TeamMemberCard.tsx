import { motion } from "framer-motion";
import { Mail, Linkedin } from "lucide-react";

interface MemberProps {
  member: any;
  variant?: "portrait" | "square";
}

export const TeamMemberCard = ({
  member,
  variant = "portrait",
}: MemberProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 shadow-sm hover:shadow-xl transition-all"
  >
    <div
      className={`relative overflow-hidden bg-zinc-900 ${variant === "square" ? "aspect-square" : "aspect-[4/5]"}`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-70 transition-all duration-700"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950/80 via-transparent to-transparent" />

      {/* Social Actions */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
        <a
          href={`mailto:${member.email}`}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-brand-main hover:text-white transition-colors"
        >
          <Mail className="w-4 h-4" />
        </a>
        {member.social?.linkedin && (
          <a
            href={member.social.linkedin}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-brand-main hover:text-white transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>

      <div className="absolute bottom-4 left-4 z-10">
        <span className="px-3 py-1 rounded-lg bg-brand-main text-white text-[10px] font-black uppercase tracking-widest">
          {member.role}
        </span>
      </div>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold text-zinc-900 group-hover:text-brand-main transition-colors">
        {member.name}
      </h3>
      <p className="text-zinc-500 text-sm leading-relaxed mt-2 line-clamp-3">
        {member.bio}
      </p>
    </div>
  </motion.div>
);
