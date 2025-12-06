'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Trophy, Star, Heart, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useGameStore, getXPForLevel } from '@/lib/teen-module/store'
import { UserAvatar } from '@/components/teen-module/sanctuary/UserAvatar'
import { motion } from 'framer-motion'

export default function StatsPage() {
    const { pet, questsCompleted, assessmentsCompleted } = useGameStore()
    const xpNeeded = getXPForLevel(pet.level)
    const xpProgress = (pet.xp / xpNeeded) * 100

    const stats = [
        { label: 'Santé', value: pet.health, max: 100, icon: Heart, color: 'text-red-500', bgColor: 'bg-red-50' },
        { label: 'Bonheur', value: pet.happiness, max: 100, icon: Star, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    ]

    const milestones = [
        { level: 3, title: 'Bébé Bloom', description: 'Ton Bloom a éclos !', achieved: pet.level >= 3 },
        { level: 7, title: 'Croissance', description: 'Ton Bloom est devenu un enfant !', achieved: pet.level >= 7 },
        { level: 12, title: 'Adulte', description: 'Ton Bloom est adulte !', achieved: pet.level >= 12 },
        { level: 20, title: 'Maître Jardinier', description: 'Tu es un vrai compagnon !', achieved: pet.level >= 20 },
    ]

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                            Ta Progression
                        </span>
                        <TrendingUp className="w-8 h-8 text-blue-500" />
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Suis ton évolution et tes réussites</p>
                </div>
                <Link href="/teen-space">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                    </Button>
                </Link>
            </motion.div>

            {/* Level Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="glass-card border-none p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <UserAvatar size="lg" />
                            <div>
                                <h2 className="text-3xl font-bold text-slate-700">Niveau {pet.level}</h2>
                                <p className="text-sm text-slate-600">{pet.name} le {pet.stage}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">{pet.evolutionPoints}</div>
                            <div className="text-xs text-slate-600">Points d'Évolution</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Progression XP</span>
                            <span className="font-semibold text-slate-700">{pet.xp} / {xpNeeded}</span>
                        </div>
                        <Progress value={xpProgress} className="h-3" />
                        <p className="text-xs text-slate-500 text-center">
                            {xpNeeded - pet.xp} XP jusqu'au niveau {pet.level + 1}
                        </p>
                    </div>
                </Card>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="glass-card border-none p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-700">{stat.label}</h3>
                                </div>
                                <div className="space-y-2">
                                    <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                                    <p className="text-sm text-slate-600 text-right">{stat.value} / {stat.max}</p>
                                </div>
                            </Card>
                        </motion.div>
                    )
                })}
            </div>

            {/* Activity Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="glass-card border-none p-6">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        Résumé d'Activité
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">{questsCompleted}</div>
                            <div className="text-sm text-slate-600">Quêtes Terminées</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-3xl font-bold text-yellow-600">{assessmentsCompleted}</div>
                            <div className="text-sm text-slate-600">Check-Ins Faits</div>
                        </div>
                    </div>
                </Card>
            </motion.div>

            {/* Milestones */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <Card className="glass-card border-none p-6">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Jalons
                    </h3>
                    <div className="space-y-3">
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.level}
                                className={`p-4 rounded-lg border-2 ${milestone.achieved ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className={`font-semibold ${milestone.achieved ? 'text-green-700' : 'text-slate-500'}`}>
                                            {milestone.title}
                                        </h4>
                                        <p className={`text-sm ${milestone.achieved ? 'text-green-600' : 'text-slate-400'}`}>
                                            {milestone.description}
                                        </p>
                                    </div>
                                    <div className={`text-sm font-bold ${milestone.achieved ? 'text-green-600' : 'text-slate-400'}`}>
                                        {milestone.achieved ? '✓' : `Niv ${milestone.level}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
