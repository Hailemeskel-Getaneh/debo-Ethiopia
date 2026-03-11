import Timeline from "./Timeline";

const timelineItems = [
  {
    year: "2015",
    event:
      "Debo Ethiopia founded in Addis Ababa with a focus on local community development.",
    icon: "🏠",
  },
  {
    year: "2017",
    event: "Launched first education pilot program in 5 rural schools.",
    icon: "📚",
  },
  {
    year: "2019",
    event:
      "Expanded to 3 regional offices; served 1,000+ students for the first time.",
    icon: "🌍",
  },
  {
    year: "2021",
    event: "Implemented the 'Debo' agricultural methodology at scale.",
    icon: "🌾",
  },
  {
    year: "2023",
    event: "Reached 5,000+ students across 25+ partner districts nationwide.",
    icon: "🎓",
  },
];

export const TimelineSection = () => (
  // fetch the items from the server here

  <div className="relative">
    <div className="absolute left-8 top-0 bottom-0 w-px bg-[#16A34A]/30" />
    <div className="space-y-6">
      {timelineItems.map((item, i) => (
        <Timeline {...item} index={i} />
      ))}
    </div>
  </div>
);
