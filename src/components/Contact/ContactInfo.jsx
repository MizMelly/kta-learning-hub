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
    <div className="space-y-6">

      {cards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-3xl border border-gray-200 bg-white p-6"
          >
            <div className="flex gap-5">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF5F1]">
                <Icon size={24} className="text-[#124A66]" />
              </div>

              <div>

                <h3 className="font-serif text-3xl text-[#124A66]">
                  {item.title}
                </h3>

                <p className="mt-2 whitespace-pre-line text-gray-500">
                  {item.subtitle}
                </p>

                {item.value && (
                  <p className="mt-3 text-lg font-semibold text-[#E46F21]">
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