'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, ArrowRight, Lock, Mail, User, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const name = formData.get("fullName") as string

        localStorage.setItem("userName", name)

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success(`Account created for ${name}`, {
            description: "Welcome to VitalGuard AI."
        })

        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
            {/* Left Panel - Abstract Art (Reversed Gradient for variety) */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 -right-1/4 w-[1000px] h-[1000px] bg-emerald-600/20 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
                    <div className="absolute bottom-0 -left-1/4 w-[1200px] h-[1200px] bg-teal-600/20 rounded-full blur-[150px] animate-pulse duration-[15000ms] delay-1000" />
                </div>

                <div className="relative z-10 p-12 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8"
                    >
                        <Activity className="w-8 h-8 text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-bold tracking-tight mb-6"
                    >
                        Join the  <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Revolution.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/60 max-w-md leading-relaxed"
                    >
                        Create your account to start offering AI-powered preliminary diagnostics to your patients.
                    </motion.p>
                </div>

                {/* Dynamic Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            {/* Right Panel - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100 dark:bg-emerald-900/10 rounded-full blur-[100px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
                        <p className="text-muted-foreground mt-2">Enter your details to generate your secure ID.</p>
                    </div>

                    <div className="absolute top-6 left-6">
                        <Link href="/" className="p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    name="fullName"
                                    type="text"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                    placeholder="Dr. John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    type="email"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                    placeholder="doctor@clinic.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-black dark:bg-white text-white dark:text-black rounded-xl py-4 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>Create Account <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-muted-foreground">
                        Already have an account? <Link href="/login" className="font-bold text-foreground hover:underline">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
