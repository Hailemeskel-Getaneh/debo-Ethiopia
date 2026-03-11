import { motion } from "framer-motion";
import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { NavBar, Footer } from "@/components";

const board = [
  {
    name: "Dr. Abebe Haile",
    role: "Board Chair",
    bio: "Former educator with 25 years of experience in international development and educational reform.",
    image: "/src/assets/images/teacher.jpg",
    email: "abebe@deboethiopia.org",
  },
  {
    name: "Tigist Alemu",
    role: "Vice Chair",
    bio: "Technology entrepreneur and passionate advocate for STEM education and gender equity in Africa.",
    image: "/src/assets/images/teachers.jpg",
    email: "tigist@deboethiopia.org",
  },
  {
    name: "Solomon Tekle",
    role: "Treasurer",
    bio: "Financial executive with deep expertise in non-profit management and impact investing.",
    image: "/src/assets/images/primary_teacher.jpg",
    email: "solomon@deboethiopia.org",
  },
  {
    name: "Meseret Kebede",
    role: "Secretary",
    bio: "Education policy specialist, community organizer, and champion of girls' education in rural Ethiopia.",
    image: "/src/assets/images/Grade_9.jpg",
    email: "meseret@deboethiopia.org",
  },
];

const leadership = [
  {
    name: "Yohannes Desta",
    role: "Executive Director",
    bio: "Leading DeboEthiopia with vision and passion for educational equity, Yohannes brings 15 years of NGO leadership experience.",
    image: "/src/assets/images/IMG_20231210_135056.jpg",
    email: "yohannes@deboethiopia.org",
  },
  {
    name: "Hirut Tadesse",
    role: "Director of Programs",
    bio: "Overseeing all educational programs and ensuring quality delivery across Ethiopia's diverse communities.",
    image: "/src/assets/images/IMG_20231206_144403.jpg",
    email: "hirut@deboethiopia.org",
  },
  {
    name: "Dawit Gebru",
    role: "Director of Operations",
    bio: "Managing field operations and regional partnerships to ensure our mission reaches every corner of the country.",
    image: "/src/assets/images/IMG_20231213_150540.jpg",
    email: "dawit@deboethiopia.org",
  },
];

const advisors = [
  {
    name: "Prof. Almaz Gebre",
    org: "Addis Ababa University",
    domain: "Education Policy",
  },
  {
    name: "Dr. Selamawit Bekele",
    org: "World Bank Group",
    domain: "International Development",
  },
  {
    name: "Biruk Asfaw",
    org: "Tech4Dev Foundation",
    domain: "Technology & Innovation",
  },
  {
    name: "Firehiwot Mulugeta",
    org: "UNICEF Ethiopia",
    domain: "Child Rights & Welfare",
  },
  {
    name: "Dr. Habtamu Girma",
    org: "Harvard Extension",
    domain: "Education Research",
  },
  {
    name: "Mulu Bekele",
    org: "African Development Bank",
    domain: "Philanthropy & Finance",
  },
];

function MemberCard({ member }: { member: (typeof board)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="aspect-[4/5] overflow-hidden relative bg-gray-900">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <a
            href={`mailto:${member.email}`}
            className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-[#16A34A] hover:text-white transition-all shadow"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-[#16A34A] hover:text-white transition-all shadow">
            <Linkedin className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-sm bg-[#16A34A] text-white text-xs font-medium uppercase">
            {member.role}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#16A34A] transition-colors">
          {member.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

function LeadershipCard({ member }: { member: (typeof leadership)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white rounded-md overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="aspect-square overflow-hidden relative bg-gray-900">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-sm bg-[#16A34A] text-white text-xs font-medium uppercase">
            {member.role}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#16A34A] transition-colors">
          {member.name}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {member.bio}
        </p>
      </div>
    </motion.div>
  );
}

export default function BoardLeadership() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <main>
        {/* Hero */}
        <section
          className="relative pt-28 pb-16"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          }}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4"
            >
              Board & <span className="text-[#16A34A]">Leadership</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 max-w-2xl mx-auto"
            >
              Meet the dedicated individuals guiding Debo Ethiopia's mission to
              empower rural communities through sustainable development.
            </motion.p>
          </div>
        </section>

        {/* Board Members */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Board of Directors
            </h2>
            <p className="text-gray-600 mb-8">
              Strategic oversight and governance
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {board.map((member, i) => (
                <MemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Leadership Team
            </h2>
            <p className="text-gray-600 mb-8">
              Day-to-day operations and program execution
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {leadership.map((member, i) => (
                <LeadershipCard key={i} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* Advisors */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Advisory Board
            </h2>
            <p className="text-gray-600 mb-8">
              Expert guidance from global leaders
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisors.map((advisor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-5 rounded-md border border-gray-200 bg-white hover:shadow-md hover:border-[#16A34A]/30 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-lg border border-[#16A34A]/10">
                      {advisor.name
                        .split(" ")
                        .filter((_, i2) => i2 < 2)
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#16A34A] transition-colors">
                        {advisor.name}
                      </h3>
                      <p className="text-xs font-medium text-[#16A34A] uppercase tracking-wider">
                        {advisor.domain}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {advisor.org}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-[#16A34A]">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Whether you want to volunteer, partner, or donate, your
              contribution makes a difference in rural Ethiopia.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#16A34A] font-medium px-6 py-3 rounded-md hover:scale-105 active:scale-95 transition-transform shadow-md"
            >
              Get Involved <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
