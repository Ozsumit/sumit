import React from "react";
import { CornerRightDown, ArrowRight } from "lucide-react";

const experiences = [
  {
    company: "Yeti Int'l College",
    role: " IT Developer",
    period: "2026 — Pres.",
    location: "KATHMANDU",
    active: true,
  },
  {
    company: "Leading Edge Softwares",
    role: "Intern",
    period: "2024 JUN — 2024 AUG",
    location: "BIRTAMODE",
    active: true, // Demonstrated faded look
  },
  {
    company: "Buddhashanti Gaunpalika",
    role: "Data Entry Specialist",
    period: "2023 JUN — 2023 SEP",
    location: "JHAPA",
    active: true,
  },
  {
    company: "Shree Aadarsha Secondary School",
    role: "Hardware Technician",
    period: "2024 JAN — 2024 DEC",
    location: "JAYAPUR",
    active: true,
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mb-24 mt-32 px-2 max-w-[1400px] mx-auto"
    >
      {/* Section Header - Matches "Recent Work" design language */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-black/5 pb-8">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a]">
            EXPERIENCE
          </h2>
          <p className="mt-6 text-lg text-neutral-500 font-medium leading-relaxed">
            A history of shipping high-quality products. I thrive in
            environments that value engineering excellence and design fidelity.
          </p>
        </div>
        <div className="hidden md:flex gap-4 text-sm font-bold font-mono text-neutral-400 mt-4 md:mt-0">
          <CornerRightDown size={18} />
          <span className="uppercase tracking-widest">Career Path</span>
        </div>
      </div>

      {/* Experience List - Clean, Row-based layout */}
      <div className="flex flex-col">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className={`group relative grid grid-cols-1 md:grid-cols-12 py-10 border-b border-black/10 transition-all duration-500 ${
              exp.active ? "opacity-100" : "opacity-30 hover:opacity-100"
            }`}
          >
            {/* Period - Monospaced like the "View All" link */}
            <div className="md:col-span-2 mb-2 md:mb-0">
              <span className="font-mono text-sm font-bold text-neutral-400 group-hover:text-black transition-colors">
                {exp.period}
              </span>
            </div>

            {/* Role & Company */}
            <div className="md:col-span-7 space-y-1">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a1a]">
                {exp.company}
              </h3>
              <p className="text-neutral-500 font-medium text-lg uppercase tracking-wide text-[13px]">
                {exp.role}
              </p>
            </div>

            {/* Location & Arrow */}
            <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0">
              <span className="text-[11px] font-black tracking-[0.2em] text-neutral-300 uppercase">
                {exp.location}
              </span>
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                <ArrowRight size={20} className="text-black" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
