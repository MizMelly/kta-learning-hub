import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import DiscoveryCard from "./DiscoveryCard";

const cards = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "Our friendly team is here to help.",
    value: "hello@unleashacademy.com",
    accent: true,
  },
  {
    icon: Phone,
    title: "Phone / WhatsApp",
    subtitle: "Mon–Fri from 9am to 6pm GMT.",
    value: "+44 20 1234 5678",
    accent: true,
  },
  {
    icon: MapPin,
    title: "Office",
    subtitle: "124 Transformation Way\nLondon, UK\nEC1A 1BB",
    value: "",
    accent: false,
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Icon */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-full bg-[#EFF5F1]">
                <Icon
                  size={22}
                  className="text-[#124A66] sm:w-6 sm:h-6"
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-2xl sm:text-3xl text-[#124A66]">
                  {item.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-sm sm:text-base leading-6 sm:leading-7 text-gray-500">
                  {item.subtitle}
                </p>

                {item.value && (
                  <p className="mt-3 wrap-break-word text-base sm:text-lg font-semibold text-[#E46F21]">
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <DiscoveryCard />
    </div>
  );
}