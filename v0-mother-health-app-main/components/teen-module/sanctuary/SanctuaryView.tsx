'use client'

import { BloomPet } from './BloomPet'
import { InteractionMenu } from './InteractionMenu'
import { LevelDisplay } from './LevelDisplay'
import { useGameStore } from '@/lib/teen-module/store'
import Link from 'next/link'
import { Sparkles, TrendingUp, Target } from 'lucide-react'
import { motion } from 'framer-motion'

export function SanctuaryView() {
  const { pet } = useGameStore();

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Espace Ado
            </span>
            <Sparkles className="w-8 h-8 text-purple-400" />
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Ton sanctuaire personnel de bien-être</p>
        </div>
        <LevelDisplay />
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pet Display */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card border-none p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50" />
          <div className="relative z-10 flex flex-col items-center">
            <BloomPet />
            <Link href="/teen-space/stats" className="mt-6">
              <div className="glass px-6 py-3 rounded-full text-sm font-medium text-slate-700 hover:bg-white/60 transition-all cursor-pointer flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                {pet.name} - Niveau {pet.level}
              </div>
            </Link>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <Link href="/teen-space/quests">
            <div className="glass-card border-none p-6 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-purple-600 transition-colors">Quêtes</h3>
                  <p className="text-sm text-slate-500">Explore tes activités</p>
                </div>
              </div>
              <p className="text-xs text-slate-400">Commence une nouvelle aventure →</p>
            </div>
          </Link>

          <Link href="/teen-space/stats">
            <div className="glass-card border-none p-6 hover:shadow-xl transition-all cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">Statistiques</h3>
                  <p className="text-sm text-slate-500">Vois ta progression</p>
                </div>
              </div>
              <p className="text-xs text-slate-400">Consulte tes stats →</p>
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Interaction Menu */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <InteractionMenu />
      </motion.div>
    </div>
  );
}
