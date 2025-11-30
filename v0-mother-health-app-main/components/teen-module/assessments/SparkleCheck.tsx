'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Sparkles, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const QUESTIONS = [
    { id: 1, text: 'Little interest or pleasure in doing things' },
    { id: 2, text: 'Feeling down, depressed, or hopeless' },
    { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much' },
    { id: 4, text: 'Feeling tired or having little energy' },
    { id: 5, text: 'Poor appetite or overeating' },
    { id: 6, text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down' },
    { id: 7, text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
    { id: 8, text: 'Moving or speaking so slowly that other people could have noticed; or the opposite — being so fidgety or restless that you have been moving a lot more than usual' },
    { id: 9, text: 'Thoughts that you would be better off dead, or of hurting yourself in some way' },
]

const OPTIONS = [
    { value: 0, label: 'Not at all', color: 'from-green-400 to-teal-400' },
    { value: 1, label: 'Several days', color: 'from-yellow-400 to-amber-400' },
    { value: 2, label: 'More than half the days', color: 'from-orange-400 to-red-400' },
    { value: 3, label: 'Nearly every day', color: 'from-red-500 to-pink-500' },
]

export function SparkleCheck({ onComplete }: { onComplete: (score: number) => void }) {
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState<number[]>(Array(9).fill(-1))

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers]
        newAnswers[currentQ] = value
        setAnswers(newAnswers)

        if (currentQ < 8) {
            setTimeout(() => setCurrentQ(currentQ + 1), 300)
        } else {
            // Calculate PHQ-9 score
            const totalScore = newAnswers.reduce((sum, val) => sum + val, 0)
            setTimeout(() => onComplete(totalScore), 500)
        }
    }

    const question = QUESTIONS[currentQ]
    const progress = ((currentQ + 1) / 9) * 100

    return (
        <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-none shadow-xl">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Sparkles className="h-6 w-6 text-yellow-500" />
                        <h2 className="text-2xl font-bold text-slate-700">Sparkle Check (PHQ-9)</h2>
                    </div>
                    <span className="text-sm text-slate-600">{currentQ + 1} / 9</span>
                </div>

                <p className="text-sm text-slate-600 italic">Over the last 2 weeks, how often have you been bothered by the following?</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
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

                {/* Star indicators */}
                <div className="flex justify-center gap-2">
                    {QUESTIONS.map((_, idx) => (
                        <Star
                            key={idx}
                            className={`h-4 w-4 ${idx < currentQ
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : idx === currentQ
                                        ? 'fill-yellow-200 text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </Card>
    )
}
