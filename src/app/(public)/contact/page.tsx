"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cpu,
  Database,
  ExternalLink,
  Fingerprint,
  Github,
  Lock,
  Mail,
  Phone,
  Radio,
  Scan,
  Send,
  ShieldCheck,
  Target,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

// --- Types ---
type FormStatus = "idle" | "scanning" | "sent";

interface Service {
  id: string;
  label: string;
  icon: React.ElementType;
  meta: string;
  desc: string;
}

// --- Services & Constants ---
const SERVICES: Service[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    icon: Cpu,
    meta: "UI_CORE",
    desc: "High-performance React & Next.js applications",
  },
  {
    id: "backend",
    label: "Backend Development",
    icon: Radio,
    meta: "API_ENGINE",
    desc: "Scalable APIs, databases & server architecture",
  },
  {
    id: "fullstack",
    label: "Full-Stack Solutions",
    icon: Target,
    meta: "SYSTEM_BUILD",
    desc: "End-to-end product development & deployment",
  },
  {
    id: "ai",
    label: "AI-Powered Features",
    icon: Zap,
    meta: "AI_LAYER",
    desc: "LLM integration & intelligent workflows",
  },
];

export const CONTACT_NODES = [
  {
    icon: Mail,
    label: "Email",
    value: "rabbybhai276@gmail.com",
    link: "mailto:rabbybhai276@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "01705928276",
    link: "tel:+8801705928276", // Bangladesh formatted
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/rabbisiddique",
    link: "https://github.com/rabbisiddique",
  },
];

