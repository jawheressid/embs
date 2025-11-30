'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Flower2 } from 'lucide-react'

const PHASES = [
    { text: 'Close your eyes and take a deep breath...', duration: 5000, emoji: '🌸' },
    { text: 'Notice the sounds around you...', duration: 5000, emoji: '👂' },
    { text: 'Feel your body relaxing...', duration: 5000, emoji: '🧘' },
    { text: 'Let your thoughts float by like clouds...', duration: 5000, emoji: '☁️' },
    { text: 'Bring your attention to your breath...', duration: 5000, emoji: '💨' },
    { text: 'Feel peaceful and present...', duration: 5000, emoji: '✨' },
]

export function MindfulnessMoment({ onComplete }: { onComplete: () => void }) {
    const [isActive, setIsActive] = useState(false)
    const [currentPhase, setCurrentPhase] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!isActive) return

        const phase = PHASES[currentPhase]
        const startTime = Date.now()

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime
            const phaseProgress = (elapsed / phase.duration) * 100

            if (phaseProgress >= 100) {
                if (currentPhase < PHASES.length - 1) {
                    setCurrentPhase(currentPhase + 1)
                    setProgress(0)
                } else {
                    setIsActive(false)
                    onComplete()
                }
            } else {
                setProgress(phaseProgress)
            }
        }, 50)

        return () => clearInterval(interval)
    }, [isActive, currentPhase, onComplete])

    const handleStart = () => {
        setIsActive(true)
        setCurrentPhase(0)
        setProgress(0)
    }

    const currentPhaseData = PHASES[currentPhase]
    const overallProgress = ((currentPhase + progress / 100) / PHASES.length) * 100

    return (
        <Card className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border-none shadow-xl">
            <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-2">
                    <Flower2 className="h-6 w-6 text-purple-500" />
                    <h2 className="text-2xl font-bold text-slate-700">Mindfulness Moment</h2>
                </div>

                {!isActive && currentPhase === 0 ? (
                    <div className="text-center space-y-6 py-8">
                        <div className="text-6xl">🧘</div>
                        <p className="text-lg text-slate-600 max-w-md">
                            Take a peaceful journey through your senses. Find a quiet spot and let&apos;s begin.
                        </p>
                        <Button
                            onClick={handleStart}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg"
                        >
                            Begin Journey
                        </Button>
                    </div>
                ) : (
                    <div className="w-full space-y-8">
                        {/* Overall Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-slate-600">
                                <span>Journey Progress</span>
                                <span>{currentPhase + 1} / {PHASES.length}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                    className="bg-gradient-to-r from-indigo-400 to-purple-400 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${overallProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>

                        {/* Current Phase */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPhase}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5 }}
                                className="text-center py-12 space-y-6"
                            >
                                <motion.div
                                    className="text-8xl"
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    {currentPhaseData.emoji}
                                </motion.div>

                                <p className="text-2xl font-medium text-slate-700 max-w-lg mx-auto">
                                    {currentPhaseData.text}
                                </p>

                                {/* Floating clouds */}
                                <div className="relative h-20">
                                    <motion.div
                                        className="absolute left-1/4"
                                        animate={{
                                            x: [0, 20, 0],
                                            y: [0, -10, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <Cloud className="h-8 w-8 text-indigo-200" />
                                    </motion.div>
                                    <motion.div
                                        className="absolute right-1/4"
                                        animate={{
                                            x: [0, -20, 0],
                                            y: [0, -15, 0],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                            delay: 1,
                                        }}
                                    >
                                        <Cloud className="h-6 w-6 text-purple-200" />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Phase Progress */}
                        <div className="w-full bg-gray-200 rounded-full h-1">
                            <motion.div
                                className="bg-indigo-300 h-1 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {!isActive && currentPhase > 0 && (
                    <div className="text-center space-y-4 py-8">
                        <div className="text-6xl">🌟</div>
                        <p className="text-xl font-semibold text-green-600">Journey Complete!</p>
                        <p className="text-slate-600">You&apos;ve taken a moment to be present.</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
