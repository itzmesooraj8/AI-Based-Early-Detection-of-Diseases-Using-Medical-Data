'use client'

import { useState, useEffect, useRef, type FC } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronRight, Zap, Shield, TrendingUp, Users, Lock, Microscope, BarChart3, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ModeToggle } from '@/components/mode-toggle'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

const floatingVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
  animate: {
    y: [0, -15, 0],
    transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' },
  },
}

const Home: FC = () => {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Animated gradient orbs - medical blue */}
      <motion.div
        className="fixed top-20 right-0 w-96 h-96 bg-slate-400/15 rounded-full blur-3xl opacity-40 pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="fixed -bottom-40 left-0 w-96 h-96 bg-gray-400/15 rounded-full blur-3xl opacity-40 pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="relative z-10">
        {/* Navigation */}
        <motion.nav
          className="sticky top-0 z-50 border-b border-border backdrop-blur-2xl bg-white/80 dark:bg-black/80"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="p-2.5 rounded-xl bg-black dark:bg-white shadow-lg shadow-black/10 dark:shadow-white/10"
                whileHover={{ rotate: 10 }}
              >
                <Heart className="w-5 h-5 text-white dark:text-black" fill="currentColor" />
              </motion.div>
              <h1 className="text-xl font-bold text-gradient-light">VitalGuard AI</h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <Link href="/dashboard">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Dashboard</Button>
                </motion.div>
              </Link>
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="btn-primary rounded-lg">Sign In</Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-8">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass hover-glow cursor-pointer bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                  <Zap className="w-4 h-4 text-black dark:text-white" />
                </motion.div>
                <span className="text-sm text-foreground font-medium">AI-Powered Medical Detection</span>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h1 className="text-6xl lg:text-7xl font-bold text-balance leading-tight tracking-tight text-foreground">
                  Detect Diseases{' '}
                  <span className="text-gradient-light inline-block">
                    Before They Grow
                  </span>
                </h1>
              </motion.div>

              <motion.p
                className="text-lg text-muted-foreground max-w-lg leading-relaxed"
                variants={itemVariants}
              >
                VitalGuard AI uses advanced deep learning to detect skin cancer and other diseases in real-time. Get instant, medical-grade analysis from your device.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                <Link href="/scanner">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn-primary flex items-center justify-center gap-2 group w-full sm:w-auto">
                      <Sparkles className="w-4 h-4" />
                      Start Scanning Now
                      <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </button>
                  </motion.div>
                </Link>
                <Link href="/register">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button className="btn-secondary flex items-center justify-center gap-2 w-full sm:w-auto">
                      Create Account
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                className="grid grid-cols-3 gap-4 pt-8 border-t border-border"
                variants={itemVariants}
              >
                {[
                  { value: '92%', label: 'Accuracy Rate', icon: '📊' },
                  { value: '50K+', label: 'Scans Completed', icon: '✓' },
                  { value: '24/7', label: 'Available', icon: '🔒' },
                ].map((stat, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }}>
                    <p className="text-3xl font-bold text-gradient-light">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative h-full min-h-96"
              variants={floatingVariants}
              initial="hidden"
              animate="visible"
              whileHover="animate"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-400/20 rounded-3xl blur-3xl opacity-60"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              />
              <motion.div
                className="relative glass-premium rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden border-border"
                whileHover={{ shadow: '0 0 40px rgba(0, 0, 0, 0.1)' }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-400/20 to-transparent rounded-full blur-3xl" />
                <div className="relative space-y-6">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-lg shadow-black/10 dark:shadow-white/10"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Microscope className="w-7 h-7 text-white dark:text-black" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">Real-Time Scanning</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">Point your device's camera and get instant analysis powered by our advanced neural network.</p>
                  </div>
                </div>
                <motion.div className="relative space-y-3">
                  {[
                    { icon: Shield, text: 'HIPAA Compliant' },
                    { icon: Lock, text: 'End-to-End Encrypted' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3 text-sm group cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="w-4 h-4 text-black dark:text-white group-hover:scale-110 transition-transform" />
                      <span className="text-foreground">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section - Bento Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-border">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight text-foreground">
              Powerful Features{' '}
              <span className="text-gradient-light inline-block">
                for Medical Excellence
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">Everything you need to detect, diagnose, and monitor with medical-grade precision.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Feature 1 - Large */}
            <motion.div
              className="lg:col-span-2 lg:row-span-2 bento-card relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(0)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <div className="space-y-6 h-full flex flex-col justify-between relative z-10">
                <div>
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-black/10 dark:shadow-white/10"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <Zap className="w-7 h-7 text-white dark:text-black" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 text-balance text-foreground">Live Real-Time Scanning</h3>
                  <p className="text-muted-foreground leading-relaxed">Stream your camera feed directly into our AI engine. Get results in milliseconds with frame-by-frame analysis.</p>
                </div>
                <motion.div
                  className="h-40 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 dark:from-slate-900 dark:to-gray-800 flex items-center justify-center border border-border"
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <span className="text-muted-foreground font-medium">Live Stream Preview</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bento-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(1)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-black/10 dark:shadow-white/10"
                whileHover={{ scale: 1.15, rotate: -10 }}
              >
                <BarChart3 className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Detailed Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Comprehensive reports with confidence scores, risk levels, and medical recommendations.</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bento-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(2)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-black/10 dark:shadow-white/10"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <TrendingUp className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Health Tracking</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Monitor health trends over time with historical data and progress visualization.</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bento-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(3)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-black/10 dark:shadow-white/10"
                whileHover={{ scale: 1.15, rotate: -10 }}
              >
                <Users className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Specialist Network</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Connect with dermatologists and medical professionals near you instantly.</p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              className="bento-card"
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={() => setIsHovered(4)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-4 shadow-lg shadow-black/10 dark:shadow-white/10"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <Shield className="w-6 h-6 text-white dark:text-black" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Enterprise Security</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Bank-level encryption and HIPAA compliance for patient data safety.</p>
            </motion.div>
          </motion.div>
        </section>

        {/* Accuracy Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-border">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              className="glass-premium rounded-3xl p-12 min-h-96 flex items-center justify-center relative overflow-hidden border-border"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/15 to-gray-400/15 opacity-50" />
              <motion.div
                className="text-center relative z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="text-7xl font-bold text-gradient-monochrome mb-4"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  92%
                </motion.div>
                <p className="text-lg text-muted-foreground">Accuracy Rate on Clinical Datasets</p>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-8" variants={itemVariants}>
              <h2 className="text-5xl lg:text-6xl font-bold text-balance tracking-tight text-foreground">
                Medical-Grade{' '}
                <span className="text-gradient-monochrome inline-block">
                  Accuracy
                </span>
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our deep learning model has been trained on over 100,000 medical images and achieves 92% accuracy on independent test datasets—comparable to expert dermatologists.
              </p>

              <motion.div className="space-y-6">
                {[
                  { label: 'Melanoma Detection', value: 94 },
                  { label: 'Benign Lesion Classification', value: 91 },
                  { label: 'Early Stage Recognition', value: 89 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{item.label}</span>
                      <motion.span
                        className="text-sm font-semibold text-foreground"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {item.value}%
                      </motion.span>
                    </div>
                    <motion.div
                      className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-md"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="h-full bg-black dark:bg-white rounded-full shadow-lg shadow-black/40 dark:shadow-white/40"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{ duration: 1.5, delay: 0.2 + i * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Pricing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-border">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-balance tracking-tight text-foreground">
              Simple, Transparent{' '}
              <span className="text-gradient-monochrome inline-block">
                Pricing
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">Choose the plan that fits your needs. All plans include 24/7 support.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                name: 'Free',
                price: '$0',
                period: '/month',
                description: 'Perfect for getting started',
                features: [
                  '5 scans per day',
                  'Basic health reports',
                  'Mobile app access',
                  'Email support',
                ],
                cta: 'Get Started',
                highlighted: false,
              },
              {
                name: 'Pro',
                price: '$29',
                period: '/month',
                description: 'For regular monitoring',
                features: [
                  'Unlimited scans',
                  'Advanced analytics',
                  'Health history tracking',
                  'Specialist referrals',
                  'PDF reports',
                  'Priority support',
                ],
                cta: 'Start Free Trial',
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                description: 'For medical organizations',
                features: [
                  'Multi-user accounts',
                  'API access',
                  'Custom integrations',
                  'Dedicated support',
                  'Advanced security',
                  'SLA guarantee',
                ],
                cta: 'Contact Sales',
                highlighted: false,
              },
            ].map((plan, i) => (
              <motion.div
                key={i}
                className={`rounded-3xl p-8 transition-all duration-300 relative group overflow-hidden ${plan.highlighted
                  ? 'glass-premium border-2 border-black dark:border-white scale-105 shadow-2xl shadow-black/20 dark:shadow-white/20'
                  : 'bento-card'
                  }`}
              >
                {plan.highlighted && (
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black to-slate-800 dark:from-white dark:to-slate-200"
                    layoutId="active-plan"
                    transition={{ duration: 0.3 }}
                  />
                )}

                {plan.highlighted && (
                  <motion.div
                    className="inline-block px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-xs font-semibold text-foreground mb-4"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Most Popular
                  </motion.div>
                )}

                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

                <motion.div
                  className="mb-8"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-5xl font-bold text-gradient-monochrome">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-lg">{plan.period}</span>}
                </motion.div>

                <motion.button
                  className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-8 ${plan.highlighted
                    ? 'btn-primary shadow-lg shadow-black/30 dark:shadow-white/20'
                    : 'btn-secondary'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.button>

                <motion.div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <motion.div
                      key={j}
                      className="flex items-center gap-3 text-sm group/item"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: j * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="w-5 h-5 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-black/10 dark:shadow-white/10"
                        whileHover={{ scale: 1.2 }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-white dark:text-black" />
                      </motion.div>
                      <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-border">
          <motion.div
            className="glass-premium rounded-3xl p-16 text-center space-y-8 relative overflow-hidden group border-border"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-400/10 to-gray-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.h2
              className="text-5xl lg:text-6xl font-bold text-balance tracking-tight relative z-10 text-foreground"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              Ready to take control of your health?
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              Join thousands of users who are detecting diseases early with VitalGuard AI. Get your first scan today—completely free.
            </motion.p>

            <motion.div
              className="relative z-10 flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="btn-primary inline-flex items-center gap-2 group shadow-lg shadow-black/30 dark:shadow-white/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-4 h-4" />
                Start Your Free Scan
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="border-t border-border mt-24 py-16 bg-gradient-to-b from-slate-50/50 to-white dark:from-black dark:to-neutral-900"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <motion.div
                  className="flex items-center gap-2 mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="p-2.5 rounded-lg bg-black dark:bg-white shadow-lg shadow-black/10 dark:shadow-white/10"
                    whileHover={{ rotate: 10 }}
                  >
                    <Heart className="w-4 h-4 text-white dark:text-black" fill="currentColor" />
                  </motion.div>
                  <h1 className="font-bold text-lg text-gradient-monochrome">VitalGuard AI</h1>
                </motion.div>
                <p className="text-muted-foreground text-sm leading-relaxed">Early disease detection powered by AI.</p>
              </motion.div>

              {[
                {
                  title: 'Product',
                  links: ['Features', 'Pricing', 'Security', 'Blog'],
                },
                {
                  title: 'Company',
                  links: ['About', 'Careers', 'Contact', 'Press'],
                },
                {
                  title: 'Legal',
                  links: ['Privacy', 'Terms', 'HIPAA', 'Compliance'],
                },
              ].map((section, i) => (
                <motion.div key={i} variants={itemVariants}>
                  <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, j) => (
                      <motion.li key={j} whileHover={{ x: 5 }}>
                        <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between text-muted-foreground text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p>&copy; 2024 VitalGuard AI. All rights reserved.</p>
              <motion.div
                className="flex gap-6 mt-4 sm:mt-0"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {['Twitter', 'LinkedIn', 'GitHub'].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="hover:text-primary transition-colors group flex items-center gap-1"
                    whileHover={{ scale: 1.1 }}
                    variants={itemVariants}
                  >
                    {social}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}

export default Home
