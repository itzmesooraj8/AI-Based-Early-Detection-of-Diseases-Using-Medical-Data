'use client'

import { useRouter } from "next/navigation"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  BarChart2,
  Settings,
  History,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Plus,
  Search,
  Bell,
  User,
  LogOut,
  Calendar,
  Cloud
} from "lucide-react"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { HistoryView } from "@/components/dashboard/history-view"
import { SettingsView } from "@/components/dashboard/settings-view"
import { toast } from "sonner"

// Types for Mock Data
interface ScanHistory {
  id: string
  date: string
  status: 'Benign' | 'Malignant'
  confidence: number
  location: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'settings'>('overview')
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [userName, setUserName] = useState("Alex Morgan")

  useEffect(() => {
    setCurrentTime(new Date())
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    // Load user name
    const storedName = localStorage.getItem("userName")
    if (storedName) setUserName(storedName)

    return () => clearInterval(timer)
  }, [])

  const router = useRouter()

  const handleAlert = () => {
    toast.error("Emergency Alert Broadcasted", { description: "Medical personnel have been notified." })
  }

  const handleNotification = () => {
    toast.info("No new notifications", { description: "You are all caught up." })
  }

  const dynamicHistory = useMemo(() => {
    const now = new Date()
    const getPastDate = (days: number) => {
      const d = new Date(now)
      d.setDate(d.getDate() - days)
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return [
      { id: 'SC-2045', date: getPastDate(0), status: 'Benign', confidence: 99.1, location: 'Left Forearm' },
      { id: 'SC-2044', date: getPastDate(2), status: 'Benign', confidence: 97.4, location: 'Right Shoulder' },
      { id: 'SC-2043', date: getPastDate(5), status: 'Malignant', confidence: 88.4, location: 'Upper Back' },
      { id: 'SC-2042', date: getPastDate(12), status: 'Benign', confidence: 99.8, location: 'Neck' },
    ] as ScanHistory[]
  }, [currentTime]) // Recalc when time updates (initial load) depends on if we want it to tick. Using empty dependency or just currentTime is fine.

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">

      {/* Sidebar Navigation */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-20 lg:w-64 border-r border-border bg-white/50 dark:bg-black/50 backdrop-blur-xl flex flex-col justify-between py-8 z-20"
      >
        <div>
          <div className="flex items-center justify-center lg:justify-start lg:px-8 mb-12 gap-3">
            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg">
              <Activity className="w-6 h-6" />
            </div>
            <span className="hidden lg:block font-bold text-xl tracking-tight">VitalGuard</span>
          </div>

          <nav className="flex flex-col gap-2 px-4">
            {[
              { id: 'overview', icon: BarChart2, label: 'Overview' },
              { id: 'history', icon: History, label: 'Scan History' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === item.id
                  ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                  : 'text-muted-foreground hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="px-4">
          <Link href="/login" className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block font-medium">Sign Out</span>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Header */}
        <header className="sticky top-0 z-10 px-8 py-6 flex items-center justify-between bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors md:hidden"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground text-sm">Welcome back, {userName}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-sm font-bold min-w-[80px] text-right">
                {currentTime ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
              </span>
              <span className="text-xs text-muted-foreground min-w-[100px] text-right">
                {currentTime ? currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '...'}
              </span>
            </div>
            <ModeToggle />
            <button
              onClick={handleAlert}
              className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center hover:scale-105 transition-transform"
              title="Emergency Alert"
            >
              <AlertCircle className="w-5 h-5" />
            </button>
            <button
              onClick={handleNotification}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-white/10 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-black" />
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg hover:ring-4 ring-blue-500/20 transition-all"
            >
              {userName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {activeTab === 'overview' && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <History className="w-16 h-16" />
                  </div>
                  <div className="text-muted-foreground font-medium mb-2">My Scans</div>
                  <div className="text-4xl font-bold tracking-tight">12</div>
                  <div className="text-sm text-green-500 flex items-center gap-1 mt-2 font-medium">
                    <span className="bg-green-500/10 px-1.5 py-0.5 rounded">+2</span> this month
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-16 h-16" />
                  </div>
                  <div className="text-muted-foreground font-medium mb-2">Health Alerts</div>
                  <div className="text-4xl font-bold tracking-tight">0</div>
                  <div className="text-sm text-green-500 flex items-center gap-1 mt-2 font-medium">
                    All Clear
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Activity className="w-16 h-16" />
                  </div>
                  <div className="text-muted-foreground font-medium mb-2">Last Result</div>
                  <div className="text-4xl font-bold tracking-tight">Benign</div>
                  <div className="text-sm text-blue-500 flex items-center gap-1 mt-2 font-medium">
                    {dynamicHistory[0].date}
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-900/40 dark:to-indigo-900/40">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <Link href="/scanner">
                      <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        New Scan
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold">My Recent Scans</h2>
                    <button
                      onClick={() => setActiveTab('history')}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-4">
                    {dynamicHistory.map((scan) => (
                      <motion.div
                        key={scan.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-black/5 dark:hover:border-white/10"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${scan.status === 'Benign'
                            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                            {scan.confidence > 90 ? 'A+' : 'A'}
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{scan.location}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span>{scan.date}</span>
                              <span>•</span>
                              <span>{scan.id}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <div className={`text-sm font-bold ${scan.status === 'Benign' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                              }`}>
                              {scan.status}
                            </div>
                            <div className="text-xs text-muted-foreground">{scan.confidence}% Confidence</div>
                          </div>
                          <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10">
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* System Status / Health Score */}
                <div className="glass-panel p-8 rounded-3xl flex flex-col items-center text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                  <h2 className="text-xl font-bold mb-8 w-full text-left">App Status</h2>

                  <div className="relative w-48 h-48 mb-8">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96" cy="96" r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-slate-100 dark:text-white/5"
                      />
                      <circle
                        cx="96" cy="96" r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={552}
                        strokeDashoffset={552 - (552 * 0.98)}
                        className="text-green-500 animate-[spin_1s_ease-out_reverse]"
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">Online</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1">AI Ready</span>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-4 h-4 text-blue-500" />
                        <span>Cloud Sync</span>
                      </div>
                      <span className="text-green-500 font-medium">On</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        <span>AI Latency</span>
                      </div>
                      <span className="font-medium">45ms</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span>Last Scan</span>
                      </div>
                      <span className="text-muted-foreground">{dynamicHistory[0].date.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'history' && (
            <HistoryView />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}

        </div>
      </main>
    </div>
  )
}
