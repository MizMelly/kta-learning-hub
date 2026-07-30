import { MessageSquare } from "lucide-react";

export default function DiscoveryCard() {
  return (
    <div className="rounded-3xl bg-[#cf7335] p-6 sm:p-8 text-center shadow-lg">
      {/* Icon */}
      <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#ce9b34]">
        <MessageSquare
          size={24}
          className="text-[#f9f8f6] sm:w-7 sm:h-7"
        />
      </div>

      {/* Heading */}
      <h3 className="mt-5 sm:mt-6 font-serif text-3xl sm:text-4xl text-white">
        Discovery Call
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-white/80">
        Not sure which path is right for you?
        <br className="hidden sm:block" />
        Book a free 30-minute strategy session.
      </p>

      {/* Button */}
      <button className="mt-6 sm:mt-8 w-full rounded-xl bg-white py-3.5 sm:py-4 text-base font-semibold text-[#a38a24] transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
        Book Session
      </button>
    </div>
  );
}