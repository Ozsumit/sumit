"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Copy,
  Check,
  MapPin,
  Layers,
  Code2,
  Cpu,
  Smartphone,
  Zap,
} from "lucide-react";

// Components
import ExperienceSection from "@/components/experience";
import About from "@/components/about";
import ContactCTA from "@/components/cta";
import Services from "@/components/services";
import ProjectSection from "@/app/projects/page";

// --- TYPES ---
interface Project {
  id: number | string;
  title: string;
  description: string;
  category: string;
  year: string;
  tags: string[];
  theme: string;
}

// --- CONTENT ---
const CONTENT = {
  profile: {
    name: "Alex Chen",
    initials: "AC.",
    role: "Designer & Developer",
    headline: "Developing\nMinimialism with Purpose.",
    subheadline: "Specialized in modern interfaces and fluid design systems.",
    availability: { status: true, text: "Available for projects" },
    location: "New-Baneshwor, Kathmandu",
    timeZone: "gmt+5:45",
    email: "devloper@sumit.info.np",
  },
  stack: [
    { name: "Next.js", slug: "nextdotjs" },
    { name: "Prisma", slug: "prisma" },
    { name: "Tailwind", slug: "tailwindcss" },
    { name: "TypeScript", slug: "typescript" },
    { name: "JavaScript", slug: "javascript" },
    { name: "Figma", slug: "figma" },
    { name: "Vercel", slug: "vercel" },
    { name: "Github", slug: "github" },
  ],
};

// --- HELPERS ---
const getIcon = (name: string) => {
  const icons: any = { Smartphone, Code2, Cpu, Zap, Layers };
  const Icon = icons[name] || Layers;
  return <Icon size={18} />;
};

// --- MICRO-COMPONENTS ---
const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[#F2F2F2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
);

const TechLogo = ({ slug, name }: { slug: string; name: string }) => (
  <div className="relative flex items-center justify-center w-full h-full group">
    <img
      src={`https://cdn.simpleicons.org/${slug}/000000`}
      alt={name}
      className="w-8 h-8 md:w-10 md:h-10 opacity-80 group-hover:opacity-0 transition-all duration-300 group-hover:scale-110"
    />
    <span className="absolute inset-0 flex items-center justify-center text-[1rem] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all duration-300 text-white">
      {name}
    </span>
  </div>
);

// --- INTERACTIVE COMPONENTS ---

const SwissEye = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.getElementById("swiss-eye");
      if (!eyes) return;
      const { left, top, width, height } = eyes.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setRotate(angle * (180 / Math.PI));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      id="swiss-eye"
      className="w-full h-full bg-[#1a1a1a] rounded-[2rem] flex items-center justify-center relative overflow-hidden group border border-white/10 shadow-lg"
    >
      <motion.div
        className="w-24 h-24 lg:w-32 lg:h-32 bg-[#F5F5F0] rounded-full flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        <div
          className="w-10 h-10 lg:w-12 lg:h-12 bg-[#FF3B30] rounded-full absolute"
          style={{
            transform: `rotate(${rotate}deg) translate(25px)`,
            transition: "transform 0.05s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full opacity-60" />
        </div>
      </motion.div>
    </div>
  );
};

const SwissMouth = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Map mouse Y to the "openness" of the mouth (distance between lips)
  const gap = useTransform(springY, [-150, 150], [60, 5]);

  // Map mouse X to the tongue position
  const tongueX = useTransform(springX, [-150, 150], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(150); // Close mouth on leave
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full bg-[#1a1a1a] rounded-[2rem] relative overflow-hidden flex flex-col items-center justify-center cursor-crosshair group"
    >
      {/* Background Grid Pattern for texture */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* The Mouth Assembly */}
      <div className="relative z-10 flex flex-col items-center justify-center h-32 w-48">
        {/* Top Lip */}
        <motion.div
          className="w-32 h-8 bg-[#F5F5F0] rounded-full z-20 shadow-lg"
          style={{ marginBottom: gap }}
        />

        {/* Tongue (Visible only when gap opens) */}
        <motion.div
          className="absolute w-16 h-16 bg-[#FF3B30] rounded-full z-10"
          style={{
            x: tongueX,
            scale: useTransform(gap, [5, 60], [0.5, 1.2]),
          }}
        />

        {/* Bottom Lip */}
        <motion.div
          className="w-32 h-8 bg-[#F5F5F0] rounded-full z-20 shadow-lg"
          style={{ marginTop: gap }}
        />
      </div>

      {/* Text hint */}
      <div className="absolute bottom-6 opacity-0 group-hover:opacity-40 transition-opacity text-white font-mono text-xs uppercase tracking-widest">
        Say Hello
      </div>
    </div>
  );
};

