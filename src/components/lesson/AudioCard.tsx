import { Play, AudioLines } from "lucide-react";

export default function AudioCard() {
  return (
    <section className="mt-8 flex justify-center">
      <div className="flex w-full max-w-3xl items-center justify-between rounded-3xl border border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:shadow-md">

        {/* Left */}

        <div className="flex items-center gap-5">

          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF5F2] transition hover:bg-[#124A66] hover:text-white">
            <Play
              size={22}
              fill="currentColor"
              className="ml-1 text-[#124A66]"
            />
          </button>

          <div>
            <h3 className="text-xl font-semibold text-[#124A66]">
              Listen to Audio Version
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              14:20 mins
            </p>
          </div>

        </div>

        {/* Right */}

        <div className="hidden sm:flex">
          <AudioLines
            size={34}
            className="text-[#124A66]"
          />
        </div>

      </div>
    </section>
  );
}