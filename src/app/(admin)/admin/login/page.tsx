"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield, Sparkles } from "lucide-react";
import { useState } from "react";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Static background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Static gradient orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 mb-4 shadow-2xl shadow-blue-500/50">
              <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />
            </div>
            <h1
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 mb-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Admin Portal
            </h1>
            <p className="text-slate-400 text-sm">
              Secure access to your dashboard
            </p>
          </div>

          {/* Login card */}
          <div className="backdrop-blur-xl bg-slate-900/50 border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-200 text-sm font-medium"
                >
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors"
                    size={18}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-12 h-12 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500 
                    focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 
                    rounded-xl transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-slate-200 text-sm font-medium"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors"
                    size={18}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-12 pr-12 h-12 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-500 
                    focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 
                    rounded-xl transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 
                text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 
                transition-all hover:shadow-xl hover:shadow-blue-500/40"
              >
                <span className="flex items-center justify-center gap-2">
                  <Sparkles size={18} />
                  Sign In
                </span>
              </Button>
            </form>

            {/* Footer text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Protected by advanced security protocols
              </p>
            </div>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
