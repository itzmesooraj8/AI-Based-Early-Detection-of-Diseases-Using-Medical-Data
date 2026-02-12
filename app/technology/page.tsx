

'use client'

import { motion } from "framer-motion"
import { Cpu, Database, Server, Code, Layers, Zap, Brain, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TechnologyPage() {
    const router = useRouter()

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
        <div className="min-h-screen bg-background text-foreground py-12 px-6">
            <div className="max-w-7xl mx-auto space-y-20 relative">
                <button
                    onClick={() => router.back()}
                    className="absolute top-0 left-0 p-3 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors z-20"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-medium"
                    >
                        <Cpu className="w-4 h-4" />
                        <span>Tech Stack 2026</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight"
                    >
                        Under the Hood
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted-foreground"
                    >
                        Powered by next-generation neural networks and edge computing for real-time diagnostics.
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: Brain,
                            title: "TensorFlow 3.x",
                            desc: "Deep Learning models optimized for sub-millisecond inference times on standard hardware."
                        },
                        {
                            icon: Server,
                            title: "Python Backend",
                            desc: "Flask-based microservice architecture handling image processing and model orchestration."
                        },
                        {
                            icon: Layers,
                            title: "Next.js 15",
                            desc: "React framework providing server-side rendering and static generation for instant page loads."
                        },
                        {
                            icon: Database,
                            title: "Vector Database",
                            desc: "High-dimensional data storage for fast similarity search and historical pattern matching."
                        },
                        {
                            icon: Code,
                            title: "TypeScript",
                            desc: "Strictly typed codebase ensuring reliability and maintainability at scale."
                        },
                        {
                            icon: Zap,
                            title: "Edge Runtime",
                            desc: "Processing logic distributed to the edge for lower latency and better privacy."
                        }
                    ].map((tech, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="glass-card p-8 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-foreground">
                                <tech.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{tech.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* 2026 Future Proof Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex justify-center pt-12"
                >
                    <div className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-md text-center">
                        <span className="text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Built for the Future • 2026 Core Architecture
                        </span>
                    </div>
                </motion.div>

            </div>
        </div>
    )
}


