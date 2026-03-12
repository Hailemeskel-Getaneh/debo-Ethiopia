interface Props {
  title: string;
  description: string;
}

const ContactHero = () => {
  return (
    <section
      className="relative pt-32 pb-20 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#16A34A]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
          Get in Touch with <span className="text-[#16A34A]">Us</span>
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Have a question, want to volunteer, or interested in partnering with
          DeboEthiopia? We'd love to hear from you. Drop us a message below!
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
