"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: -10 }}
            className="w-10 h-10 bg-[#FF573300] rounded-[1rem] flex items-center justify-center text-white font-bold text-lg"
          >
            <Image src="/logos.svg" alt="alt" width={40} height={40} />
          </motion.div>
          <span
            className="hidden md:block text-2xl
           font-extrabold text-[#1a1a1a]"
          >
            Sumit Pokhrel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-[#FF5733] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        {/* <Link
          href="/contact"
          className="hidden md:block px-6 py-2 bg-[#FF5733] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all"
        >
          Get in Touch
        </Link> */}
        <div></div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[#1a1a1a]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto" } : { height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white border-b border-black/5"
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-sm font-bold uppercase tracking-widest text-neutral-700 hover:text-[#FF5733] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block px-6 py-3 bg-[#FF5733] text-white rounded-full font-bold text-sm uppercase tracking-widest text-center hover:shadow-lg transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
