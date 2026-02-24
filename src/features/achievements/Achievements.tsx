import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Trophy, Star, Sparkles } from "lucide-react";

// Import local images
import heroImg from "@/assets/images/Grade_9.jpg";
import imgAbout from "@/assets/images/teachers.jpg";
import img1 from "@/assets/images/IMG_20231213_150540.jpg";
import img2 from "@/assets/images/IMG_20231104_083345.jpg";
import img3 from "@/assets/images/IMG_20231210_135056.jpg";
import NavBar from "../home/components/NavBar";

const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Award", "Milestone", "Grant", "Recognition"];

  const achievements = [
    {
      id: "1",
      title: "Best Nonprofit Organization 2025",
      description:
        "Awarded by the East African NGO Council for excellence in community development and transparency.",
      date: "2025-11-20",
      image: img1,
      category: "Award",
      icon: Trophy,
      color: "bg-yellow-400",
    },
    {
      id: "2",
      title: "1,000 Families Supported",
      description:
        "Reached a major milestone of providing direct support to over one thousand families in the region.",
      date: "2025-08-15",
      image: img2,
      category: "Milestone",
      icon: Award,
      color: "bg-[#009639]",
    },
    {
      id: "3",
      title: "Global Water Initiative Grant",
      description:
        "Received a substantial grant to expand our clean water projects to three new districts.",
      date: "2025-05-10",
      image: img3,
      category: "Grant",
      icon: Star,
      color: "bg-blue-500",
    },
    {
      id: "4",
      title: "Community Choice Award",
      description:
        "Voted by the local community as the most impactful program of the year.",
      date: "2024-12-05",
      image: heroImg,
      category: "Award",
      icon: Trophy,
      color: "bg-yellow-400",
    },
    {
      id: "5",
      title: "10,000 Students Reached",
      description:
        "Expanded our education programs to reach over ten thousand students across Ethiopia.",
      date: "2024-06-20",
      image: imgAbout,
      category: "Milestone",
      icon: Award,
      color: "bg-[#009639]",
    },
    {
      id: "6",
      title: "Healthcare Innovation Recognition",
      description:
        "Recognized by the Ministry of Health for innovative community health approaches.",
      date: "2024-03-15",
      image: img1,
      category: "Recognition",
      icon: Star,
      color: "bg-purple-500",
    },
  ];

  const filteredAchievements =
    activeCategory === "All"
      ? achievements
      : achievements.filter((a) => a.category === activeCategory);

  const stats = [
    { value: "50+", label: "Awards Received" },
    { value: "10K+", label: "Families Supported" },
    { value: "100+", label: "Projects Completed" },
    { value: "15", label: "Years of Service" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Achievements Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#003d1a]/70 via-[#005c28]/50 to-[#009639]/30" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#00b359]" />
            Our Achievements
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
            Celebrating Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00b359] to-[#00b359]">
              Success Stories
            </span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-2xl mx-auto">
            From humble beginnings to transformative impact - explore the
            milestones, awards, and recognition that define our journey.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[#00b359]/10 blur-3xl z-0" />
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] rounded-full bg-[#009639]/10 blur-3xl z-0" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white shadow-lg relative z-20 -mt-10 mx-4 rounded-3xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#009639] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#009639] text-white shadow-lg shadow-[#009639]/30"
                  : "bg-white text-gray-700 hover:bg-[#009639]/10 hover:text-[#009639]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-4 py-1.5 rounded-full text-white text-sm font-semibold ${achievement.color}`}
                    >
                      {achievement.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#009639] text-sm font-medium mb-3">
                    <Calendar className="w-4 h-4" />
                    {new Date(achievement.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#009639] transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-[#003d1a] via-[#005c28] to-[#009639] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-white/80">
              Key milestones that shaped our organization
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00b359] to-[#00b359]" />
            <div className="space-y-12">
              {[
                {
                  year: "2025",
                  title: "Best Nonprofit Award",
                  desc: "Recognized by East African NGO Council",
                },
                {
                  year: "2024",
                  title: "10,000 Families",
                  desc: "Reached major milestone in family support",
                },
                {
                  year: "2023",
                  title: "Water Initiative",
                  desc: "Launched clean water projects in 3 new districts",
                },
                {
                  year: "2022",
                  title: "Education Expansion",
                  desc: "Expanded to 50+ schools across Ethiopia",
                },
                {
                  year: "2021",
                  title: "Founded",
                  desc: "Started with a vision to transform lives",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#00b359] to-[#007a2e] flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs font-bold">
                      {item.year.slice(2)}
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-white/70">{item.desc}</p>
                    <span className="text-[#00b359] font-bold text-sm">
                      {item.year}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Be Part of Our Next Achievement
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us in making a difference. Every contribution helps us reach
            new milestones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/donate"
              className="inline-flex items-center gap-2 bg-[#009639] text-white font-bold px-8 py-4 rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              Donate Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#009639] font-bold px-8 py-4 rounded-full border-2 border-[#009639] hover:bg-[#009639] hover:text-white transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
