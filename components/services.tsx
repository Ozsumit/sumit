"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Frontend Architecture",
    description:
      "Scalable React applications using Next.js and Micro-frontends. Focusing on performance and clean code.",
  },
  {
    id: "02",
    title: "Design Systems",
    description:
      "Bridging the gap between Figma and Code. Automated token pipelines and component libraries.",
  },
  {
    id: "03",
    title: "Creative Development",
    description:
      "WebGL, Canvas, and complex interactions. Adding the 'magic' layer to standard web interfaces.",
  },
  {
    id: "04",
    title: "UI/UX Design",
    description:
      "Clean user interfaces with a focus on typography, grid systems, and functional clarity.",
  },
];

export default function Capabilities() {
  return (
    <section className="py-24 px-4 md:px-8  mx-auto">
      {/* Header */}
      <div className=" pl-16 mb-16">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF3B30] uppercase mb-4 block">
          What I do
        </span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a] uppercase">
          Capabilities
        </h2>
      </div>

      {/* Services List */}
      <div className="border-t border-black/5">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group relative border-b rounded-2xl border-black/5 py-12 md:py-16 hover:bg-white/50 transition-colors duration-500"
          >
            <div className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center gap-8 px-4">
              {/* Number */}
              <div className="md:col-span-1">
                <span className="font-mono text-[10px] font-bold text-neutral-400 group-hover:text-[#FF3B30] transition-colors">
                  {service.id}
                </span>
              </div>

              {/* Title */}
              <div className="md:col-span-5">
                <h3 className="text-3xl md:text-4xl font-black tracking-tight text-neutral-900 uppercase">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-5">
                <p className="text-neutral-500 text-lg leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                  <ArrowDownRight size={20} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
