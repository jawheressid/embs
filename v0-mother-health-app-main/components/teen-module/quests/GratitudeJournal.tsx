'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';
import { useGameStore } from '@/lib/teen-module/store';

export function GratitudeJournal({ onComplete }: { onComplete: () => void }) {
    const prompts = [
        'What made you smile today?',
        'Who are you thankful for?',
        "What's something you're looking forward to?",
    ] as const;

    const [entries, setEntries] = useState<string[]>(['', '', '']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showEncouragement, setShowEncouragement] = useState(false);
    const [encouragement, setEncouragement] = useState('');

    const store = useGameStore();

    const handleChange = (value: string) => {
        const newEntries = [...entries];
        newEntries[currentIndex] = value;
        setEntries(newEntries);
    };

    const encouragements = [
        'Great job! Your gratitude shines bright.',
        "You're cultivating a positive mindset!",
        'Keep the good vibes flowing!',
    ];

    const handleNext = () => {
        // Save current entry
        store.addJournalEntry(entries[currentIndex]);

        if (currentIndex < prompts.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            const msg = encouragements[Math.floor(Math.random() * encouragements.length)];
            setEncouragement(msg);
            setShowEncouragement(true);
            setTimeout(() => {
                setShowEncouragement(false);
                onComplete();
            }, 2000);
        }
    };

    return (
        <Card className="p-8 bg-gradient-to-br from-pink-50 to-yellow-50 border-none shadow-xl">
            <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-yellow-500" />
                    <h2 className="text-2xl font-bold text-slate-700">Gratitude Journal</h2>
                </div>

                {showEncouragement && (
                    <div className="p-4 bg-green-100 text-green-800 rounded-md shadow-sm animate-bounce">
                        {encouragement}
                    </div>
                )}

                <div className="space-y-4">
                    <p className="text-lg font-medium text-slate-600">{prompts[currentIndex]}</p>
                    <Textarea
                        value={entries[currentIndex]}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="Write your thoughts here..."
                        className="min-h-32 bg-white/70 backdrop-blur-sm border-pink-200 focus:border-pink-400"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                        {prompts.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 w-2 rounded-full ${idx <= currentIndex ? 'bg-pink-400' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>
                    <Button
                        onClick={handleNext}
                        disabled={!entries[currentIndex].trim()}
                        className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white px-6 py-2 rounded-full"
                    >
                        {currentIndex < prompts.length - 1 ? 'Next' : 'Complete'}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
