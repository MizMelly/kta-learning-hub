import { useState } from "react";
import {
  PenSquare,
  Mic,
  Upload,
} from "lucide-react";

export default function ReflectionCard() {
  const [tab, setTab] = useState("write");
  const [reflection, setReflection] = useState("");

  const tabs = [
    {
      id: "write",
      label: "Write",
      icon: PenSquare,
    },
    {
      id: "record",
      label: "Record",
      icon: Mic,
    },
    {
      id: "upload",
      label: "Upload",
      icon: Upload,
    },
  ];

  return (
    <section className="mx-auto mt-14 max-w-3xl px-6">

      <div className="rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm">

        {/* Heading */}

        <h2 className="font-serif text-[34px] text-[#124A66]">
          Reflection Exercise
        </h2>

        <p className="mt-3 max-w-2xl text-[18px] leading-8 text-[#6D7E78]">
          Identify one area of your leadership where you are currently
          experiencing resistance. What is the fear underneath the
          procrastination?
        </p>

        {/* Tabs */}

        <div className="mt-7 inline-flex rounded-xl bg-[#F3F5F3] p-1">

          {tabs.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-[15px] font-medium transition ${
                  tab === item.id
                    ? "bg-white text-[#124A66] shadow-sm"
                    : "text-[#6D7E78]"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}

        </div>

        {/* Write */}

        {tab === "write" && (
          <div className="mt-6">

            <textarea
              rows={8}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Capture your thoughts here..."
              className="w-full resize-none rounded-2xl border border-gray-200 p-5 text-[17px] leading-8 outline-none transition focus:border-[#124A66]"
            />

          </div>
        )}

        {/* Record */}

        {tab === "record" && (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-12 text-center">

            <Mic
              size={42}
              className="mx-auto text-[#124A66]"
            />

            <p className="mt-5 text-[#6D7E78]">
              Click below to begin recording.
            </p>

            <button className="mt-6 rounded-xl bg-[#124A66] px-6 py-3 font-medium text-white">
              Start Recording
            </button>

          </div>
        )}

        {/* Upload */}

        {tab === "upload" && (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-300 p-12 text-center">

            <Upload
              size={42}
              className="mx-auto text-[#124A66]"
            />

            <p className="mt-5 text-[#6D7E78]">
              Upload your reflection document.
            </p>

            <button className="mt-6 rounded-xl bg-[#124A66] px-6 py-3 font-medium text-white">
              Choose File
            </button>

          </div>
        )}

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">

          <p className="text-sm text-[#6D7E78]">
            {reflection.trim().split(/\s+/).filter(Boolean).length} / 1000 words
          </p>

          <button className="rounded-xl bg-[#124A66] px-8 py-3 font-semibold text-white transition hover:bg-[#103F56]">
            Submit Reflection
          </button>

        </div>

      </div>

    </section>
  );
}