// --- Components ---

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const [activeService, setActiveService] = useState<string | null>(null);
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [biometricProgress, setBiometricProgress] = useState(0);
  const [briefing, setBriefing] = useState("");

  const isDark = theme === "dark";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("scanning");

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 1;
      if (progress >= 100) {
        progress = 100;
        setBiometricProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setFormStatus("sent");
        }, 800);
      } else {
        setBiometricProgress(progress);
      }
    }, 60);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-[#050505] text-white" : "bg-[#fcfcfc] text-zinc-900"} selection:bg-blue-600/30`}
    >
      {/* HUD Background Effects */}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-24 grid lg:grid-cols-[1.4fr_0.6fr] gap-12 lg:gap-24 items-start">
        {/* Main Console Section */}
        <section className="space-y-12">
          {/* Hero Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div
                className={`h-[2px] w-12 transition-colors ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
              />
              <span
                className={`text-[11px] font-black uppercase tracking-[0.6em] transition-colors ${isDark ? "text-blue-500" : "text-blue-600"}`}
              >
                Connection_Request
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] font-space">
              Let’s Start a
              <br />
              <span
                className={`text-transparent transition-colors duration-700`}
                style={{
                  WebkitTextStroke: isDark
                    ? "1px rgba(255,255,255,0.2)"
                    : "1px rgba(0,0,0,0.1)",
                }}
              >
                Conversation
              </span>
            </h1>
            <p
              className={`max-w-xl text-lg md:text-xl font-medium leading-relaxed transition-colors ${isDark ? "text-white/40" : "text-black/50"}`}
            >
              Got something on your mind? A project, feedback, or just a hello —
              we’re all ears. Reach out and let’s talk.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Step 01: Service */}
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-black transition-all ${isDark ? "bg-blue-500/10 border-blue-500/50" : "bg-blue-50 border-blue-200 text-blue-600"}`}
                  >
                    01
                  </div>
                  <span
                    className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? "text-white/40" : "text-black/40"}`}
                  >
                    Select_Objective
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SERVICES.map((s) => (
                  <motion.button
                    key={s.id}
                    type="button"
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(0,0,0,0.02)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setActiveService(s.id);
                    }}
                    className={`p-6 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                      activeService === s.id
                        ? isDark
                          ? "bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                          : "bg-blue-50 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.05)]"
                        : isDark
                          ? "bg-white/2 border-white/5"
                          : "bg-black/2 border-black/5"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl mb-4 w-fit transition-all ${activeService === s.id ? (isDark ? "bg-blue-500 text-white" : "bg-blue-600 text-white") : isDark ? "bg-white/5 text-white/40 group-hover:text-white" : "bg-black/5 text-black/40 group-hover:text-black"}`}
                    >
                      <s.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black uppercase tracking-tight">
                        {s.label}
                      </h4>
                      <p
                        className={`text-[10px] mt-1 font-medium transition-colors ${isDark ? "text-white/30" : "text-black/40"}`}
                      >
                        {s.desc}
                      </p>
                    </div>
                    <div
                      className={`absolute top-4 right-4 text-[9px] font-mono transition-colors ${isDark ? "text-white/10" : "text-black/10"}`}
                    >
                      {s.meta}
                    </div>
                    {activeService === s.id && (
                      <motion.div
                        layoutId="active-ind"
                        className={`absolute bottom-0 left-0 w-full h-1 ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step 02: Details */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-black transition-all ${isDark ? "bg-blue-500/10 border-blue-500/50" : "bg-blue-50 border-blue-200 text-blue-600"}`}
                >
                  02
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? "text-white/40" : "text-black/40"}`}
                >
                  Credentials_Briefing
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label
                    className={`text-[10px] font-black uppercase tracking-widest ml-2 transition-colors ${isDark ? "text-white/20" : "text-black/30"}`}
                  >
                    Identifier_Tag
                  </label>
                  <input
                    required
                    placeholder="UNIT_NAME / ID"
                    className={`w-full border rounded-xl p-4 font-mono text-sm tracking-wider focus:outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:bg-white/[0.08]" : "bg-black/2 border-black/10 focus:border-blue-500/50 focus:bg-black/5"}`}
                  />
                </div>
                <div className="space-y-3">
                  <label
                    className={`text-[10px] font-black uppercase tracking-widest ml-2 transition-colors ${isDark ? "text-white/20" : "text-black/30"}`}
                  >
                    Uplink_Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="ADMIN@NETWORK.SYS"
                    className={`w-full border rounded-xl p-4 font-mono text-sm tracking-wider focus:outline-none transition-all ${isDark ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:bg-white/[0.08]" : "bg-black/2 border-black/10 focus:border-blue-500/50 focus:bg-black/5"}`}
                  />
                </div>
              </div>

              <div className="space-y-3 relative group">
                <label
                  className={`text-[10px] font-black uppercase tracking-widest ml-2 transition-colors ${isDark ? "text-white/20" : "text-black/30"}`}
                >
                  Operational_Briefing
                </label>
                <textarea
                  required
                  rows={6}
                  value={briefing}
                  onChange={(e) => setBriefing(e.target.value)}
                  placeholder="TRANSMIT MISSION PARAMETERS..."
                  className={`w-full border rounded-2xl p-6 font-mono text-sm tracking-wider focus:outline-none transition-all resize-none ${isDark ? "bg-white/5 border-white/10 focus:border-blue-500/50 focus:bg-white/[0.08]" : "bg-black/2 border-black/10 focus:border-blue-500/50 focus:bg-black/5"}`}
                />
              </div>
            </div>

            {/* Submission Section */}
            <div className="pt-6">
              <AnimatePresence mode="wait">
                {formStatus === "idle" ? (
                  <motion.button
                    key="submit"
                    type="submit"
                    whileHover={{
                      scale: 1.01,
                      boxShadow: isDark
                        ? "0 0 40px rgba(59, 130, 246, 0.2)"
                        : "0 0 30px rgba(59, 130, 246, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-8 rounded-3xl font-black text-xs uppercase 
                       flex items-center
                       justify-center gap-4 transition-all ${
                         isDark
                           ? "bg-white text-black hover:bg-zinc-100"
                           : "bg-zinc-900 text-white hover:bg-black"
                       }`}
                  >
                    Initiate_Secure_Transmission{" "}
                    <Send size={18} strokeWidth={3} />
                  </motion.button>
                ) : formStatus === "scanning" ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full border rounded-3xl p-10 backdrop-blur-xl flex flex-col items-center gap-8 transition-all ${isDark ? "bg-white/5 border-blue-500/30" : "bg-black/2 border-blue-500/20"}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Fingerprint
                          size={48}
                          className="text-blue-500 animate-pulse"
                        />
                        <motion.div
                          animate={{ top: ["0%", "100%"] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className={`absolute left-0 right-0 h-[2px] shadow-[0_0_10px_#3b82f6] transition-colors ${isDark ? "bg-blue-400" : "bg-blue-600"}`}
                        />
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? "text-blue-400" : "text-blue-600"}`}
                        >
                          Identity_Verification
                        </span>
                        <div className="text-4xl font-black font-mono mt-1">
                          {biometricProgress}%
                        </div>
                      </div>
                    </div>
                    <div
                      className={`w-full h-1.5 rounded-full overflow-hidden transition-colors ${isDark ? "bg-white/5" : "bg-black/5"}`}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${biometricProgress}%` }}
                        className={`h-full shadow-[0_0_20px_#3b82f6] transition-colors ${isDark ? "bg-blue-500" : "bg-blue-600"}`}
                      />
                    </div>
                  </motion.div>
                ) : formStatus === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`w-full border rounded-3xl p-12 text-center space-y-6 transition-all ${isDark ? "bg-emerald-500/5 border-emerald-500/30" : "bg-emerald-50 border-emerald-500/20"}`}
                  >
                    <div
                      className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition-all ${isDark ? "bg-emerald-500 text-black shadow-[0_0_50px_rgba(16,185,129,0.3)]" : "bg-emerald-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.2)]"}`}
                    >
                      <ShieldCheck size={40} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">
                        Transmission_Verified
                      </h3>
                      <p
                        className={`text-[10px] font-black uppercase tracking-[0.4em] mt-2 transition-colors ${isDark ? "text-emerald-500/60" : "text-emerald-700/60"}`}
                      >
                        Your information has been securely sent and processed.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormStatus("idle");
                        setBiometricProgress(0);
                      }}
                      className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isDark ? "text-white/30 hover:text-white" : "text-black/30 hover:text-black"}`}
                    >
                      Initialize_New_Session
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </form>
        </section>

        {/* Side Panel: HUD & Terminal Logs */}
        <aside className="lg:sticky lg:top-32 space-y-8">
          {/* Admin HUD */}
          <div
            className={`border rounded-[2.5rem] p-8 space-y-10 backdrop-blur-md transition-all duration-500 ${isDark ? "bg-white/[0.02] border-white/5" : "bg-white border-black/5 shadow-xl shadow-black/5"}`}
          >
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div
                  className={`w-20 h-20 rounded-2xl overflow-hidden border grayscale group-hover:grayscale-0 transition-all duration-500 ${isDark ? "border-white/10" : "border-black/5"}`}
                >
                  <img
                    src="https://picsum.photos/200/200?grayscale"
                    alt="Admin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${isDark ? "bg-[#050505] border-white/10" : "bg-white border-black/5 shadow-sm"}`}
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
              <div>
                <span
                  className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? "text-white/20" : "text-black/30"}`}
                >
                  System_Architect
                </span>
                <h4 className="text-2xl font-black uppercase tracking-tighter mt-1">
                  Rabbi_Siddique
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  <Scan
                    size={12}
                    className={isDark ? "text-blue-500" : "text-blue-600"}
                  />
                  <span
                    className={`text-[9px] font-bold uppercase tracking-widest transition-colors ${isDark ? "text-blue-500/80" : "text-blue-600"}`}
                  >
                    Active_Session
                  </span>
                </div>
              </div>
            </div>

            <div
              className={`h-[1px] transition-colors ${isDark ? "bg-white/5" : "bg-black/5"}`}
            />

            {/* Connection Nodes */}
            <div className="space-y-6">
              <span
                className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors ${isDark ? "text-white/20" : "text-black/30"}`}
              >
                Access_Points
              </span>
              <div className="space-y-3">
                {CONTACT_NODES.map((node, i) => (
                  <motion.a
                    key={i}
                    href={node.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      x: 6,
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(0,0,0,0.02)",
                    }}
                    className="flex items-center gap-4 p-3 rounded-xl transition-all group"
                  >
                    <div
                      className={`p-2.5 rounded-lg transition-all ${
                        isDark
                          ? "bg-white/5 text-white/40 group-hover:bg-blue-500/10 group-hover:text-blue-500"
                          : "bg-black/5 text-black/40 group-hover:bg-blue-600/10 group-hover:text-blue-600"
                      }`}
                    >
                      <node.icon size={16} />
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <div
                        className={`text-[8px] font-black uppercase tracking-widest transition-colors ${
                          isDark
                            ? "text-white/20 group-hover:text-blue-500/50"
                            : "text-black/30 group-hover:text-blue-600/50"
                        }`}
                      >
                        {node.label}
                      </div>

                      <div
                        className={`text-sm font-bold truncate transition-colors ${
                          isDark
                            ? "group-hover:text-white"
                            : "group-hover:text-black"
                        }`}
                      >
                        {node.value}
                      </div>
                    </div>

                    <ExternalLink
                      size={12}
                      className="opacity-0 group-hover:opacity-40"
                    />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Sys Status */}
            <div
              className={`rounded-2xl p-5 flex items-center justify-between border transition-all ${isDark ? "bg-white/5 border-white/5" : "bg-black/2 border-black/5"}`}
            >
              <div className="flex items-center gap-3">
                <Database
                  size={16}
                  className={isDark ? "text-blue-400" : "text-blue-600"}
                />
                <div
                  className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isDark ? "text-white/40" : "text-black/40"}`}
                >
                  Load: 0.24%
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Lock
                  size={16}
                  className={isDark ? "text-blue-400" : "text-blue-600"}
                />
                <div
                  className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isDark ? "text-white/40" : "text-black/40"}`}
                >
                  Secure: TRUE
                </div>
              </div>
            </div>
          </div>

          {/* Terminal Logs */}
        </aside>
      </main>

      {/* Aesthetic Footer */}
    </div>
  );
};

export default ContactPage;
