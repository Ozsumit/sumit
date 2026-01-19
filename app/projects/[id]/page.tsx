"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  Users,
  Target,
  Loader2,
  Github,
  Globe,
  Maximize2,
} from "lucide-react";
import Header from "@/components/header";

// --- TYPES ---

interface ProjectLink {
  label: string;
  url: string;
  type?: "github" | "live" | "external";
}

interface ProjectResult {
  label: string;
  value: string;
}

interface Project {
  id: string | number;
  title: string;
  description: string;
  category: string;
  year: string;
  client: string;
  role: string;
  timeline: string;
  team: string;
  overview: string;
  challenge: string;
  solution: string;
  results: ProjectResult[];
  tags: string[];
  image: string | string[]; // Can be a single string or an array
  links: ProjectLink[];
}

// --- MICRO-COMPONENTS ---

const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[#F5F5F2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
);

const getLinkIcon = (type?: string) => {
  switch (type) {
    case "github":
      return <Github size={16} />;
    case "live":
      return <Globe size={16} />;
    default:
      return <ExternalLink size={16} />;
  }
};

// --- MAIN PAGE COMPONENT ---

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // FETCH DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/projects.json");
        const data: Project[] = await response.json();
        setAllProjects(data);

        const found = data.find((p) => String(p.id) === id);
        if (found) setProject(found);
      } catch (err) {
        console.error("Failed to load project details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // NAVIGATION LOGIC
  const currentIndex = allProjects.findIndex((p) => String(p.id) === id);
  const prevProject =
    allProjects[currentIndex - 1] || allProjects[allProjects.length - 1];
  const nextProject = allProjects[currentIndex + 1] || allProjects[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-neutral-300" size={48} />
        <span className="font-mono text-xs font-bold text-neutral-400 tracking-widest uppercase">
          Fetching Details
        </span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F5F2] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project not found</h1>
          <Link href="/projects" className="text-[#FF3B30] font-bold">
            ← Back to projects
          </Link>
        </div>
      </div>
    );
  }

  // --- DATA NORMALIZATION ---
  // 1. Ensure images is always an array to prevent .map errors
  const projectImages = Array.isArray(project.image)
    ? project.image
    : project.image
      ? [project.image]
      : [];

  // 2. Extract the Live Link for the iframe
  const liveUrl = project.links?.find((l) => l.type === "live")?.url;

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#111] font-sans selection:bg-[#FF3B30] selection:text-white">
      <Header />
      <DotPattern />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-32 pb-24">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-bold font-mono text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO PROJECTS</span>
          </Link>
        </motion.div>

        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 max-w-5xl"
        >
          <div className="mb-8">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
              {project.category} · {project.year}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-neutral-900">
              {project.title}
            </h1>
          </div>
          <p className="text-lg md:text-xl font-medium text-neutral-600 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* --- SECTION 1: LIVE SITE PREVIEW (IFRAME) --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-32"
        >
          <div className="group relative rounded-[2rem] overflow-hidden border border-black/10 bg-white shadow-2xl">
            {/* Browser Window Header UI */}
            <div className="bg-neutral-100 h-10 flex items-center px-6 gap-4 border-b border-black/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 bg-white rounded-md h-6 flex items-center px-3 max-w-md mx-auto">
                <div className="text-[10px] text-neutral-400 font-mono truncate">
                  {liveUrl || "https://preview.work"}
                </div>
              </div>
            </div>

            {/* Iframe Content */}
            <div className="relative w-full aspect-video md:h-[600px] bg-neutral-50 overflow-hidden">
              {liveUrl ? (
                <iframe
                  src={liveUrl}
                  title={`Live preview of ${project.title}`}
                  className="w-full h-full border-none"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400">
                  <Globe
                    size={48}
                    strokeWidth={1}
                    className="mb-4 opacity-20"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-widest">
                    Live Site Unavailable
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            {liveUrl ? "Interactive Live Preview" : "Static Overview Mode"}
          </p>
        </motion.div>

        {/* --- SECTION 2: PROJECT DETAILS & CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-32">
          {/* Left Side: Project Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white rounded-[2rem] p-8 border border-black/5">
              <div className="space-y-6">
                {[
                  { label: "Client", value: project.client, icon: Target },
                  { label: "Role", value: project.role, icon: Users },
                  {
                    label: "Timeline",
                    value: project.timeline,
                    icon: Calendar,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex gap-3">
                    <Icon
                      size={18}
                      className="text-neutral-300 flex-shrink-0 mt-1"
                    />
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">
                        {label}
                      </p>
                      <p className="font-bold text-neutral-900 text-sm leading-tight">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Results */}
            <div className="space-y-4">
              {project.results?.map((result, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[1.5rem] p-6 border border-black/5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">
                    {result.label}
                  </p>
                  <p className="text-3xl font-black text-neutral-900 tracking-tighter">
                    {result.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Long Form Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-16"
          >
            <section>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 uppercase">
                Overview
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed whitespace-pre-line">
                {project.overview}
              </p>
            </section>

            <section className="pt-12 border-t border-black/5">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 uppercase">
                The Challenge
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed whitespace-pre-line">
                {project.challenge}
              </p>
            </section>

            <section className="pt-12 border-t border-black/5">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-6 uppercase">
                The Solution
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed whitespace-pre-line">
                {project.solution}
              </p>
            </section>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 pt-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white border border-black/5 rounded-full px-5 py-2 text-xs font-bold text-neutral-700 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            {project.links && project.links.length > 0 && (
              <div className="pt-12 flex flex-col md:flex-row gap-4">
                {project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 rounded-[1.5rem] px-8 py-5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
                      link.type === "live"
                        ? "bg-black text-white hover:bg-neutral-800"
                        : "bg-white border border-black/5 hover:border-black/20"
                    }`}
                  >
                    {link.label} {getLinkIcon(link.type)}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* --- SECTION 3: IMAGE GALLERY --- */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              Gallery
            </h2>
            <div className="h-px flex-1 bg-black/5 mx-8" />
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
              {projectImages.length} Captures
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectImages.map((imgUrl, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative rounded-[2rem] overflow-hidden bg-neutral-200 border border-black/5 ${
                  index === 0 ? "md:col-span-2" : "" // First image spans full width
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <Maximize2 className="text-white" size={32} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Project Pagination Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-24 border-t border-black/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href={`/projects/${prevProject?.id}`}
              className="group relative rounded-[1.5rem] border border-black/5 p-8 hover:bg-white transition-all"
            >
              <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-[#FF3B30] mb-4">
                ← PREVIOUS
              </span>
              <span className="block text-xl font-black text-neutral-900 tracking-tight">
                {prevProject?.title}
              </span>
            </Link>

            <Link
              href="/projects"
              className="flex items-center justify-center rounded-[1.5rem] border border-black/5 p-8 text-[10px] font-bold uppercase tracking-widest text-neutral-600 hover:bg-neutral-900 hover:text-white transition-all"
            >
              Archive
            </Link>

            <Link
              href={`/projects/${nextProject?.id}`}
              className="group relative rounded-[1.5rem] border border-black/5 p-8 text-right hover:bg-white transition-all"
            >
              <span className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 group-hover:text-[#FF3B30] mb-4">
                NEXT →
              </span>
              <span className="block text-xl font-black text-neutral-900 tracking-tight">
                {nextProject?.title}
              </span>
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
