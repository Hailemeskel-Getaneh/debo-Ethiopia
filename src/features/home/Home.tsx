import { DonationBanner, Footer, NavBar, StatsFloating } from "@/components";
import { useTheme } from "@/context/ThemeContext";
import { useEvents } from "@/hooks/useEvents";
import { useNews } from "@/hooks/useNews";
import { useStats } from "@/hooks/useStats";
import {
  Hero,
  LatestNews,
  MissionSection,
  UpcomingEvents,
} from "./_components";
import { fallbackStats, heroSlides } from "./data";

export default function HomePage() {
  const { theme, themeColors } = useTheme();
  const { stats } = useStats();
  const { upcoming: events, loading: eventsLoading } = useEvents();
  const { news } = useNews();

  return (
    <div
      className={`min-h-screen ${themeColors[theme]} dark:bg-zinc-950 font-sans selection:bg-brand-main/20 selection:text-brand-main`}
    >
      <NavBar />
      <main>
        <Hero slides={heroSlides} />
        <StatsFloating stats={stats?.length ? stats : fallbackStats} />
        <MissionSection />
        <UpcomingEvents events={events} isLoading={eventsLoading} />
        <DonationBanner />
        <LatestNews news={news} />
      </main>
      <Footer />
    </div>
  );
}
