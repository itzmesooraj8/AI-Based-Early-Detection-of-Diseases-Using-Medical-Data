"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Webcam from "react-webcam"
import {
  Camera,
  Upload,
  X,
  Zap,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  Maximize2,
  ChevronLeft
} from "lucide-react"
import { toast } from "sonner"
import { ModeToggle } from "@/components/mode-toggle"

export default function ScannerPage() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [result, setResult] = useState<{
    status: 'malignant' | 'benign';
    confidence: number;
  } | null>(null)

  const webcamRef = useRef<Webcam>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setCapturedImage(imageSrc)
      setIsCameraActive(false)
      handleAnalysis(imageSrc)
    }
  }, [webcamRef])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setCapturedImage(base64String)
        handleAnalysis(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalysis = async (imageBase64: string) => {
    setIsScanning(true)
    setResult(null)

    // Convert base64 to blob
    const fetchResponse = await fetch(imageBase64)
    const blob = await fetchResponse.blob()

    const formData = new FormData()
    formData.append('image', blob, 'scan.jpg')

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed')
      }

      // Artificial delay for dramatic effect (God Tier UX)
      setTimeout(() => {
        setResult(data)
        setIsScanning(false)
        if (data.status === 'malignant') {
          toast.error("Analysis Complete: Anomaly Detected", {
            description: "Confidence: " + data.confidence + "%. Immediate consultation recommended.",
            className: "border-red-500 text-red-500",
            duration: 8000
          })
        } else {
          toast.success("Analysis Complete: Benign", {
            description: "Confidence: " + data.confidence + "%. No immediate anomalies detected.",
            className: "border-green-500 text-green-500",
            duration: 5000
          })
        }
      }, 2000)

    } catch (error: any) {
      console.error('Error:', error)
      setIsScanning(false)
      toast.error("Diagnostic Engine Offline", {
        description: error.message || "Unable to reach AI Core. Please check connection."
      })
    }
  }

  const resetScanner = () => {
    setCapturedImage(null)
    setResult(null)
    setIsCameraActive(false)
    setCameraError(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden transition-colors duration-500">

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full p-6 flex justify-between items-center z-50 glass-panel-light dark:glass-panel sticky top-0"
      >
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white dark:text-black" />
            </div>
            <span className="font-bold text-xl tracking-tight">VitalGuard AI</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono font-medium opacity-70">SYSTEM: ONLINE</span>
          </div>
          <ModeToggle />
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative w-full max-w-7xl mx-auto">

        {/* Ambient Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        {/* Scanner Interface */}
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center z-10">

          {/* Left Column: Controls & Instructions */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 text-gradient-monochrome">
                Skin Analysis
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed text-balance">
                Advanced CNN algorithms detect early signs of dermatological anomalies with 94.2% accuracy.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Action Buttons */}
              {!capturedImage && !isCameraActive && (
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setIsCameraActive(true)
                      setCameraError(null)
                    }}
                    className="btn-primary flex items-center gap-2 group"
                  >
                    <Camera className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Live Camera
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-outline flex items-center gap-2 group bg-white/50 dark:bg-black/50"
                  >
                    <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    Upload Image
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
              )}

              {/* Reset Button */}
              {(capturedImage || isCameraActive) && (
                <button
                  onClick={resetScanner}
                  disabled={isScanning}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-black dark:hover:text-white transition-colors w-fit px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Reset Scanner
                </button>
              )}
            </div>

            {/* Status Indicators */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Model</p>
                  <p className="text-sm font-bold">ResNet50 v2</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resolution</p>
                  <p className="text-sm font-bold">HD Enhanced</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Viewport */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="relative"
          >
            {/* Viewport Container */}
            <div className="relative aspect-square md:aspect-[4/5] bg-slate-100 dark:bg-black rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl z-20">

              {/* Default State */}
              {!isCameraActive && !capturedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-800 m-4 rounded-3xl">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-900 flex items-center justify-center mb-4">
                      <Camera className="w-10 h-10 opacity-50" />
                    </div>
                  </motion.div>
                  <p className="max-w-[200px] text-sm">Initialize camera or upload a clear medical image to begin analysis.</p>
                </div>
              )}

              {/* Camera Error State */}
              {cameraError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-red-500 bg-red-50/90 dark:bg-red-900/90 backdrop-blur-sm border-2 border-red-500 m-4 rounded-3xl z-50 animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="w-12 h-12 mb-4" />
                  <p className="font-bold text-lg mb-2">Camera Access Error</p>
                  <p className="text-sm max-w-[200px] mb-6 text-red-100">{cameraError}</p>
                  <button
                    onClick={() => setCameraError(null)}
                    className="px-6 py-2 bg-white text-red-600 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Live Camera Feed */}
              {isCameraActive && !capturedImage && !cameraError && (
                <div className="absolute inset-0 bg-black">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="absolute inset-0 w-full h-full object-cover"
                    videoConstraints={{ facingMode: "environment" }}
                    onUserMedia={() => setCameraError(null)}
                    onUserMediaError={(err) => {
                      console.error("Camera Error:", err);
                      setCameraError("Camera access denied or unavailable. Please check permissions.");
                      setIsCameraActive(false);
                      toast.error("Camera access failed", { description: "Please use the upload option instead." });
                    }}
                  />
                  {/* Camera Overlay UI */}
                  <div className="absolute inset-0 border-[1px] border-white/20 m-6 rounded-3xl pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-xl" />
                  </div>

                  {/* Capture Button */}
                  <button
                    onClick={capture}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform bg-white/20 backdrop-blur-sm z-30"
                  >
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg" />
                  </button>
                </div>
              )}

              {/* Captured Image Display */}
              {capturedImage && (
                <div className="absolute inset-0">
                  <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />

                  {/* Scanning Animation Overlay */}
                  <AnimatePresence>
                    {isScanning && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center"
                      >
                        <div className="scan-line-animation w-full h-full absolute top-0 left-0 opacity-30" />
                        <motion.div
                          className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.6)]"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                        />

                        {/* Loading Text */}
                        <div className="relative font-mono font-bold text-2xl tracking-widest text-white mt-8">
                          <span className="inline-block animate-pulse">ANALYZING</span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Result Overlay */}
                  <AnimatePresence>
                    {!isScanning && result && (
                      <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                        className="absolute inset-0 bg-black/40 z-40 flex items-center justify-center p-6"
                      >
                        <div className="w-full bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">

                          {/* Result Header */}
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Diagnosis</h3>
                              <div className="flex items-center gap-2 mt-1">
                                {result.status === 'malignant' ? (
                                  <AlertCircle className="text-red-500 w-6 h-6" />
                                ) : (
                                  <CheckCircle2 className="text-green-500 w-6 h-6" />
                                )}
                                <span className={`text-2xl font-bold capitalize ${result.status === 'malignant' ? 'text-red-500' : 'text-green-500'
                                  }`}>
                                  {result.status}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Confidence</h3>
                              <p className="text-2xl font-bold tabular-nums">{result.confidence}%</p>
                            </div>
                          </div>

                          {/* Radial Progess Visual */}
                          <div className="relative h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden mb-6">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${result.confidence}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              className={`h-full rounded-full ${result.status === 'malignant' ? 'bg-red-500 flow-red' : 'bg-green-500 glow-green'
                                }`}
                            />
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border border-slate-100 dark:border-slate-800">
                            {result.status === 'malignant'
                              ? "Analysis suggests patterns consistent with malignant lesions. Immediate consultation with a certified dermatologist is strongly recommended for biopsy and further evaluation."
                              : "No malignant patterns detected. However, this is an AI-assisted screening tool and does not replace professional medical advice. Monitor for changes."}
                          </div>

                          <button
                            onClick={resetScanner}
                            className={`w-full mt-6 py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl active:scale-95 ${result.status === 'malignant'
                              ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                              : 'bg-green-600 hover:bg-green-700 shadow-green-500/20'
                              }`}
                          >
                            Start New Scan
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}


