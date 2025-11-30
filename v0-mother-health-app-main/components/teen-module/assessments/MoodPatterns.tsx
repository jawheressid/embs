'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

const STATEMENTS = [
    'Some individuals noticed that their mood and/or energy levels shift drastically from time to time',
    'These individuals notice that, at times, they are moody and/or energy level is very low, and at other times, very high',
    'During their "low" phases, these individuals often feel a lack of energy, a need to stay in bed or get extra sleep, and little or no motivation to do things they need to do',
    'They often put on weight during these periods',
    'During their low phases, these individuals often feel "blue," sad all the time, or depressed',
    'Sometimes, during the low phases, they feel helpless or even suicidal',
    'Their ability to function at work or socially is impaired',
    'Typically, the low phases last for a few weeks, but sometimes they last only a few days',
    'Individuals with this type of pattern may experience a period of "normal" mood in between mood swings, during which their mood and energy level feels "right" and their ability to function is not disturbed',
    'They may then notice a marked shift or "switch" in the way they feel',
    'Their energy increases above what is normal for them, and they often get many things done they would not ordinarily be able to do',
    'Sometimes during those "high" periods, these individuals feel as if they had too much energy or feel "hyper"',
    'Some individuals, during these high periods, may feel irritable, "on edge," or aggressive',
    'Some individuals, during the high periods, take on too many activities at once',
    'During the high periods, some individuals may spend money in ways that cause them trouble',
    'They may be more talkative, outgoing or sexual during these periods',
    'Sometimes, their behavior during the high periods seems strange or annoying to others',
    'Sometimes, these individuals get into difficulty with co-workers or police during these high periods',
    'Sometimes, they increase their alcohol or nonprescription drug use during the high periods',
]

const FIT_OPTIONS = [
    { value: 6, label: 'This story fits me very well, or almost perfectly' },
    { value: 4, label: 'This story fits me fairly well' },
    { value: 2, label: 'This story fits me to some degree, but not in most respects' },
    { value: 0, label: "This story doesn't really describe me at all" },
]

export function MoodPatterns({ onComplete }: { onComplete: (score: number) => void }) {
    const [checkedItems, setCheckedItems] = useState<boolean[]>(Array(19).fill(false))
    const [fitValue, setFitValue] = useState(0)
    const [showFitQuestion, setShowFitQuestion] = useState(false)

    const handleToggle = (index: number) => {
        const newChecked = [...checkedItems]
        newChecked[index] = !newChecked[index]
        setCheckedItems(newChecked)
    }

    const handleContinue = () => {
        setShowFitQuestion(true)
    }

    const handleComplete = () => {
        const itemCount = checkedItems.filter(Boolean).length
        const totalScore = itemCount + fitValue
        onComplete(totalScore)
    }

    const checkedCount = checkedItems.filter(Boolean).length

    if (showFitQuestion) {
        return (
            <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-xl">
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-purple-500" />
                        <h2 className="text-2xl font-bold text-slate-700">Mood Patterns (BSDS)</h2>
                    </div>

                    <p className="text-lg font-medium text-slate-700">
                        After reading the story above, choose how well it fits you:
                    </p>

                    <div className="space-y-3">
                        {FIT_OPTIONS.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => setFitValue(option.value)}
                                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${fitValue === option.value
                                        ? 'border-purple-500 bg-purple-100'
                                        : 'border-gray-200 bg-white hover:border-purple-300'
                                    }`}
                            >
                                <span className="text-slate-700">{option.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowFitQuestion(false)}
                            className="flex-1"
                        >
                            Back to Story
                        </Button>
                        <Button
                            onClick={handleComplete}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        >
                            Complete
                        </Button>
                    </div>
                </div>
            </Card>
        )
    }

    return (
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none shadow-xl">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-purple-500" />
                        <h2 className="text-2xl font-bold text-slate-700">Mood Patterns (BSDS)</h2>
                    </div>
                    <span className="text-sm text-slate-600">{checkedCount} / 19 checked</span>
                </div>

                <p className="text-sm text-slate-600 italic">
                    Read the following story and check the statements that apply to you:
                </p>

                <div className="max-h-96 overflow-y-auto border border-purple-100 rounded-lg p-4 bg-white/50 space-y-3">
                    {STATEMENTS.map((statement, index) => (
                        <motion.label
                            key={index}
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 cursor-pointer transition-colors"
                            whileHover={{ scale: 1.01 }}
                        >
                            <input
                                type="checkbox"
                                checked={checkedItems[index]}
                                onChange={() => handleToggle(index)}
                                className="mt-1 h-5 w-5 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-slate-700 leading-relaxed">
                                {index + 1}. {statement}
                            </span>
                        </motion.label>
                    ))}
                </div>

                <Button
                    onClick={handleContinue}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3"
                >
                    Continue to Next Question
                </Button>
            </div>
        </Card>
    )
}
