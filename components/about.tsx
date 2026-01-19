import React from "react";
import { CornerRightDown } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="mb-24 mt-32 px-2 max-w-[1400px] mx-auto">
      {/* Section Header - Consistent with Experience/Work */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b border-black/5 pb-8">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#1a1a1a]">
            ABOUT
          </h2>
        </div>
        <div className="flex gap-4 text-sm font-bold font-mono text-neutral-400 mt-4 md:mt-0">
          <CornerRightDown size={18} />
          <span className="uppercase tracking-widest">Profile / 01</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
        {/* Left Column: Visual - Using the sharp card design language */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[4/5]  rounded-4xl overflow-hidden transition-colors duration-500 group-hover:border-black/30">
            <img
              src="/sumit.jpg"
              alt="Sumit Pokhrel"
              className="w-full h-full rounded-4xl object-cover saturate-50 transition-all duration-700 group-hover:saturate-100 group-hover:rounded-4xl group-hover:scale-105"
            />
          </div>
          {/* Subtle Monospaced Caption */}
          <div className="mt-4 flex justify-between items-center font-mono text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
            <span>Sumit Pokhrel</span>
            {/* <span>Est. 2001</span> */}
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7">
          <header className="mb-10">
            <h3 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tighter text-black uppercase">
              ORDER. <br />
              CLARITY. <br />
              <span className="text-neutral-400 group-hover:text-black transition-colors">
                EMOTION.
              </span>
            </h3>
          </header>

          <div className="space-y-8 max-w-2xl">
            <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-tight tracking-tight">
              I am <span className="text-black font-bold">Sumit</span>, a
              product designer and engineer who believes that structure doesn't
              have to be boring. My work sits at the intersection of systematic
              design and modern web technologies.
            </p>

            <p className="text-lg text-neutral-500 leading-relaxed font-mono uppercase text-[13px] tracking-wide border-l-2 border-black/10 pl-6">
              With over 3 years of experience, I build design systems that scale
              and user interfaces that feel alive.
            </p>
          </div>

          {/* Stats Grid - Using the design language's border and mono style */}
          <div className="mt-16 grid grid-cols-2 border-t border-black/10">
            <div className="py-8 pr-8 border-r border-black/10 group">
              <div className="text-5xl md:text-6xl font-black mb-2 text-black tracking-tighter">
                3+
              </div>
              <div className="text-[11px] font-bold font-mono text-neutral-400 uppercase tracking-[0.2em]">
                Years Experience
              </div>
            </div>

            <div className="py-8 pl-8 group">
              <div className="text-5xl md:text-6xl font-black mb-2 text-black tracking-tighter">
                5+
              </div>
              <div className="text-[11px] font-bold font-mono text-neutral-400 uppercase tracking-[0.2em]">
                Projects Shipped
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
