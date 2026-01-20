"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  Cpu,
  ExternalLink,
  Fingerprint,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  Radio,
  Send,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ContactPage = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "scanning" | "sent">(
    "idle",
  );
  const [biometricProgress, setBiometricProgress] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();

  const services = [
    { id: "fullstack", label: "Full-Stack Dev", icon: Cpu, meta: "ARCH_INIT" },
    { id: "uiux", label: "UI/UX Overhaul", icon: Target, meta: "EXP_SYNC" },
    { id: "ai", label: "AI Integration", icon: Zap, meta: "NEURAL_LINK" },
    { id: "consult", label: "Consultation", icon: Radio, meta: "SYS_AUDIT" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("scanning");
    // Simulate biometric scan & data transmission
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setBiometricProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setFormStatus("sent"), 500);
      }
    }, 50);
  };

  return (
    <div
      className={`relative min-h-screen pb-32 overflow-x-hidden ${
        isDark ? "bg-[#050505] text-white" : "bg-[#fafafa] text-zinc-900"
      }`}
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute inset-0 opacity-[0.05] ${isDark ? "" : "invert"}`}
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-600/5 via-transparent to-emerald-600/5" />
      </div>

      <header
        className={`sticky top-0 z-[120] px-8 py-6 flex justify-between items-center backdrop-blur-3xl border-b transition-all ${
          isDark ? "bg-black/40 border-white/5" : "bg-white/60 border-zinc-200"
        }`}
      >
        <motion.button
          onClick={() => router.push("/")}
          whileHover={{ x: -6 }}
          className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${
            isDark
              ? "text-zinc-500 hover:text-white"
              : "text-zinc-400 hover:text-black"
          }`}
        >
          <ChevronLeft size={16} strokeWidth={3} />
          Uplink_Exit
        </motion.button>
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1.5 rounded-xl border flex items-center gap-3 ${
              isDark
                ? "bg-zinc-900 border-white/10"
                : "bg-zinc-100 border-black/5"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">
              Frequency: 2.4GHz
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-8 pt-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-20 items-start">
        {/* Contact Terminal (The Form) */}
        <section className="space-y-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6"
            >
              <div className="w-12 h-[2px] bg-blue-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.8em] text-blue-500">
                Initiate_Protocol
              </span>
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-space leading-none">
              ESTABLISH
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: `2px ${isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                UPLINK
              </span>
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Service Selection Grid */}
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                Step_01: Define Mission Parameter
              </span>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.button
                    key={service.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveService(service.id)}
                    className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group ${
                      activeService === service.id
                        ? isDark
                          ? "bg-blue-600/20 border-blue-500 text-white shadow-xl shadow-blue-500/10"
                          : "bg-blue-50 border-blue-500 text-blue-700 shadow-xl"
                        : isDark
                          ? "bg-zinc-900/40 border-white/5 hover:bg-zinc-900/60"
                          : "bg-white border-zinc-200 hover:shadow-lg"
                    }`}
                  >
                    <service.icon
                      size={24}
                      className={`mb-4 transition-colors ${activeService === service.id ? "text-blue-500" : "opacity-40"}`}
                    />
                    <div className="text-sm font-black uppercase tracking-tight">
                      {service.label}
                    </div>
                    <div className="text-[8px] font-mono opacity-30 mt-1">
                      {service.meta}
                    </div>
                    {activeService === service.id && (
                      <motion.div
                        layoutId="service-active"
                        className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                Step_02: Credentials & Briefing
              </span>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-2">
                    Identifier
                  </label>
                  <input
                    required
                    placeholder="NAME / UNIT ID"
                    className={`w-full p-5 rounded-2xl border bg-transparent font-space font-bold text-sm tracking-wider outline-none transition-all ${
                      isDark
                        ? "border-white/5 focus:border-blue-500/50 focus:bg-white/5"
                        : "border-black/5 focus:border-blue-500/50 focus:bg-zinc-50"
                    }`}
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-2">
                    Uplink Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="EMAIL@DOMAIN.COM"
                    className={`w-full p-5 rounded-2xl border bg-transparent font-space font-bold text-sm tracking-wider outline-none transition-all ${
                      isDark
                        ? "border-white/5 focus:border-blue-500/50 focus:bg-white/5"
                        : "border-black/5 focus:border-blue-500/50 focus:bg-zinc-50"
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] font-black uppercase tracking-widest opacity-30 px-2">
                  Operational Briefing
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="TRANSMIT MESSAGE / REQUIREMENTS..."
                  className={`w-full p-6 rounded-3xl border bg-transparent font-space font-medium text-sm tracking-wider outline-none transition-all resize-none ${
                    isDark
                      ? "border-white/5 focus:border-blue-500/50 focus:bg-white/5"
                      : "border-black/5 focus:border-blue-500/50 focus:bg-zinc-50"
                  }`}
                />
              </div>
            </div>

            {/* Submit Control */}
            <div className="pt-6 relative">
              <AnimatePresence mode="wait">
                {formStatus === "idle" ? (
                  <motion.button
                    key="idle"
                    type="submit"
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-8 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.8em] flex items-center justify-center gap-6 transition-all shadow-2xl ${
                      isDark
                        ? "bg-white text-black hover:bg-zinc-100"
                        : "bg-black text-white hover:bg-zinc-800"
                    }`}
                  >
                    Secure Transmission <Send size={20} strokeWidth={3} />
                  </motion.button>
                ) : formStatus === "scanning" ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-full p-8 rounded-[2.5rem] border backdrop-blur-3xl flex flex-col items-center gap-6 ${
                      isDark
                        ? "bg-zinc-900 border-blue-500/50"
                        : "bg-zinc-50 border-blue-500/50"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <Fingerprint
                        size={32}
                        className="text-blue-500 animate-pulse"
                      />
                      <div className="text-left">
                        <div className="text-[10px] font-black uppercase tracking-[0.4em]">
                          Biometric_Verification
                        </div>
                        <div className="text-xl font-black font-mono">
                          {biometricProgress}% Complete
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-current/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${biometricProgress}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_20px_#3b82f6]"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full p-8 rounded-[2.5rem] border backdrop-blur-3xl flex flex-col items-center gap-4 text-center ${
                      isDark
                        ? "bg-emerald-500/10 border-emerald-500/50"
                        : "bg-emerald-50 border-emerald-500/50"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-2 shadow-xl shadow-emerald-500/20">
                      <ShieldCheck size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tight">
                        Transmission_Received
                      </h3>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mt-1">
                        Status: Uplink Established
                      </p>
                    </div>
                    <button
                      onClick={() => setFormStatus("idle")}
                      className="mt-4 text-[9px] font-black uppercase tracking-widest text-blue-500 hover:underline"
                    >
                      Initialize New Session
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </section>

        {/* Support HUD (Contact Links) */}
        <aside className="lg:sticky lg:top-32 space-y-10">
          <div
            className={`p-10 rounded-[3rem] border backdrop-blur-3xl space-y-12 transition-all duration-700 ${
              isDark
                ? "bg-zinc-950/80 border-white/5"
                : "bg-white border-black/5 shadow-xl"
            }`}
          >
            {/* Profile HUD */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl overflow-hidden grayscale border-2 border-white/10 group hover:grayscale-0 transition-all">
                <img
                  src="https://picsum.photos/200/200?grayscale"
                  alt="Admin"
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
                  System_Admin
                </span>
                <h4 className="text-2xl font-black uppercase tracking-tighter">
                  Rabbi Siddique
                </h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                    Available_Now
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-current opacity-5" />

            {/* Connection Nodes */}
            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">
                Alternative_Node_Exit
              </span>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Secure_Mail",
                    val: "rabbisiddique@gmail.com",
                    link: "mailto:rabbisiddique@gmail.com",
                  },
                  {
                    icon: MessageSquare,
                    label: "Signal_Comms",
                    val: "@rabbi_sid",
                    link: "#",
                  },
                  {
                    icon: Globe,
                    label: "Digital_Grid",
                    val: "rabbi-siddique.dev",
                    link: "#",
                  },
                  {
                    icon: Phone,
                    label: "Encrypted_Line",
                    val: "+880 1705 928276",
                    link: "tel:+8801705928276",
                  },
                ].map((node, i) => (
                  <motion.a
                    key={i}
                    href={node.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className={`p-3 rounded-xl transition-all ${isDark ? "bg-zinc-900 group-hover:bg-blue-600/10 text-zinc-500 group-hover:text-blue-500" : "bg-zinc-50 group-hover:bg-blue-50 text-zinc-400 group-hover:text-blue-600"}`}
                    >
                      <node.icon size={18} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-[8px] font-black uppercase tracking-widest opacity-30">
                        {node.label}
                      </div>
                      <div
                        className={`text-sm font-bold truncate transition-colors ${isDark ? "group-hover:text-white" : "group-hover:text-black"}`}
                      >
                        {node.val}
                      </div>
                    </div>
                    <ExternalLink
                      size={14}
                      className="opacity-0 group-hover:opacity-40 transition-opacity"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* System Footer Fluff */}
            <div
              className={`p-6 rounded-2xl border flex items-center justify-between ${isDark ? "bg-zinc-900/50 border-white/5" : "bg-zinc-50 border-black/5"}`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-blue-500" />
                <span className="text-[8px] font-black uppercase tracking-widest opacity-40">
                  SSL_SECURE: AES-256
                </span>
              </div>
              <span className="text-[8px] font-mono opacity-20 uppercase">
                Lat: 2.4ms
              </span>
            </div>
          </div>

          <div className="text-center px-10">
            <p
              className={`text-[10px] font-medium leading-relaxed opacity-30 italic ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
            >
              High-performance architecture is established through clear
              communication and robust planning. Initiating a protocol ensures
              alignment of engineering vision.
            </p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default ContactPage;
