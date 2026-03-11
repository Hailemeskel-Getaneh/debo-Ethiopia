import StoryCard from "./StoryCard";
import { TimelineSection } from "./TimelineSection";

const CoreStorySection = () => {
  return (
    <section className="py-32 bg-zinc-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <StoryCard />
          <TimelineSection />
        </div>
      </div>
    </section>
  );
};

export default CoreStorySection;
