import { MessageSquare } from "lucide-react";

export default function DiscoveryCard() {
  return (
    <div className="rounded-3xl bg-[#cf7335] p-8 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ce9b34]">

        <MessageSquare
          size={28}
          className="text-[#f9f8f6]"
        />

      </div>

      <h3 className="mt-6 font-serif text-4xl text-white">
        Discovery Call
      </h3>

      <p className="mt-4 leading-8 text-white/80">
        Not sure which path is right for you?
        Book a free 30-minute strategy session.
      </p>

      <button className="mt-8 w-full rounded-xl bg-white py-4 font-semibold text-[#a38a24] transition hover:bg-gray-100">
        Book Session
      </button>

    </div>
  );
}