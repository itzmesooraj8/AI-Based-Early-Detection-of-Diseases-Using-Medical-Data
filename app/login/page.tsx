'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Activity, ArrowRight, Lock, Mail, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.target as HTMLFormElement)
        const email = formData.get("email") as string
        const name = email ? email.split("@")[0].split(".").map((n: string) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ") : "User"

        localStorage.setItem("userName", name)

        // Simulate network delay for a premium feel
        await new Promise(resolve => setTimeout(resolve, 1500))

        toast.success(`Welcome back, ${name}`, {
            description: "Secure session established."
        })

        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen w-full flex bg-background text-foreground overflow-hidden">
            {/* Left Panel - Abstract Art */}
            <div className="hidden lg:flex w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse duration-[10000ms]" />
                    <div className="absolute bottom-0 -right-1/4 w-[1200px] h-[1200px] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse duration-[15000ms] delay-1000" />
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
                        Medical Intelligence <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Reimagined.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-white/60 max-w-md leading-relaxed"
                    >
                        Access the world's most advanced dermatological diagnostic tool. Secure, fast, and clinically verified.
                    </motion.p>
                </div>

                {/* Dynamic Grid Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                {/* Background Gradients for Light Mode */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
                        <p className="text-muted-foreground mt-2">Enter your credentials to access the portal.</p>
                    </div>

                    <div className="absolute top-6 left-6">
                        <Link href="/" className="p-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center">
                            <ChevronLeft className="w-5 h-5" />
                        </Link>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    placeholder="user@example.com"
                                    defaultValue="alex.morgan@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                                <input
                                    type="password"
                                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-12 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                                    placeholder="••••••••"
                                    defaultValue="password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-muted-foreground">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black rounded-xl py-4 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-muted-foreground">
                        Don't have an account? <Link href="/register" className="font-bold text-foreground hover:underline">Register now</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    )
}
