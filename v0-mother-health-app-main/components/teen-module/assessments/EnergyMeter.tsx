'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const QUESTIONS = [
    { id: 1, text: 'Feeling nervous, anxious or on edge' },
    { id: 2, text: 'Not being able to stop or control worrying' },
    { id: 3, text: 'Worrying too much about different things' },
    { id: 4, text: 'Trouble relaxing' },
    { id: 5, text: "Being so restless it's hard to sit still" },
    { id: 6, text: 'Becoming easily annoyed or irritable' },
    { id: 7, text: 'Feeling afraid as if something awful might happen' },
]

const OPTIONS = [
    { value: 0, label: 'Not at all', color: 'from-green-400 to-emerald-400' },
    { value: 1, label: 'Several days', color: 'from-yellow-400 to-amber-400' },
    { value: 2, label: 'More than half the days', color: 'from-orange-400 to-red-400' },
    { value: 3, label: 'Nearly every day', color: 'from-red-500 to-pink-500' },
]

export function EnergyMeter({ onComplete }: { onComplete: (score: number) => void }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState<number[]>(Array(7).fill(-1))

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers]
        newAnswers[currentQ] = value
        setAnswers(newAnswers)

        if (currentQ < 6) {
            setTimeout(() => setCurrentQ(currentQ + 1), 300)
        } else {
            // Calculate GAD-7 score
            const totalScore = newAnswers.reduce((sum, val) => sum + val, 0)
            setTimeout(() => onComplete(totalScore), 500)
        }
    }

    const question = QUESTIONS[currentQ]
    const progress = ((currentQ + 1) / 7) * 100

    return (
        <Card className="p-8 bg-gradient-to-br from-green-50 to-blue-50 border-none shadow-xl">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Zap className="h-6 w-6 text-green-500" />
                        <h2 className="text-2xl font-bold text-slate-700">Energy Meter (GAD-7)</h2>
                    </div>
                    <span className="text-sm text-slate-600">{currentQ + 1} / 7</span>
                </div>

                <p className="text-sm text-slate-600 italic">Over the last 2 weeks, how often have you been bothered by the following?</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                >
                    <div className="py-4">
                        <p className="text-lg font-medium text-slate-700 leading-relaxed">{question.text}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {OPTIONS.map((option) => (
                            <Button
                                key={option.value}
                                onClick={() => handleAnswer(option.value)}
                                className={`h-16 bg-gradient-to-r ${option.color} hover:opacity-90 text-white font-semibold text-base transition-all hover:scale-105`}
                            >
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Progress dots */}
                <div className="flex justify-center gap-2">
                    {QUESTIONS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-2 w-2 rounded-full ${idx <= currentQ ? 'bg-green-400' : 'bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </Card>
    )
}
