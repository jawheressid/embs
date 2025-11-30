'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

const PHASES = ['Breathe In', 'Hold', 'Breathe Out', 'Hold']
const PHASE_DURATION = 4000 // 4 seconds per phase

export function BreathingGame({ onComplete }: { onComplete: () => void }) {
    const [isActive, setIsActive] = useState(false)
    const [currentPhase, setCurrentPhase] = useState(0)
    const [cycles, setCycles] = useState(0)

    useEffect(() => {
        if (!isActive) return

        const timer = setInterval(() => {
            setCurrentPhase((prev) => {
                const next = (prev + 1) % 4
                if (next === 0) {
                    setCycles((c) => c + 1)
                }
                return next
            })
        }, PHASE_DURATION)

        return () => clearInterval(timer)
    }, [isActive])

    useEffect(() => {
        if (cycles >= 3 && isActive) {
            setIsActive(false)
            onComplete()
        }
    }, [cycles, isActive, onComplete])

    const getCircleSize = () => {
        if (currentPhase === 0) return 200 // Breathe in - expand
        if (currentPhase === 1) return 200 // Hold - stay large
        if (currentPhase === 2) return 100 // Breathe out - shrink
        return 100 // Hold - stay small
    }

    return (
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-none shadow-xl">
            <div className="flex flex-col items-center space-y-8">
                <h2 className="text-2xl font-bold text-slate-700">Box Breathing</h2>
                <p className="text-sm text-slate-600">Complete 3 cycles to calm your mind</p>

                <div className="relative flex items-center justify-center h-80 w-full">
                    <motion.div
                        className="rounded-full bg-gradient-to-br from-blue-300 to-purple-300 shadow-2xl"
                        animate={{
                            width: getCircleSize(),
                            height: getCircleSize(),
                        }}
                        transition={{
                            duration: currentPhase % 2 === 0 ? 4 : 0,
                            ease: 'easeInOut',
                        }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-xl font-semibold text-white drop-shadow-lg">
                            {isActive ? PHASES[currentPhase] : 'Ready?'}
                        </p>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-slate-600">Cycles: {cycles} / 3</p>
                </div>

                {!isActive && cycles === 0 && (
                    <Button
                        onClick={() => setIsActive(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg"
                    >
                        Start Breathing
                    </Button>
                )}

                {cycles >= 3 && (
                    <div className="text-center space-y-2">
                        <p className="text-lg font-semibold text-green-600">✨ Great job! ✨</p>
                        <p className="text-sm text-slate-600">You've completed the breathing exercise</p>
                    </div>
                )}
            </div>
        </Card>
    )
}
