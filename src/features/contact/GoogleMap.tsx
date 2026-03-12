const GoogleMap = () => {
  return (
    <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-[300px] relative">
      <iframe
        title="DeboEthiopia Location Map"
        src="https://maps.google.com/maps?q=Mehal%20Meda,%20Ethiopia&t=&z=13&ie=UTF8&iwloc=&output=embed"
        className="absolute inset-0 w-full h-full rounded-2xl border-0"
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMap;
