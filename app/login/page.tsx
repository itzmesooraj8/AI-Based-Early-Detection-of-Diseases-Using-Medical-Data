'use client'

import React, { useState } from 'react'
import { Heart, Mail, Lock, ArrowRight, Github } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-4 right-4 z-50">
                <div className="bg-background/50 backdrop-blur-sm rounded-full p-1">
                    <ModeToggle />
                </div>
            </div>
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
                {/* Left Side - Hero Content */}
                <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-black/10 dark:shadow-white/10">
                            <Heart className="w-8 h-8" fill="currentColor" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">VitalGuard AI</h1>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-5xl font-extrabold leading-tight">
                            Medical Grade <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-600 dark:from-white dark:to-slate-400">
                                AI Detection
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
                            Join thousands of medical professionals and patients using our advanced skin cancer detection system. Early detection saves lives.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                                    <span className="text-xs">U{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="h-10 w-px bg-border" />
                        <p>Trusted by 10,000+ users</p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-md backdrop-blur-xl bg-card/60 border border-border rounded-3xl p-8 shadow-2xl">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Welcome Back</h3>
                            <p className="text-muted-foreground">Please enter your details to sign in.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="doctor@hospital.com"
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-offset-background" />
                                    <span className="ml-2 text-muted-foreground">Remember me</span>
                                </label>
                                <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot Password?</a>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold py-4 rounded-xl shadow-lg shadow-black/10 dark:shadow-white/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-card hover:bg-muted rounded-xl border border-border transition-all text-foreground font-medium">
                                    <Github className="w-5 h-5" />
                                    Github
                                </button>
                                <button type="button" className="flex items-center justify-center gap-2 py-3 bg-card hover:bg-muted rounded-xl border border-border transition-all text-foreground font-medium">
                                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black font-bold">G</div>
                                    Google
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
