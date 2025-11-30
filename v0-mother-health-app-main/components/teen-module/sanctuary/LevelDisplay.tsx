'use client'

import { useGameStore, getXPForLevel } from '@/lib/teen-module/store'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { UserAvatar } from './UserAvatar'

export function LevelDisplay() {
    const { pet } = useGameStore()
    const xpNeeded = getXPForLevel(pet.level)
    const progress = (pet.xp / xpNeeded) * 100

    return (
        <div className="bg-white/30 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3">
            {/* Avatar */}
            <UserAvatar size="md" />

            {/* Level and XP Info */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-slate-700">Lvl {pet.level}</span>
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-slate-700">{pet.evolutionPoints}</span>
                    </div>
                </div>

                <div className="min-w-[140px]">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-600">XP</span>
                        <span className="text-xs font-semibold text-slate-700">
                            {pet.xp} / {xpNeeded}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
