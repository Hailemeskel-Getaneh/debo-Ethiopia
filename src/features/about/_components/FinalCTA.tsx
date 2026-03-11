import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-32 bg-brand-main relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-tr from-primary-900 to-transparent" />
      <div className="container relative z-10 mx-auto px-6 text-center">
        <Heart className="w-20 h-20 text-brand-action mx-auto mb-10 animate-pulse fill-current" />
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter">
          Become Part of the Story
        </h2>
        <p className="text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
          Your support empowers thousands of families. Join our mission to build
          a more resilient Ethiopia today.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Link
            to="/donate"
            className="btn-action px-12 py-6 rounded-2xl text-2xl font-black"
          >
            Support Now
          </Link>
          <Link
            to="/contact"
            className="px-12 py-6 rounded-2xl border-2 border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
