'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

export function WorryDragon({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0)
    const [worry, setWorry] = useState('')
    const [evidence, setEvidence] = useState('')
    const [alternative, setAlternative] = useState('')

    const steps = [
        {
            title: 'Name Your Worry',
            description: 'What is the Worry Dragon telling you?',
            placeholder: "I'm worried that...",
            value: worry,
            onChange: setWorry,
        },
        {
            title: 'Challenge the Dragon',
            description: 'What evidence do you have that this worry is true?',
            placeholder: 'The evidence is...',
            value: evidence,
            onChange: setEvidence,
        },
        {
            title: 'Defeat the Dragon',
            description: "What's a more balanced way to think about this?",
            placeholder: 'A better thought is...',
            value: alternative,
            onChange: setAlternative,
        },
    ]

    const handleNext = () => {
        if (step < 2) {
            setStep(step + 1)
        } else {
            onComplete()
        }
    }

    const currentStep = steps[step]

    return (
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border-none shadow-xl">
            <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-bold text-slate-700">Defeat the Worry Dragon</h2>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-purple-700">{currentStep.title}</h3>
                            <span className="text-sm text-slate-500">Step {step + 1} of 3</span>
                        </div>

                        <p className="text-slate-600">{currentStep.description}</p>

                        <Input
                            value={currentStep.value}
                            onChange={(e) => currentStep.onChange(e.target.value)}
                            placeholder={currentStep.placeholder}
                            className="bg-white/70 backdrop-blur-sm border-purple-200 focus:border-purple-400"
                        />

                        {step === 2 && alternative && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="p-4 bg-green-100 rounded-lg border-2 border-green-300"
                            >
                                <p className="text-sm font-semibold text-green-700">
                                    🎉 You&apos;ve defeated the Worry Dragon!
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between items-center pt-4">
                    <div className="flex space-x-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 w-8 rounded-full ${idx <= step ? 'bg-purple-400' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleNext}
                        disabled={!currentStep.value.trim()}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-2 rounded-full"
                    >
                        {step < 2 ? 'Next' : 'Complete Quest'}
                    </Button>
                </div>
            </div>
        </Card>
    )
}
