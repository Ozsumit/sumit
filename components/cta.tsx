"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[3rem] bg-white border border-black/5 p-12 md:p-24 text-center">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#F5F5F2] rounded-full blur-3xl opacity-50" />

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 mb-12 bg-white relative z-10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Available for new projects
            </span>
          </div>

          {/* Main Content */}
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase text-neutral-900 mb-12 relative z-10 leading-[0.9]">
            Let&apos;s build <br />
            <span className="text-[#FF3B30]">Something</span> Great
          </h2>

          <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            I’m currently looking for new opportunities to collaborate on
            innovative digital products. If you have a project in mind, let’s
            talk.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="mailto:mail@sumit.info.np"
              className="px-12 py-6 bg-black text-white rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-neutral-800 transition-colors shadow-2xl shadow-black/10"
            >
              Start a Conversation
              <ArrowRight size={16} />
            </motion.a>

            <a
              href="/projects"
              className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-black transition-colors"
            >
              View Full Archive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
