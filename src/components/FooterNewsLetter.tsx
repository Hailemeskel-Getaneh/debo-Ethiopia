import { useState, type SubmitEvent } from "react";
import { Loader2, CheckCircle2, Send } from "lucide-react";
import { subscribersService } from "@/services/subscribers.service";

export const FooterNewsLetter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await subscribersService.subscribe({ email });
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="lg:col-span-3">
      <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
        Newsletter
      </h3>
      <p className="text-sm leading-relaxed opacity-70 mb-5">
        Subscribe for the latest impact stories.
      </p>
      <form onSubmit={handleSubscribe} className="relative">
        <div className="relative">
          <input
            type="email"
            required
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl px-5 py-3.5 pr-14 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-main/30 transition-all"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="absolute right-1.5 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-brand-main text-white flex items-center justify-center active:scale-95 transition-all"
          >
            <StatusIcon status={status} />
          </button>
        </div>
        {status === "success" && (
          <p className="text-xs text-brand-main mt-2.5">
            Successfully subscribed!
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-500 mt-2.5">Error. Try again.</p>
        )}
      </form>
    </div>
  );
};

const StatusIcon = ({
  status,
}: {
  status: "idle" | "loading" | "success" | "error";
}) => {
  const icons = {
    loading: <Loader2 className="w-4 h-4 animate-spin" />,
    success: <CheckCircle2 className="w-4 h-4" />,
    error: <Send className="w-4 h-4" />, // Or a specific error icon
    idle: <Send className="w-4 h-4" />,
  };

  // Return the mapped value or a default
  return icons[status] || icons.idle;
};
