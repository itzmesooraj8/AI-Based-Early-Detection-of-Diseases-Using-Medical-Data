'use client'

import { motion } from "framer-motion"
import { Users, Activity, Target, Shield, Award, ChevronLeft, Brain } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
    const router = useRouter()

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-20 relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-0 left-0 p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors z-20"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Mission Statement */}
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block p-4 rounded-full bg-green-500/10 mb-4"
                    >
                        <Activity className="w-12 h-12 text-green-500" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                    >
                        Democratizing <span className="text-gradient">Medical AI.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                    >
                        VitalGuard AI was founded on a simple premise: Early detection saves lives. We bridge the gap between advanced medical diagnostics and everyday accessibility.
                    </motion.p>
                </div>

                {/* 2026 Vision */}
                <div className="grid md:grid-cols-2 gap-12 items-center py-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-bold">Our 2026 Vision</h2>
                        <p className="text-lg text-muted-foreground">
                            By 2026, our goal is to empower over 1 million users with instant, accurate, and private health screenings directly from their personal devices.
                        </p>
                        <div className="space-y-6">
                            {[
                                { icon: Target, title: "Precision", text: "Achieving 99.9% accuracy in early-stage detection." },
                                { icon: Shield, title: "Privacy First", text: "Pioneering local-first processing for medical data." },
                                { icon: Users, title: "Accessibility", text: "Zero-cost basic screening for underserved communities." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 mt-1">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative h-[600px] rounded-[3rem] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-12"
                    >
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                        <div className="glass-card p-12 rounded-3xl text-center text-white space-y-4 max-w-sm backdrop-blur-xl border border-white/20 shadow-2xl relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Brain className="w-20 h-20 mx-auto mb-4 text-cyan-400 animate-pulse" />
                            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                                Research Prototype
                            </div>
                            <div className="text-xl opacity-90 font-light tracking-wide">
                                Academic Project 2026
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
