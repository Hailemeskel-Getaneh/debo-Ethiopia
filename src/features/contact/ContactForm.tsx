import { contactService } from "@/api/contactService";
import { ErrorAlert, Input } from "@/components";
import { contactSchema, type ContactFormData } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ContactForm = () => {
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setStatus("loading");
      await contactService.sendMessage(data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      throw error;
    }
  };

  if (status === "success") {
    return (
      <SuccessCard
        email={getValues("email")}
        onClick={() => {
          setStatus("idle");
          reset();
        }}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === "error" && (
        <ErrorAlert
          error={
            "Unable send message!! Please check your network connection and try again."
          }
        />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Abebe"
          {...register("first_name")}
          error={errors.first_name?.message}
        />

        <Input
          label="Last Name"
          placeholder="Bikila"
          {...register("last_name")}
          error={errors.last_name?.message}
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="abebe@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Subject"
        placeholder="How can we help?"
        {...register("subject")}
        error={errors.subject?.message}
      />

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-bold text-zinc-700 mb-2"
        >
          Message
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className={`w-full px-4 py-3 rounded-xl border-2 outline-none bg-white transition-all resize-none ${
            errors.message
              ? "border-red-500 focus:border-red-500"
              : "border-zinc-100 focus:border-brand-main"
          }`}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-[#009639] text-white hover:bg-[#007a2e] hover:shadow-lg hover:shadow-green-900/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-80 disabled:cursor-not-allowed disabled:grayscale-[0.3]`}
      >
        {status === "loading" ? (
          <>
            Sending... <Loader2 className="animate-spin" />
          </>
        ) : (
          <>
            Send Message <Send className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
};

const SuccessCard = ({
  email,
  onClick,
}: {
  email: string;
  onClick: () => void;
}) => {
  return (
    <div className="text-center py-12 animate-in fade-in zoom-in duration-300">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
      </div>
      <h2 className="text-3xl font-black text-zinc-900 mb-4">Message Sent!</h2>
      <p className="text-zinc-500 mb-8">
        Thank you. We'll get back to you at <b>{email}</b> soon.
      </p>
      <button
        onClick={onClick}
        className="px-8 py-3 bg-zinc-100 text-zinc-700 font-bold rounded-xl hover:bg-zinc-200 transition-all"
      >
        Send Another
      </button>
    </div>
  );
};
