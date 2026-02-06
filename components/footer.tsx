"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

/* ------------------ CONSTANTS ------------------ */

enum SectionId {
  WORK = "work",
  SERVICES = "services",
}

/* ------------------ COMPONENT ------------------ */

const Footer = () => {
  const router = useRouter();

  const [showAdmin, setShowAdmin] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimeoutRef = useRef<number | null>(null);

  /* ---------- DESKTOP: type "admin" ---------- */
  useEffect(() => {
    let buffer = "";
    const secret = "admin";

    const onKeyDown = (e: KeyboardEvent) => {
      buffer += e.key;
      buffer = buffer.slice(-secret.length);

      if (buffer.toLowerCase() === secret) {
        setShowAdmin(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  /* ---------- MOBILE: 5 taps ---------- */
  const handleSecretTap = () => {
    setTapCount((prev) => {
      const next = prev + 1;

      if (next >= 5) {
        setShowAdmin(true);
        navigator.vibrate?.(200);
        return 0;
      }

      return next;
    });

    if (tapTimeoutRef.current) {
      clearTimeout(tapTimeoutRef.current);
    }

    tapTimeoutRef.current = window.setTimeout(() => {
      setTapCount(0);
    }, 1000);
  };

  /* ---------- HELPERS ---------- */
  const navigate = (path: string) => {
    router.push(path);
  };

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ------------------ JSX ------------------ */

  return (
    <footer className="bg-m3-on-surface text-m3-surface pt-24 pb-8 bg-black text-white rounded-t-[3rem] mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          {/* LEFT */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#7b7777] mb-8">
              Get in touch
            </h3>

            <div className="flex flex-col gap-2">
              <a
                href="mailto:developer@sumit.info.np"
                className="text-3xl md:text-6xl font-black tracking-tighter text-m3-surface-variant hover:text-white hover:translate-x-4 transition-all duration-300"
              >
                Email
              </a>
              <a
                href="https://www.instagram.com/sumitp._"
                className="text-3xl md:text-6xl font-black tracking-tighter text-m3-surface-variant hover:text-white hover:translate-x-4 transition-all duration-300"
              >
                Instagram
              </a>
              <a
                href="https://github.com/ozsumit"
                className="text-3xl md:text-6xl font-black tracking-tighter text-m3-surface-variant hover:text-white hover:translate-x-4 transition-all duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sumit-pokhrel-/"
                className="text-3xl md:text-6xl font-black tracking-tighter text-m3-surface-variant hover:text-white hover:translate-x-4 transition-all duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-12">
              {/* MENU */}
              <div>
                <span className="block text-xs font-bold text-[#7b7777] mb-6 uppercase tracking-[0.2em]">
                  Menu
                </span>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => {
                        navigate("/projects");
                        scrollToSection(SectionId.WORK);
                      }}
                      className="text-xl font-bold text-m3-surface hover:text-swiss-red hover:translate-x-2 transition-all duration-300"
                    >
                      Work
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        navigate("/contact");
                        scrollToSection(SectionId.SERVICES);
                      }}
                      className="text-xl font-bold text-m3-surface hover:text-swiss-red hover:translate-x-2 transition-all duration-300"
                    >
                      Contact
                    </button>
                  </li>
                  {/* <li>
                    <button
                      onClick={() => navigate("/gallery")}
                      className="text-xl font-bold text-m3-surface hover:text-swiss-red hover:translate-x-2 transition-all duration-300"
                    >
                      Gallery
                    </button>
                  </li> */}
                </ul>
              </div>

              {/* LEGAL */}
              <div>
                <span
                  onClick={handleSecretTap}
                  className="block text-xs font-bold text-[#7b7777] mb-6 uppercase tracking-[0.2em] cursor-pointer select-none"
                >
                  Legal
                </span>

                <ul className="space-y-4">
                  <li>
                    <a className="text-xl font-bold text-m3-surface hover:text-swiss-red transition-all duration-300">
                      Privacy
                    </a>
                  </li>

                  {/* {showAdmin && (
                    <li className="animate-fade-in">
                      <button
                        onClick={() => navigate("/dashboard")}
                        className="text-xl font-bold text-swiss-red hover:text-white hover:translate-x-2 transition-all duration-300"
                      >
                        Admin
                      </button>
                    </li>
                  )} */}
                </ul>
              </div>
            </div>

            {/* BACK TO TOP */}
            <div className="mt-12 text-right">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-3 ml-auto text-sm font-bold uppercase tracking-widest hover:text-swiss-red transition-colors"
              >
                Back to Top
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:-translate-y-2 group-hover:bg-swiss-red transition-all duration-300">
                  ↑
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8">
          <h2 className="text-[14vw] font-black tracking-tighter  text-[#454545] text-center select-none">
            SUMIT_POKHREL
          </h2>

          <div className="flex flex-col md:flex-row justify-between mt-8 text-xs text-m3-surface-variant uppercase tracking-wider">
            <span>© 2026 Sumit Pokhrel</span>
            {/* <span className="mt-2 md:mt-0">SWISS STYLE × MATERIAL YOU</span> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
