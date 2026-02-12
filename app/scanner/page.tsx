'use client'

import React from "react"

import { useState, useRef, useCallback, type FC } from 'react'
import { Heart, Zap, Upload, X, Check, AlertCircle, Info, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Webcam from 'react-webcam'
import { ModeToggle } from '@/components/mode-toggle'

interface ScanResult {
  status: 'benign' | 'malignant' | 'monitor'
  confidence: number
}

const Scanner: FC = () => {
  const [scanning, setScanning] = useState<boolean>(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState<boolean>(false)

  const webcamRef = useRef<Webcam>(null)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setUploadedImage(imageSrc)
      setShowCamera(false)
    }
  }, [webcamRef])

  const handleStartScan = async () => {
    if (!uploadedImage) {
      alert("Please upload an image first. Camera integration coming soon with backend connectivity.")
      return
    }

    setScanning(true)
    setResult(null)

    try {
      // Convert base64 to blob
      const response = await fetch(uploadedImage)
      const blob = await response.blob()

      const formData = new FormData()
      formData.append('image', blob, 'scan.jpg')

      const apiResponse = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!apiResponse.ok) {
        throw new Error(`Analysis failed: ${apiResponse.statusText}`)
      }

      const data = await apiResponse.json()

      if (data.error) {
        alert(`Error from backend: ${data.error}`)
        setScanning(false)
        return
      }

      setResult({
        status: data.status, // 'benign' | 'malignant'
        confidence: data.confidence,
      })
    } catch (error) {
      console.error("Scan error:", error)
      alert("Failed to connect to analysis server. Please ensure the backend is running.")
    } finally {
      setScanning(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(128,128,128,0.2) 1px, transparent 1px), linear-gradient(rgba(128,128,128,0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="fixed top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="sticky top-0 z-40 border-b border-border backdrop-blur-lg bg-background/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                <Heart className="w-5 h-5" fill="currentColor" />
              </div>
              <h1 className="text-xl font-bold">VitalGuard Scanner</h1>
            </div>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {!result ? (
            <div className="space-y-8">
              {/* Instructions */}
              <div className="glass rounded-2xl p-8 border border-border">
                <div className="flex gap-4 mb-6">
                  <Info className="w-6 h-6 text-foreground flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">How to Get the Best Results</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Ensure good lighting on the affected area</li>
                      <li>• Keep the camera steady and clear</li>
                      <li>• Position the area at a 90-degree angle to the camera</li>
                      <li>• Avoid shadows and glare</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Camera/Upload Section */}
              {showCamera ? (
                <div className="glass rounded-2xl p-8 border border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Live Camera</h3>
                    <button
                      onClick={() => setShowCamera(false)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-6 rounded-lg overflow-hidden bg-black aspect-video relative">
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      className="w-full h-full object-cover"
                      videoConstraints={{ facingMode: "environment" }}
                    />
                  </div>
                  <button
                    onClick={capture}
                    className="w-full py-4 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    Capture Photo
                  </button>
                </div>
              ) : !uploadedImage ? (
                <div className="glass rounded-2xl p-12 border-2 border-dashed border-border text-center hover:border-foreground/50 transition-colors cursor-pointer bg-card/30">
                  <div className="space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                      <Zap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Start Your Scan</h3>
                      <p className="text-muted-foreground mb-6">Choose how you'd like to scan</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setShowCamera(true)}
                        className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold"
                      >
                        Use Camera
                      </button>
                      <label className="px-8 py-3 rounded-lg glass hover:bg-secondary/50 transition-all font-semibold cursor-pointer text-foreground border border-border">
                        Upload Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl p-8 border border-border bg-card/30">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Image Preview</h3>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mb-6 rounded-lg overflow-hidden max-h-96">
                    <img src={uploadedImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={handleStartScan}
                    className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold"
                  >
                    Analyze Image
                  </button>
                </div>
              )}

              {/* Scanning Indicator */}
              {scanning && (
                <div className="glass rounded-2xl p-12 border border-border text-center bg-card/30">
                  <div className="space-y-6">
                    <div className="w-16 h-16 mx-auto rounded-full border-4 border-muted border-t-primary animate-spin" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Analyzing Your Scan</h3>
                      <p className="text-muted-foreground">Using advanced deep learning to analyze...</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-pulse" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Result Card */}
              <div className={`glass rounded-2xl p-12 border border-border text-center relative overflow-hidden bg-card/30`}>
                {/* Result background glow */}
                <div className={`absolute inset-0 opacity-10 blur-3xl ${result.status === 'benign' ? 'bg-green-500' :
                  result.status === 'monitor' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />

                <div className="relative space-y-6">
                  {/* Status Icon */}
                  <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${result.status === 'benign' ? 'bg-green-500/10 border border-green-500/20' :
                    result.status === 'monitor' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                      'bg-red-500/10 border border-red-500/20'
                    }`}>
                    {result.status === 'benign' ? (
                      <Check className="w-10 h-10 text-green-500 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
                    )}
                  </div>

                  {/* Status Text */}
                  <div>
                    <h2 className="text-4xl font-bold mb-2">
                      {result.status === 'benign' ? 'Benign' :
                        result.status === 'monitor' ? 'Monitor Recommended' : 'Potential Concern'}
                    </h2>
                    <p className={`text-lg ${result.status === 'benign' ? 'text-green-600 dark:text-green-400' :
                      result.status === 'monitor' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                      {result.status === 'benign' ? 'This appears to be a benign lesion.' :
                        result.status === 'monitor' ? 'This lesion should be monitored.' :
                          'This lesion may require professional evaluation.'}
                    </p>
                  </div>

                  {/* Confidence */}
                  <div className="bg-muted/50 rounded-lg p-6 border border-border">
                    <p className="text-muted-foreground text-sm mb-2">Confidence Score</p>
                    <div className="flex items-end justify-center gap-2">
                      <span className="text-5xl font-bold text-foreground">{result.confidence}%</span>
                    </div>
                    <div className="mt-4 h-2 bg-background rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Medical Disclaimer */}
                  <div className="glass rounded-lg p-4 border border-yellow-500/30">
                    <p className="text-sm text-muted-foreground">
                      <strong>Disclaimer:</strong> This analysis is for informational purposes and should not replace professional medical advice. Please consult with a dermatologist for a proper diagnosis.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold">
                      Download Report
                    </button>
                    <button
                      onClick={() => {
                        setResult(null)
                        setUploadedImage(null)
                      }}
                      className="flex-1 py-3 rounded-lg glass hover:bg-secondary/50 transition-all font-semibold text-foreground border border-border"
                    >
                      New Scan
                    </button>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="glass rounded-2xl p-8 border border-border bg-card/30">
                <h3 className="text-lg font-semibold mb-6">Next Steps</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Schedule Professional Review',
                      description: 'Connect with certified dermatologists who can provide detailed medical evaluation.',
                    },
                    {
                      title: 'Monitor Your Health',
                      description: 'Keep track of your health metrics and scan regularly for early detection.',
                    },
                    {
                      title: 'Share with Healthcare Provider',
                      description: 'Export your report to share with your doctor or healthcare professional.',
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-background hover:bg-muted transition-colors border border-border">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-semibold mb-1">{step.title}</p>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Scanner
