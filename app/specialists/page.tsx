'use client'

import { useState, type FC } from 'react'
import { Heart, MapPin, Star, Phone, MessageSquare, Search, Filter, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'

interface Specialist {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  distance: string
  location: string
  phone: string
  image: string
  availability: string
  experience: string
}

const specialistsData: Specialist[] = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 128,
    distance: '0.8 km',
    location: '123 Medical Center, NY',
    phone: '+1 (555) 123-4567',
    image: 'https://images.unsplash.com/photo-1594824476967-48c687c083bb?w=500&h=500&fit=crop',
    availability: 'Available Today',
    experience: '12 years',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Oncology Specialist',
    rating: 4.8,
    reviews: 95,
    distance: '2.1 km',
    location: '456 Health Plaza, NY',
    phone: '+1 (555) 234-5678',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&h=500&fit=crop',
    availability: 'Available Tomorrow',
    experience: '15 years',
  },
  {
    id: 3,
    name: 'Dr. Emma Rodriguez',
    specialty: 'Dermatopathologist',
    rating: 4.7,
    reviews: 87,
    distance: '1.5 km',
    location: '789 Care Street, NY',
    phone: '+1 (555) 345-6789',
    image: 'https://images.unsplash.com/photo-1559839734033-6461acda27d8?w=500&h=500&fit=crop',
    availability: 'Available in 2 days',
    experience: '10 years',
  },
  {
    id: 4,
    name: 'Dr. James Williams',
    specialty: 'Dermatologist',
    rating: 4.6,
    reviews: 112,
    distance: '3.2 km',
    location: '321 Wellness Ave, NY',
    phone: '+1 (555) 456-7890',
    image: 'https://images.unsplash.com/photo-1612349317228-47fa60d8b8f5?w=500&h=500&fit=crop',
    availability: 'Available Today',
    experience: '18 years',
  },
]

const Specialists: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null)
  const specialists = specialistsData

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
              <h1 className="text-xl font-bold">Find a Specialist</h1>
            </div>
            <ModeToggle />
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Trusted Medical Professionals</h2>
            <p className="text-muted-foreground max-w-2xl">Connect with certified dermatologists and medical specialists. All verified and highly rated.</p>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary outline-none transition-colors text-foreground"
              />
            </div>
            <button className="px-4 py-3 rounded-lg bg-background hover:bg-muted transition-colors flex items-center justify-center gap-2 border border-border text-foreground">
              <Filter className="w-5 h-5" />
              Filter
            </button>
            <button className="px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" />
              Refer
            </button>
          </div>

          {/* Specialists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="glass rounded-2xl overflow-hidden border border-border hover:border-foreground/20 transition-all hover:shadow-lg group bg-card/30"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  <img
                    src={specialist.image || "/placeholder.svg"}
                    alt={specialist.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-white">{specialist.name}</h3>
                        <p className="text-gray-300 text-sm font-medium">{specialist.specialty}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-white">{specialist.rating}</span>
                        </div>
                        <p className="text-xs text-gray-400">{specialist.reviews} reviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Experience & Distance */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Experience</p>
                      <p className="font-semibold text-foreground">{specialist.experience}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background border border-border">
                      <p className="text-xs text-muted-foreground mb-1">Distance</p>
                      <p className="font-semibold text-foreground">{specialist.distance}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">{specialist.location}</p>
                  </div>

                  {/* Availability */}
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">{specialist.availability}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold text-sm flex items-center justify-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Book Appointment
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-secondary border border-border hover:bg-secondary/80 transition-colors flex items-center justify-center text-foreground">
                      <Phone className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 glass rounded-2xl p-12 text-center border border-border bg-card/30">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">Need urgent consultation?</h3>
            <p className="text-muted-foreground mb-8">Get a video consultation with a specialist within 24 hours.</p>
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all font-semibold">
              Schedule Video Call
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Specialists
