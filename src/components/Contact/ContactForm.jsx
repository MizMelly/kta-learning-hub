import { ChevronDown } from "lucide-react";

export default function ContactForm() {
  return (
    <div className="rounded-3xl lg:rounded-[32px] border border-slate-200 bg-white p-5 sm:p-8 lg:p-12 shadow-lg">
      {/* Heading */}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#124A66]">
        Send us a message
      </h2>

      <p className="mt-3 text-base sm:text-lg leading-7 sm:leading-8 text-slate-500">
        We'd love to hear from you. Fill out the form below and our team
        will get back to you as soon as possible.
      </p>

      <form className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
        {/* Name & Email */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-[#124A66] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#E46F21] focus:ring-4 focus:ring-[#E46F21]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#124A66]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3.5 sm:py-4 text-sm sm:text-base text-[#124A66] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#E46F21] focus:ring-4 focus:ring-[#E46F21]/10"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#124A66]">
            Subject
          </label>

          <div className="relative">
            <select className="w-full appearance-none rounded-2xl border border-slate-200 bg-[#F8FAFC] px-4 sm:px-5 py-3.5 sm:py-4 pr-12 text-sm sm:text-base text-[#124A66] outline-none transition-all duration-300 focus:border-[#E46F21] focus:ring-4 focus:ring-[#E46F21]/10">
              <option>How can we help?</option>
              <option>Programs</option>
              <option>Corporate Training</option>
              <option>Coaching</option>
              <option>General Enquiry</option>
              <option>Support</option>
            </select>

            <ChevronDown
              size={20}
              className="pointer-events-none absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 text-[#124A66]"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-[#124A66]">
            Message
          </label>

          <textarea
            rows={7}
            placeholder="Tell us a bit about what you're looking for..."
            className="min-h-45 sm:min-h-55 lg:min-h-65 w-full resize-none rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4 sm:p-5 text-sm sm:text-base text-[#124A66] placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#E46F21] focus:ring-4 focus:ring-[#E46F21]/10"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full sm:w-auto rounded-full bg-[#124A66] px-8 py-3.5 sm:py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#165775] hover:-translate-y-1 hover:shadow-xl"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}