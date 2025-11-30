'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Trophy, Star, Heart, Target } from 'lucide-react'
import Link from 'next/link'
import { useGameStore, getXPForLevel } from '@/lib/teen-module/store'
import { UserAvatar } from '@/components/teen-module/sanctuary/UserAvatar'

export default function StatsPage() {
    const { pet, questsCompleted, assessmentsCompleted } = useGameStore()
    const xpNeeded = getXPForLevel(pet.level)
    const xpProgress = (pet.xp / xpNeeded) * 100

    const stats = [
        { label: 'Health', value: pet.health, max: 100, icon: Heart, color: 'text-red-500' },
        { label: 'Happiness', value: pet.happiness, max: 100, icon: Star, color: 'text-yellow-500' },
    ]

    const milestones = [
        { level: 3, title: 'Baby Bloom', description: 'Your Bloom hatched!', achieved: pet.level >= 3 },
        { level: 7, title: 'Growing Strong', description: 'Your Bloom became a child!', achieved: pet.level >= 7 },
        { level: 12, title: 'Fully Grown', description: 'Your Bloom is an adult!', achieved: pet.level >= 12 },
        { level: 20, title: 'Master Gardener', description: 'You are a true companion!', achieved: pet.level >= 20 },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-700">Your Progress</h1>
                    <Link href="/teen-space">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                </div>

                {/* Level Card */}
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-none shadow-xl mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <UserAvatar size="lg" />
                            <div>
                                <h2 className="text-3xl font-bold text-slate-700">Level {pet.level}</h2>
                                <p className="text-sm text-slate-600">{pet.name} the {pet.stage}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-purple-600">{pet.evolutionPoints}</div>
                            <div className="text-xs text-slate-600">Evolution Points</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-600">XP Progress</span>
                            <span className="font-semibold text-slate-700">{pet.xp} / {xpNeeded}</span>
                        </div>
                        <Progress value={xpProgress} className="h-3" />
                        <p className="text-xs text-slate-500 text-center">
                            {xpNeeded - pet.xp} XP until level {pet.level + 1}
                        </p>
                    </div>
                </Card>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.label} className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                    <h3 className="text-lg font-semibold text-slate-700">{stat.label}</h3>
                                </div>
                                <div className="space-y-2">
                                    <Progress value={(stat.value / stat.max) * 100} className="h-2" />
                                    <p className="text-sm text-slate-600 text-right">{stat.value} / {stat.max}</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>

                {/* Activity Stats */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg mb-6">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        Activity Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-3xl font-bold text-purple-600">{questsCompleted}</div>
                            <div className="text-sm text-slate-600">Quests Completed</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-3xl font-bold text-yellow-600">{assessmentsCompleted}</div>
                            <div className="text-sm text-slate-600">Check-Ins Done</div>
                        </div>
                    </div>
                </Card>

                {/* Milestones */}
                <Card className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg">
                    <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Milestones
                    </h3>
                    <div className="space-y-3">
                        {milestones.map((milestone) => (
                            <div
                                key={milestone.level}
                                className={`p-4 rounded-lg border-2 ${milestone.achieved
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-gray-50 border-gray-200'
                                    }`}
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
                                        {milestone.achieved ? '✓' : `Lvl ${milestone.level}`}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    )
}
