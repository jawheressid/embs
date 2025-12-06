"use client"

import { Card } from "@/components/ui/card"
import { Brain, Apple, MessageSquare, TrendingUp, ArrowRight, Sparkles, Activity, Heart } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const { user } = useAuth()
  
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bonjour"
    if (hour < 18) return "Bon après-midi"
    return "Bonsoir"
  }

  const services = [
    {
      icon: Brain,
      title: "Santé Mentale",
      description: "Chatbot IA et analyse des émotions",
      href: "/mental-health",
      color: "from-purple-500 to-indigo-500",
      shadow: "shadow-purple-200",
      delay: 0.1
    },
    {
      icon: Apple,
      title: "Nutrition",
      description: "Suivi alimentaire et recettes",
      href: "/nutrition",
      color: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-200",
      delay: 0.2
    },
    {
      icon: MessageSquare,
      title: "Messagerie",
      description: "Lien direct avec votre médecin",
      href: "/messaging",
      color: "from-blue-400 to-cyan-500",
      shadow: "shadow-blue-200",
      delay: 0.3
    },
    {
      icon: TrendingUp,
      title: "Rapports",
      description: "Suivi de progression détaillé",
      href: "/reports",
      color: "from-orange-400 to-rose-500",
      shadow: "shadow-orange-200",
      delay: 0.4
    },
  ]

  const quickStats = [
    { label: "Consultations", value: "12", icon: Activity, color: "text-purple-500" },
    { label: "Messages", value: "8", icon: MessageSquare, color: "text-blue-500" },
    { label: "Rapports", value: "5", icon: TrendingUp, color: "text-orange-500" },
  ]

  return (
    <div className="p-8 space-y-8">
      {/* Section de bienvenue redesignée */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden"
      >
        <Card className="glass-card border-none p-8 relative">
          {/* Formes décoratives subtiles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/40 to-pink-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium">{getGreeting()},</p>
                  <h1 className="text-3xl font-bold text-slate-800">{user?.name}</h1>
                </div>
              </div>
              <p className="text-slate-600 text-lg">Bienvenue sur votre tableau de bord Etma'En</p>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="hidden md:block"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-200 to-orange-200 flex items-center justify-center shadow-xl">
                <Sparkles className="w-12 h-12 text-yellow-600" />
              </div>
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Services Grid */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-500" />
          Nos Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: service.delay }}
                whileHover={{ y: -5 }}
              >
                <Link href={service.href}>
                  <Card className={`glass-card border-none p-6 cursor-pointer h-full hover:shadow-2xl transition-all ${service.shadow}`}>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-800 mb-1">{service.title}</h3>
                        <p className="text-sm text-slate-600">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mt-auto">
                        Accéder <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-500" />
          Aperçu Rapide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="glass-card border-none p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
