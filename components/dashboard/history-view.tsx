"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, Download, Eye, FileText, CheckCircle, AlertTriangle } from "lucide-react"

export function HistoryView() {
    const [searchTerm, setSearchTerm] = useState("")

    // Dynamic dates for 2026 demo
    const getPastDate = (days: number) => {
        const d = new Date()
        d.setFullYear(2026) // Ensure 2026 if system time isn't
        // If system time IS 2026 (as per context), just use new Date()
        // But to be safe for "current demo" I will just use new Date() which is 2026 in this env.
        const now = new Date()
        d.setDate(now.getDate() - days)
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const historyData = [
        { id: 'SC-1024', date: getPastDate(0), status: 'Benign', confidence: 98.2, location: 'Left Forearm' },
        { id: 'SC-1023', date: getPastDate(2), status: 'Benign', confidence: 95.5, location: 'Right Shoulder' },
        { id: 'SC-1022', date: getPastDate(5), status: 'Malignant', confidence: 88.4, location: 'Upper Back' },
        { id: 'SC-1021', date: getPastDate(12), status: 'Benign', confidence: 99.1, location: 'Neck' },
        { id: 'SC-1020', date: getPastDate(15), status: 'Benign', confidence: 92.3, location: 'Chest' },
        { id: 'SC-1019', date: getPastDate(20), status: 'Malignant', confidence: 76.5, location: 'Leg' },
    ]

    const filteredHistory = historyData.filter(item =>
        item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Scan History</h2>
                    <p className="text-muted-foreground">Manage and review your past diagnostic reports.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by ID or location..."
                        className="w-full pl-10 px-4 py-2 rounded-lg bg-background border border-input focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors">
                        <span>Status</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background hover:bg-muted/50 transition-colors">
                        <span>Date Range</span>
                        <ChevronDown className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border overflow-hidden bg-card/50 backdrop-blur-sm">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b border-border">
                        <tr>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Scan ID</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Date</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Location</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Status</th>
                            <th className="h-12 px-4 text-left font-medium text-muted-foreground">Confidence</th>
                            <th className="h-12 px-4 text-right font-medium text-muted-foreground">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group border-b border-border last:border-0 hover:bg-muted/50 transition-colors"
                            >
                                <td className="p-4 font-medium">{item.id}</td>
                                <td className="p-4 text-muted-foreground">{item.date}</td>
                                <td className="p-4">{item.location}</td>
                                <td className="p-4">
                                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Benign'
                                        ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                        : 'bg-red-500/10 text-red-600 border-red-500/20'
                                        }`}>
                                        {item.status === 'Benign' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                                        {item.status}
                                    </div>
                                </td>
                                <td className="p-4 font-mono">{item.confidence}%</td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 rounded-lg hover:bg-background border border-transparent hover:border-border transition-all" title="View Report">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <button className="p-2 rounded-lg hover:bg-background border border-transparent hover:border-border transition-all" title="View Scan">
                                            <Eye className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>

                {filteredHistory.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No records found matching your search.
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1-{filteredHistory.length} of {historyData.length} records</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 rounded border border-border hover:bg-muted transition-colors disabled:opacity-50" disabled>Next</button>
                </div>
            </div>
        </div>
    )
}
