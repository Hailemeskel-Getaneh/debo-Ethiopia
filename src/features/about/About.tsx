import { Footer, NavBar, StatsFloating } from "@/components";
import {
  AboutHero,
  CoreStorySection,
  FinalCTA,
  MissionVisionSection,
  ValueGrid,
} from "./_components";

const fallbackStats = [
  { label: "Students Served", value: "5000+" },
  { label: "Active Programs", value: "50+" },
  { label: "Project Sites", value: "12+" },
  { label: "Community Partners", value: "100+" },
];

export function About() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      <NavBar />
      <main>
        <AboutHero />
        <StatsFloating stats={fallbackStats} />
        <CoreStorySection />
        <MissionVisionSection />
        <ValueGrid />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
