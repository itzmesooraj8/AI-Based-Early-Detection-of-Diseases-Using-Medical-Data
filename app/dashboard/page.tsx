'use client'

import React, { useState } from 'react'
import { Heart, Activity, TrendingUp, Calendar, MapPin, Download, Plus, Settings, Bell, LogOut, Zap, Shield, User, FileText, ChevronRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

interface Scan {
  id: number
  date: string
  result: string
  confidence: number
  area: string
}

const mockData = [
  { date: 'Jan', score: 78, scan: 4 },
  { date: 'Feb', score: 82, scan: 6 },
  { date: 'Mar', score: 85, scan: 5 },
  { date: 'Apr', score: 88, scan: 8 },
  { date: 'May', score: 91, scan: 7 },
  { date: 'Jun', score: 94, scan: 10 },
]

const recentScans: Scan[] = [
  { id: 1, date: 'Feb 10, 2024', result: 'Benign', confidence: 98, area: 'Left Forearm' },
  { id: 2, date: 'Jan 28, 2024', result: 'Benign', confidence: 95, area: 'Right Shoulder' },
  { id: 3, date: 'Jan 15, 2024', result: 'Monitor', confidence: 72, area: 'Upper Back' },
  { id: 4, date: 'Dec 12, 2023', result: 'Benign', confidence: 99, area: 'Left Leg' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-500/10 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Main Layout */}
      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar - Desktop */}
        <aside className="w-64 hidden lg:flex flex-col border-r border-border bg-card/50 backdrop-blur-xl">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-black/10 dark:shadow-white/10">
                <Heart className="w-6 h-6" fill="currentColor" />
              </div>
              <h1 className="text-xl font-bold tracking-tight">VitalGuard</h1>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { name: 'Overview', icon: Activity, id: 'overview' },
              { name: 'My Scans', icon: Zap, id: 'scans' },
              { name: 'Reports', icon: FileText, id: 'reports' },
              { name: 'Specialists', icon: User, id: 'specialists' },
              { name: 'Settings', icon: Settings, id: 'settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id
                  ? 'bg-secondary text-secondary-foreground border border-border'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
                {activeTab === item.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-primary-foreground">AD</div>
                <div>
                  <p className="text-sm font-bold text-foreground">Alex Doe</p>
                  <p className="text-xs text-muted-foreground">Premium Plan</p>
                </div>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-background hover:bg-accent text-xs font-medium transition-colors text-muted-foreground hover:text-foreground">
                <LogOut className="w-3 h-3" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* content Area */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
          <header className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 border-b border-border bg-background/80 backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <p className="text-muted-foreground text-sm">Welcome back, Alex. Here's your health summary.</p>
            </div>

            <div className="flex items-center gap-4">
              <ModeToggle />
              <Link href="/scanner">
                <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-black/20 dark:shadow-white/20 transition-all active:scale-95">
                  <Plus className="w-5 h-5" />
                  New Scan
                </button>
              </Link>
              <button className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-secondary/80 transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border border-background" />
              </button>
            </div>
          </header>

          <div className="p-8 space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Health Score', value: '94/100', icon: Heart, trend: '+2.5%', color: 'text-foreground', bg: 'bg-secondary/50', border: 'border-border' },
                { label: 'Total Scans', value: '24', icon: Activity, trend: '+4 this month', color: 'text-foreground', bg: 'bg-secondary/50', border: 'border-border' },
                { label: 'Risk Level', value: 'Low', icon: Shield, trend: 'Stable', color: 'text-foreground', bg: 'bg-secondary/50', border: 'border-border' },
                { label: 'Next Checkup', value: 'Mar 15', icon: Calendar, trend: '12 days left', color: 'text-foreground', bg: 'bg-secondary/50', border: 'border-border' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-md hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-xl bg-background border border-border ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background border border-border text-muted-foreground">
                      {stat.trend}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Charts & Actions Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Chart */}
              <div className="lg:col-span-2 p-6 rounded-3xl bg-secondary/30 border border-border backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold">Health Analysis Trend</h3>
                    <p className="text-sm text-muted-foreground">Confidence score over time</p>
                  </div>
                  <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary">
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                  </select>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData}>
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="currentColor" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.2)" vertical={false} />
                      <XAxis dataKey="date" stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="currentColor" fontSize={12} tickLine={false} axisLine={false} domain={[60, 100]} />
                      <Tooltip
                        contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', color: 'var(--foreground)' }}
                        itemStyle={{ color: 'var(--foreground)' }}
                      />
                      <Area type="monotone" dataKey="score" stroke="currentColor" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Actions & Profile */}
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-secondary text-secondary-foreground shadow-xl shadow-black/10 dark:shadow-white/10 relative overflow-hidden group border border-border">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-xl font-bold mb-2 relative z-10">Start AI Diagnosis</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-[200px] relative z-10">
                    Use our advanced AI to scan skin lesions instantly.
                  </p>
                  <Link href="/scanner">
                    <button className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-colors shadow-lg active:scale-95 flex items-center justify-center gap-2 relative z-10">
                      <Zap className="w-5 h-5" />
                      Scan Now
                    </button>
                  </Link>
                </div>

                <div className="p-6 rounded-3xl bg-secondary/30 border border-border backdrop-blur-md">
                  <h3 className="text-lg font-bold mb-4">Quick Limits</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 text-foreground">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Find Dermatologist</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-background hover:bg-muted transition-colors cursor-pointer border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-black/10 dark:bg-white/10 text-foreground">
                          <Download className="w-5 h-5" />
                        </div>
                        <span className="font-medium">Download Report</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Scans Table */}
            <div className="p-6 rounded-3xl bg-secondary/30 border border-border backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">Recent Diagnosis</h3>
                <button className="text-sm text-primary hover:underline font-medium">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="pb-4 pl-4 text-sm font-medium text-muted-foreground">Scan Details</th>
                      <th className="pb-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="pb-4 text-sm font-medium text-muted-foreground">Result</th>
                      <th className="pb-4 text-sm font-medium text-muted-foreground">Confidence</th>
                      <th className="pb-4 pr-4 text-sm font-medium text-muted-foreground text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentScans.map((scan) => (
                      <tr key={scan.id} className="group border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="py-4 pl-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                              <Activity className="w-5 h-5" />
                            </div>
                            <span className="font-medium text-foreground">{scan.area}</span>
                          </div>
                        </td>
                        <td className="py-4 text-muted-foreground">{scan.date}</td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${scan.result === 'Benign'
                            ? 'bg-black/10 text-black border border-black/20 dark:bg-white/10 dark:text-white dark:border-white/20'
                            : 'bg-black/10 text-black border border-black/20 dark:bg-white/10 dark:text-white dark:border-white/20'
                            }`}>
                            {scan.result}
                          </span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className={`h-full rounded-full ${scan.confidence > 90 ? 'bg-black dark:bg-white' : 'bg-gray-500'}`}
                                style={{ width: `${scan.confidence}%` }}
                              />
                            </div>
                            <span className="text-muted-foreground">{scan.confidence}%</span>
                          </div>
                        </td>
                        <td className="py-4 pr-4 text-right">
                          <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
