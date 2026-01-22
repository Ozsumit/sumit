"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight, Minus } from "lucide-react";

// --- MOCK DATA (Replace with your featured projects) ---

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "VANGUARD FINANCE",
    category: "Fintech",
    description:
      "A high-performance trading dashboard reimagining financial data visualization with WebGL and real-time sockets.",
    year: "2024",
    tags: ["React", "WebGL", "Socket.io"],
    color: "bg-gradient-to-br from-neutral-800 to-black text-white", // Fallback for image
    accent: "#3B82F6",
  },
  {
    id: 2,
    title: "NEBULA OS",
    category: "System Design",
    description:
      "An experimental web-based operating system exploring spatial computing interfaces in the browser.",
    year: "2023",
    tags: ["Three.js", "Typescript", "Zustand"],
    color: "bg-gradient-to-br from-[#FF3B30] to-[#990000] text-white",
    accent: "#FF3B30",
  },
  {
    id: 3,
    title: "MONOLITH",
    category: "Architecture",
    description:
      "Digital brutalist portfolio for an architecture firm, focusing on large typography and micro-interactions.",
    year: "2023",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    color:
      "bg-gradient-to-br from-[#e5e5e5] to-[#d4d4d4] text-black border border-black/10",
    accent: "#111",
  },
];

// --- MICRO-COMPONENTS ---

const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[#F2F2F2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
);

// --- HERO COMPONENT ---

export default function HeroProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const activeProject = FEATURED_PROJECTS[currentIndex];

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % FEATURED_PROJECTS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? FEATURED_PROJECTS.length - 1 : prev - 1,
    );
  };

  // Animation Variants
  const textVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };

  const imageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95,
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-[#F2F2F2] text-[#111] pt-24 pb-12">
      <DotPattern />

      <div className="max-w-[1600px] w-full mx-auto px-4 md:px-8 h-full flex flex-col justify-center">
        {/* TOP ROW: Header & Navigation */}
        <div className="flex justify-between items-end mb-12 border-b border-black/5 pb-6">
          <div className="space-y-1">
            <h1 className="text-sm font-bold tracking-widest uppercase text-neutral-400">
              Featured Works
            </h1>
            <p className="text-xs font-mono text-neutral-300">
              INDEX: {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(FEATURED_PROJECTS.length).padStart(2, "0")}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Previous Project"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-black/10 bg-black text-white flex items-center justify-center hover:bg-[#FF3B30] hover:border-[#FF3B30] transition-colors"
              aria-label="Next Project"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* LEFT: Project Details */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ staggerChildren: 0.1 }}
                className="space-y-8"
              >
                {/* Meta Tags */}
                <motion.div
                  variants={textVariants}
                  className="flex flex-wrap gap-3 items-center"
                >
                  <span className="px-3 py-1 bg-white border border-black/5 rounded text-xs font-bold uppercase tracking-wider text-neutral-500">
                    {activeProject.category}
                  </span>
                  <Minus size={12} className="text-neutral-300" />
                  <span className="font-mono text-xs font-bold text-neutral-400">
                    {activeProject.year}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  variants={textVariants}
                  className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-[#1a1a1a]"
                >
                  {activeProject.title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  variants={textVariants}
                  className="text-lg md:text-xl font-medium text-neutral-500 max-w-md leading-relaxed"
                >
                  {activeProject.description}
                </motion.p>

                {/* Tags & Action */}
                <motion.div
                  variants={textVariants}
                  className="pt-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center"
                >
                  <Link
                    href={`/projects/${activeProject.id}`}
                    className="group inline-flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-[#FF3B30] transition-colors duration-300"
                  >
                    View Case Study
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </Link>

                  <div className="flex gap-2 text-xs font-mono font-bold text-neutral-400">
                    {activeProject.tags.map((tag, i) => (
                      <span key={tag}>
                        {tag}
                        {i < activeProject.tags.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Project Visual/Image */}
          <div className="lg:col-span-7 order-1 lg:order-2 h-[400px] md:h-[600px] w-full relative">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeProject.id}
                custom={direction}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <div
                  className={`w-full h-full rounded-[2.5rem] shadow-2xl shadow-black/10 overflow-hidden relative flex items-center justify-center group cursor-pointer ${activeProject.color}`}
                >
                  {/* NOTE: Replace this gradient block with <Image /> tag for real photos */}
                  {/* <Image src={activeProject.image} fill className="object-cover" /> */}

                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                  {/* Decorative internal element */}
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl max-w-xs text-center transform group-hover:scale-105 transition-transform duration-500">
                    <span className="font-mono text-sm font-bold opacity-80 uppercase tracking-widest">
                      Preview
                    </span>
                    <div className="mt-2 text-2xl font-black tracking-tighter">
                      {activeProject.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Progress Bar (Bottom) */}
        <div className="hidden lg:block absolute bottom-12 left-8 right-8 max-w-[1600px] mx-auto">
          <div className="w-full h-[1px] bg-neutral-200 relative">
            <motion.div
              animate={{
                width: `${((currentIndex + 1) / FEATURED_PROJECTS.length) * 100}%`,
              }}
              className="absolute top-0 left-0 h-full bg-black transition-all duration-500 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
