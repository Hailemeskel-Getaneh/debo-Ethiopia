import { Footer, NavBar } from "@/components";
import { motion } from "framer-motion";
import { FinalCTA, TeamMemberCard } from "./_components";
import { advisors, boardMembers, leadershipMembers } from "./teamData";

export default function BoardLeadership() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main>
        <Hero />
        <BoardMembersTeam />
        <LeadershipTeam />
        <AdvisorsTeam />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

const AdvisorsTeam = () => {
  return (
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
            <Advisor {...advisor} key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BoardMembersTeam = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Board of Directors
        </h2>
        <p className="text-gray-600 mb-8">Strategic oversight and governance</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardMembers.map((member, i) => (
            <TeamMemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const LeadershipTeam = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Leadership Team
        </h2>
        <p className="text-gray-600 mb-8">
          Day-to-day operations and program execution
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {leadershipMembers.map((member, i) => (
            <TeamMemberCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  return (
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
  );
};

const Advisor = ({
  name,
  org,
  domain,
  index,
}: {
  name: string;
  org: string;
  domain: string;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group p-5 rounded-md border border-gray-200 bg-white hover:shadow-md hover:border-[#16A34A]/30 transition-all cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-md bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A] font-bold text-lg border border-[#16A34A]/10">
          {name
            .split(" ")
            .filter((_, i2) => i2 < 2)
            .map((w) => w[0])
            .join("")}
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 group-hover:text-[#16A34A] transition-colors">
            {name}
          </h3>
          <p className="text-xs font-medium text-[#16A34A] uppercase tracking-wider">
            {domain}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">{org}</p>
        </div>
      </div>
    </motion.div>
  );
};