const RadarWidget = () => (
  <div className="w-full h-full bg-[#ffffff] rounded-[2rem]  border border-black/5 relative overflow-hidden flex flex-col justify-between p-6 group">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-20 group-hover:opacity-30 transition-opacity">
      <div className="absolute inset-0 border border-black/20 rounded-full animate-[ping_3s_linear_infinite]" />
      <div className="absolute inset-0 border border-black/20 rounded-full animate-[ping_3s_linear_infinite_1s]" />
    </div>
    <div className="relative z-10 flex justify-between items-start">
      <div className="bg-white/50 backdrop-blur-md p-2 rounded-full">
        <MapPin size={20} />
      </div>
      <span className="font-mono text-xs font-bold bg-black/10 px-2 py-1 rounded-md">
        {CONTENT.profile.timeZone}
      </span>
    </div>
    <div className="relative z-10">
      <h3 className="text-2xl font-bold tracking-tight">
        {CONTENT.profile.location}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-2 h-2 bg-[#FF3B30] rounded-full animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest opacity-60">
          Remote Available
        </span>
      </div>
    </div>
  </div>
);

const StackGrid = () => (
  <div className="w-full h-full bg-white rounded-[2rem] p-6 lg:p-8 flex flex-col border border-black/5">
    <div className="flex items-center gap-2 mb-6 opacity-40">
      <Layers size={16} />
      <span className="text-xs font-bold uppercase tracking-widest">
        Toolkit
      </span>
    </div>
    <div className="grid grid-cols-4 gap-2 h-full">
      {CONTENT.stack.map((t, i) => (
        <div
          key={i}
          className="aspect-square bg-[#F5F5F0] rounded-2xl flex flex-col items-center justify-center hover:bg-black transition-all duration-300 cursor-default group overflow-hidden"
        >
          <TechLogo slug={t.slug} name={t.name} />
        </div>
      ))}
    </div>
  </div>
);

// --- INTERACTIVE LOGOS ---
const InteractiveLogos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      });
    };
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    return () => container?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const logos = [
    { src: "/logos.svg", alt: "Logo 1" },
    { src: "/vass-logo.svg", alt: "Logo 2" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-[#fff] rounded-[2rem] p-6 flex items-center border border-black/5 justify-around overflow-hidden relative cursor-pointer group"
    >
      {logos.map((logo, index) => {
        const factor = index === 0 ? 1 : -1;
        return (
          <motion.img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="w-24 h-24 md:w-32 md:h-32 rounded-lg shadow-lg"
            style={{
              x: mousePos.x * 0.05 * factor,
              y: mousePos.y * 0.05 * factor,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          />
        );
      })}
    </div>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // FETCH PROJECTS
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTENT.profile.email);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#111] font-sans selection:bg-[#FF3B30] selection:text-white pb-24">
      <DotPattern />

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl"
          >
            <Check size={14} className="text-green-400" />
            <span className="font-bold text-sm">Email Copied</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-screen mx-auto px-4 md:px-8 pt-32">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          {/* MAIN INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between group border border-transparent hover:border-black/5 transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 ${
                    CONTENT.profile.availability.status
                      ? "bg-[#FF3B30]"
                      : "bg-gray-400"
                  } rounded-full animate-pulse`}
                />
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {CONTENT.profile.availability.text}
                </span>
              </div>
              <ArrowUpRight
                size={32}
                className="text-[#FF3B30] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.04] whitespace-pre-line">
                {CONTENT.profile.headline}
              </h1>
              <p className="text-lg md:text-xl font-medium text-neutral-500 max-w-lg leading-relaxed pt-4">
                {CONTENT.profile.subheadline}
              </p>
            </div>
          </motion.div>

          {/* RADAR */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[220px]"
          >
            <RadarWidget />
          </motion.div>

          {/* EYE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 min-h-[220px]"
          >
            <SwissEye />
          </motion.div>

          {/* MOUTH (Replaced Services) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
          >
            <SwissMouth />
          </motion.div>

          {/* STACK GRID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2"
          >
            <StackGrid />
          </motion.div>

          {/* INTERACTIVE LOGOS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-2 row-span-1"
          >
            <InteractiveLogos />
          </motion.div>

          {/* CONTACT ACTION */}
          <motion.button
            onClick={copyEmail}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-1 md:col-span-2 bg-[#F5F5F0] border-2 border-[#1a1a1a] rounded-[2rem] p-6 flex items-center justify-center gap-3 hover:bg-[#1a1a1a] hover:text-white transition-colors group"
          >
            <Copy size={24} />
            <span className="font-bold text-lg tracking-tight">Copy Email</span>
          </motion.button>
        </div>

        {/* OTHER SECTIONS */}

        <ProjectSection />

        <ExperienceSection />
        <Services />
        <ContactCTA />
        <About />
      </main>
    </div>
  );
}
