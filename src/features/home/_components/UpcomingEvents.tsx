import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const UpcomingEvents = ({
  events,
  isLoading,
}: {
  events: any[];
  isLoading: boolean;
}) => {
  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-brand-main/10 rounded-xl">
                <Calendar className="w-5 h-5 text-brand-main" />
              </div>
              <span className="text-brand-action font-black uppercase tracking-widest text-xs">
                Mark Your Calendar
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
              Upcoming Community <span className="text-brand-main">Events</span>
            </h2>
          </div>
          <Link to="/events">
            <Button
              variant="outline"
              className="px-6 py-3 rounded-xl border-zinc-200 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 gap-2"
            >
              Explore All Events
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-80 rounded-3xl bg-zinc-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events?.slice(0, 3).map((event, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group bg-zinc-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 transition-all"
              >
                <div className="aspect-video relative overflow-hidden bg-zinc-200">
                  {event.images?.[0]?.image && (
                    <img
                      src={event.images[0].image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={event.title}
                    />
                  )}
                  <div className="absolute top-4 right-4 glass-panel p-2 rounded-2xl text-center min-w-15">
                    <span className="text-xs font-black text-brand-main block uppercase">
                      {new Date(event.start_date).toLocaleString("en", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-xl font-black">
                      {new Date(event.start_date).getDate()}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4 line-clamp-1">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-zinc-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-main" />{" "}
                      {new Date(event.start_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brand-main" />{" "}
                      {event.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
