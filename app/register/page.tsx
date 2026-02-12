'use client'

import React, { useState } from 'react'
import { Heart, Mail, Lock, User, Stethoscope, ArrowRight, Building } from 'lucide-react'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

export default function RegisterPage() {
    const [loading, setLoading] = useState(false)
    const [userType, setUserType] = useState<'patient' | 'doctor'>('patient')

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
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] translate-y-1/2 translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
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
                            Start Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-600 dark:from-white dark:to-slate-400">
                                Health Journey
                            </span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                            Create an account to access state-of-the-art AI diagnostics. Whether you're a patient monitoring your health or a specialist providing care, we're here to help.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-card border border-border backdrop-blur-sm">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <User className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold mb-1">For Patients</h4>
                            <p className="text-sm text-muted-foreground">Track history and get instant analysis.</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-card border border-border backdrop-blur-sm">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Stethoscope className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold mb-1">For Specialists</h4>
                            <p className="text-sm text-muted-foreground">Manage patients and verified reviews.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="flex items-center justify-center">
                    <div className="w-full max-w-lg backdrop-blur-xl bg-card/60 border border-border rounded-3xl p-8 shadow-2xl">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Create Account</h3>
                            <p className="text-muted-foreground">Join VitalGuard AI today.</p>
                        </div>

                        {/* User Type Selector */}
                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-xl mb-6">
                            <button
                                onClick={() => setUserType('patient')}
                                className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${userType === 'patient'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Patient
                            </button>
                            <button
                                onClick={() => setUserType('doctor')}
                                className={`py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${userType === 'doctor'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                Medical Professional
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        className="w-full bg-background border border-border rounded-xl py-3 px-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="email"
                                        placeholder="you@email.com"
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            {userType === 'doctor' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground ml-1">Medical License ID</label>
                                    <div className="relative group">
                                        <Building className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="MED-12345678"
                                            className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <input
                                        type="password"
                                        placeholder="Create a strong password"
                                        className="w-full bg-background border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    disabled={loading}
                                    className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold py-4 rounded-xl shadow-lg shadow-black/10 dark:shadow-white/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                                >
                                    {loading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-xs text-center text-muted-foreground px-4">
                                By clicking Create Account, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
                            </p>
                        </form>

                        <div className="mt-8 text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
