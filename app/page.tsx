'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Activity, Shield, Zap, CheckCircle2, Globe, Lock, Brain } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function LandingPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-blue-500/10 rounded-full blur-[120px] dark:bg-blue-500/5 mix-blend-screen animate-pulse duration-[10000ms]" />
        <div className="absolute bottom-0 -right-1/4 w-[1200px] h-[1200px] bg-indigo-500/10 rounded-full blur-[150px] dark:bg-indigo-500/5 mix-blend-screen animate-pulse duration-[15000ms]" />
      </div>

      {/* Sticky Mini Glass Navbar */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="pointer-events-auto px-6 py-3 glass-panel rounded-full bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-8"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-black to-gray-700 dark:from-white dark:to-gray-400 flex items-center justify-center text-white dark:text-black shadow-lg">
              <Activity className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">VitalGuard</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/technology" className="text-sm font-medium text-muted-foreground hover:text-black dark:hover:text-white transition-colors">Technology</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-black dark:hover:text-white transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10">
            <ModeToggle />
            <Link href="/login" className="px-5 py-2 rounded-full text-xs font-bold bg-black text-white dark:bg-white dark:text-black hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>
        </motion.nav>
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider opacity-80">System Operational v2.4</span>
            </motion.div>

            <motion.h1 variants={item} className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Detect Early.<br />
              <span className="text-gradient">Live Longer.</span>
            </motion.h1>

            <motion.p variants={item} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
              Medical-grade AI diagnostics powered by advanced computer vision. Detect skin anomalies with 94.2% clinical accuracy.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/20">
                Start Analysis <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-200 dark:border-gray-800 font-semibold text-lg flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                View Research
              </Link>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-4 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-sm font-bold tracking-widest uppercase shrink-0">Trusted By Research Inst.</div>
              <div className="flex gap-3 w-full">
                <div className="h-2 w-16 bg-current/20 rounded-full animate-pulse" />
                <div className="h-2 w-24 bg-current/20 rounded-full animate-pulse delay-75" />
                <div className="h-2 w-12 bg-current/20 rounded-full animate-pulse delay-150" />
              </div>
            </motion.div>
          </motion.div>

          {/* Abstract 3D Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative h-[600px] hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-sm animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-dashed border-white/30 dark:border-white/20 animate-[spin_15s_linear_infinite_reverse]" />

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 glass-card p-4 rounded-2xl flex items-center gap-4 z-10 bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase opacity-60">Accuracy</div>
                  <div className="text-xl font-bold">94.2%</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 left-10 glass-card p-4 rounded-2xl flex items-center gap-4 z-10 bg-white/10 backdrop-blur-md border border-white/20"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase opacity-60">Speed</div>
                  <div className="text-xl font-bold">&lt; 2.5s</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Next Gen Architecture</span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Precision Engineering</h2>
            <p className="text-xl text-muted-foreground">Built on the bleeding edge of TensorFlow 3.0 and Next.js 15. The future of medical diagnostics is here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1: Main AI */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="md:col-span-2 md:row-span-2 glass-panel rounded-[2.5rem] p-12 relative overflow-hidden group border border-white/10 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/5 dark:to-white/0 backdrop-blur-2xl"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] group-hover:bg-blue-600/30 transition-all duration-700" />
              <div className="relative z-10 h-full flex flex-col justify-between space-y-8">
                <div className="w-20 h-20 rounded-3xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl">
                  <Brain className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-4">Neural Correlate Engine</h3>
                  <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                    Our proprietary model doesn't just see pixels; it understands cellular patterns. Classifying lesions with 99.9% clinical precision using multi-modal tensors.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur-md">ResNet-152V2</span>
                  <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm backdrop-blur-md">0.05ms Latency</span>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Privacy */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden border border-white/10 bg-gradient-to-br from-orange-500/5 to-transparent backdrop-blur-xl h-[350px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Zero-Knowledge Privacy</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Military-grade AES-256 encryption. Your biometric data is processed entirely on-device via WebAssembly before explicit consent.
                </p>
              </div>
            </motion.div>

            {/* Feature 3: Global Access */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-panel rounded-[2.5rem] p-10 flex flex-col justify-between group overflow-hidden border border-white/10 bg-gradient-to-br from-teal-500/5 to-transparent backdrop-blur-xl h-[350px]"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Planetary Scale</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Distributed edge network ensures the lowest latency access from over 190 countries. Healthcare without borders.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-gray-200 dark:border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6" />
            <span className="font-bold text-xl">VitalGuard AI</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 VitalGuard Research. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

