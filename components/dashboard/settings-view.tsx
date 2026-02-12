"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Lock, Shield, User, Globe, Mail, Moon, Sun, CheckCircle, Smartphone } from "lucide-react"
import { toast } from "sonner"

export function SettingsView() {
    const [notifications, setNotifications] = useState(true)
    const [twoFactor, setTwoFactor] = useState(false)
    const [name, setName] = useState("Alex Morgan")
    const [email, setEmail] = useState("alex.morgan@example.com")
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            toast.success("Profile updated successfully")
        }, 800)
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-6"
                >
                    <div className="flex items-center gap-4 border-b border-border pb-6">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <User className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Profile Information</h3>
                            <p className="text-sm text-muted-foreground">Update your account details</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 px-4 py-2 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
                    >
                        {isSaving ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                            />
                        ) : (
                            <CheckCircle className="w-4 h-4" />
                        )}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </motion.div>

                {/* Preferences Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-6"
                >
                    <div className="flex items-center gap-4 border-b border-border pb-6">
                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Preferences</h3>
                            <p className="text-sm text-muted-foreground">Customize your experience</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="space-y-0.5">
                                <div className="font-medium">Language</div>
                                <div className="text-xs text-muted-foreground">Select your interface language</div>
                            </div>
                            <select className="bg-transparent border-none outline-none font-medium text-sm text-right">
                                <option>English (US)</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="space-y-0.5">
                                <div className="font-medium">Time Zone</div>
                                <div className="text-xs text-muted-foreground">Set your local time</div>
                            </div>
                            <span className="text-sm font-medium">GMT-05:00 (EST)</span>
                        </div>
                    </div>
                </motion.div>

                {/* Security Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-6"
                >
                    <div className="flex items-center gap-4 border-b border-border pb-6">
                        <div className="p-3 rounded-full bg-red-500/10 text-red-500">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Security</h3>
                            <p className="text-sm text-muted-foreground">Manage your account security</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="font-medium">Two-Factor Authentication</label>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                            </div>
                            <button
                                onClick={() => setTwoFactor(!twoFactor)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${twoFactor ? 'bg-primary' : 'bg-muted'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${twoFactor ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                                <Lock className="w-4 h-4" />
                                Change Password
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Notifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm space-y-6"
                >
                    <div className="flex items-center gap-4 border-b border-border pb-6">
                        <div className="p-3 rounded-full bg-yellow-500/10 text-yellow-500">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Notifications</h3>
                            <p className="text-sm text-muted-foreground">Manage your alerts</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="font-medium">Email Notifications</label>
                                <p className="text-xs text-muted-foreground">Receive daily summaries</p>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-muted'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <label className="font-medium">Push Notifications</label>
                                <p className="text-xs text-muted-foreground">Real-time alerts on your device</p>
                            </div>
                            <button className="w-12 h-6 rounded-full bg-muted transition-colors relative">
                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-0" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
