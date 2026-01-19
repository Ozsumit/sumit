"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Send,
  CheckCircle,
  Instagram,
} from "lucide-react";
import Header from "@/components/header";

const DotPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-[#F5F5F2] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
    setIsLoading(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "mail@sumit.info.np",
      href: "mailto:mail@sumit.sumit.info.np",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "9842134149",
      href: "tel:9842134149",
    },
  ];

  const socialLinks = [
    {
      label: "GitHub",
      icon: Github,
      href: "https://github.com/ozsumit",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/sumitpokhrel",
    },
    {
      label: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/sumitp._",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#111] font-sans">
      <Header />
      <DotPattern />

      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-[#FF5733]/10 text-[#FF5733] rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-balance">
                Let's Create Something{" "}
                <span className="text-[#FF5733]">Amazing</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl leading-relaxed">
              Have a project in mind? I'd love to hear about it. Whether you
              need a full design system overhaul, a stunning website, or a
              complex web application, let's discuss how we can work together.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-20">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-8">Contact Info</h2>
              <div className="space-y-5">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      whileHover={{ x: 4 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 bg-[#FF5733]/10 rounded-[1rem] flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-[#FF5733]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
                          {method.label}
                        </p>
                        <p className="font-semibold text-neutral-800 group-hover:text-[#FF5733] transition-colors">
                          {method.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-500 mb-4">
                Follow Me
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-white border border-black/10 rounded-[1rem] flex items-center justify-center text-neutral-600 hover:bg-[#FF5733] hover:text-white hover:border-[#FF5733] transition-all"
                      title={social.label}
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 bg-white rounded-[1.5rem] border border-[#FF5733]/20 bg-gradient-to-br from-white to-[#FF5733]/5"
            >
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#FF5733] rounded-full mt-1.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-neutral-800 mb-1">
                    Available for Projects
                  </p>
                  <p className="text-sm text-neutral-600">
                    I'm currently open to freelance opportunities and exciting
                    collaborations. Let's talk!
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-black/5">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-bold uppercase tracking-widest text-neutral-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-black/10 rounded-[1rem] focus:outline-none focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-bold uppercase tracking-widest text-neutral-700 mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-neutral-50 border border-black/10 rounded-[1rem] focus:outline-none focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold uppercase tracking-widest text-neutral-700 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-50 border border-black/10 rounded-[1rem] focus:outline-none focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20 transition-all"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold uppercase tracking-widest text-neutral-700 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-neutral-50 border border-black/10 rounded-[1rem] focus:outline-none focus:border-[#FF5733] focus:ring-2 focus:ring-[#FF5733]/20 transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-[#FF5733] text-white rounded-full font-bold uppercase tracking-widest hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-neutral-500 text-center">
                    I'll get back to you as soon as possible, typically within
                    24 hours.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <CheckCircle size={64} className="text-[#FF5733]" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-neutral-800">
                    Message Sent!
                  </h3>
                  <p className="text-neutral-600">
                    Thank you for reaching out. I've received your message and
                    will get back to you soon.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
