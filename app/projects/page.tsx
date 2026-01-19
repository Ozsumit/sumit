"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CornerRightDown, Check, Loader2 } from "lucide-react";

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

// --- MICRO-COMPONENTS ---

const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[#F2F2F2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
);

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <Link href={`/projects/${project.id}`} className="block w-full group">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`relative w-full rounded-[2.5rem] p-8 md:p-12 transition-all duration-500 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/5 ${project.theme || "bg-white border border-black/5"}`}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-between items-start md:items-stretch">
          {/* Left: Meta */}
          <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:items-start border-b md:border-b-0 md:border-r border-black/5 pb-6 md:pb-0 md:pr-6">
            <div className="text-sm font-mono text-neutral-400 font-bold">
              ({String(index + 1).padStart(2, "0")})
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                {project.category}
              </span>
              <span className="text-lg font-bold text-neutral-900">
                {project.year}
              </span>
            </div>
          </div>

          {/* Middle: Content */}
          <div className="flex-1 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-none text-neutral-900">
                {project.title}
              </h3>
              <p className="text-lg font-medium max-w-2xl leading-relaxed text-neutral-500">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-xs font-bold border border-black/5 bg-white text-neutral-600 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Action */}
          <div className="flex items-end justify-end md:w-auto w-full">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center bg-black text-white group-hover:bg-[#FF3B30] transition-colors duration-300">
              <ArrowUpRight
                size={32}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

// --- MAIN PAGE COMPONENT ---

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // DYNAMIC CATEGORIES
  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((p) => p.category))];
  }, [projects]);

  // FILTER LOGIC
  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "All" || project.category === selectedCategory,
  );

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
            <span className="font-bold text-sm">Link Copied</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8 pt-32">
        {/* Section Header */}
        <section id="work" className="mb-24">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 px-2">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-[#1a1a1a]">
                SELECTED WORKS
              </h2>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2 mt-8">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      selectedCategory === cat
                        ? "bg-black text-white"
                        : "bg-white/50 hover:bg-white text-neutral-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:flex gap-4 text-sm font-bold font-mono text-neutral-400 mt-8 md:mt-0">
              <CornerRightDown size={18} />
              <span>
                ARCHIVE ({projects[projects.length - 1]?.year || "—"} —{" "}
                {projects[0]?.year || "—"})
              </span>
            </div>
          </div>

          {/* Project Grid / List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-neutral-300" size={48} />
              <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest">
                LOADING ARCHIVE
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
