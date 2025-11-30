// src/app/quests/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wind, Sparkles, Shield, Star, Zap, Flower2, TrendingUp } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { BreathingGame } from '@/components/teen-module/quests/BreathingGame';
import { GratitudeJournal } from '@/components/teen-module/quests/GratitudeJournal';
import { WorryDragon } from '@/components/teen-module/quests/WorryDragon';
import { MindfulnessMoment } from '@/components/teen-module/quests/MindfulnessMoment';
import { SparkleCheck } from '@/components/teen-module/assessments/SparkleCheck';
import { EnergyMeter } from '@/components/teen-module/assessments/EnergyMeter';
import { MoodPatterns } from '@/components/teen-module/assessments/MoodPatterns';

import { useGameStore } from '@/lib/teen-module/store';

type ActivityType =
    | 'breathing'
    | 'gratitude'
    | 'worry'
    | 'mindfulness'
    | 'sparkle'
    | 'energy'
    | 'mood'
    | null;

export default function QuestsPage() {
    const [activeActivity, setActiveActivity] = useState<ActivityType>(null);
    const [showReward, setShowReward] = useState(false);
    const [earnedXP, setEarnedXP] = useState(0);
    const [lastScore, setLastScore] = useState<number | null>(null);
    const [lastAssessment, setLastAssessment] = useState<string>('');
    const [recommendation, setRecommendation] = useState<string>('');

    const {
        pet,
        updatePetStats,
        addXP,
        incrementQuestsCompleted,
        incrementAssessmentsCompleted,
        journalEntries,
    } = useGameStore();

    const handleQuestComplete = () => {
        const xpReward = 30;
        setEarnedXP(xpReward);
        updatePetStats({
            happiness: Math.min(100, pet.happiness + 15),
            health: Math.min(100, pet.health + 10),
            evolutionPoints: pet.evolutionPoints + 20,
        });
        addXP(xpReward);
        incrementQuestsCompleted();
        setShowReward(true);
        setTimeout(() => {
            setShowReward(false);
            setActiveActivity(null);
        }, 3000);
    };

    const handleAssessmentComplete = (score: number) => {
        const assessment = activeActivity;
        setLastScore(score);
        setLastAssessment(assessment ?? '');
        let rec = '';
        if (assessment === 'sparkle') {
            // PHQ-9 threshold
            if (score >= 15) rec = 'Your PHQ‑9 score suggests moderate to severe depression. Consider seeking professional help.';
        } else if (assessment === 'energy') {
            // GAD-7 threshold
            if (score >= 10) rec = 'Your GAD‑7 score indicates significant anxiety. A medical assessment is recommended.';
        } else if (assessment === 'mood') {
            // BSDS threshold
            if (score >= 14) rec = 'Your BSDS score is elevated. You may benefit from a clinical follow‑up.';
        }
        setRecommendation(rec);

        const xpReward = 50;
        setEarnedXP(xpReward);
        updatePetStats({
            happiness: Math.min(100, pet.happiness + 10),
            evolutionPoints: pet.evolutionPoints + 30,
        });
        addXP(xpReward);
        incrementAssessmentsCompleted();
        setShowReward(true);
        setTimeout(() => {
            setShowReward(false);
            setActiveActivity(null);
            setLastScore(null);
            setLastAssessment('');
            setRecommendation('');
        }, 3000);
    };

    const activities = [
        {
            id: 'breathing' as const,
            title: 'Box Breathing',
            description: 'Calm your mind with guided breathing',
            icon: Wind,
            color: 'from-blue-400 to-purple-400',
            xp: 30,
            category: 'Quest',
        },
        {
            id: 'gratitude' as const,
            title: 'Gratitude Journal',
            description: 'Reflect on the good things in your life',
            icon: Sparkles,
            color: 'from-pink-400 to-yellow-400',
            xp: 30,
            category: 'Quest',
        },
        {
            id: 'worry' as const,
            title: 'Defeat the Worry Dragon',
            description: 'Challenge negative thoughts',
            icon: Shield,
            color: 'from-purple-400 to-indigo-400',
            xp: 30,
            category: 'Quest',
        },
        {
            id: 'mindfulness' as const,
            title: 'Mindfulness Moment',
            description: 'A peaceful journey through your senses',
            icon: Flower2,
            color: 'from-indigo-400 to-purple-400',
            xp: 30,
            category: 'Quest',
        },
        {
            id: 'sparkle' as const,
            title: 'Sparkle Check',
            description: 'How bright are you feeling?',
            icon: Star,
            color: 'from-yellow-400 to-orange-400',
            xp: 50,
            category: 'Check-In',
        },
        {
            id: 'energy' as const,
            title: 'Energy Meter',
            description: 'How calm is your energy?',
            icon: Zap,
            color: 'from-green-400 to-blue-400',
            xp: 50,
            category: 'Check-In',
        },
        {
            id: 'mood' as const,
            title: 'Mood Patterns',
            description: 'Understanding your mood shifts',
            icon: TrendingUp,
            color: 'from-purple-400 to-pink-400',
            xp: 50,
            category: 'Check-In',
        },
    ];

    if (showReward) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex items-center justify-center p-6">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    <Card className="p-12 bg-white/90 backdrop-blur-lg border-none shadow-2xl text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-8xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-slate-700 mb-4">Amazing Work!</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600">
                                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                                +{earnedXP} XP
                            </div>
                            {lastScore !== null && (
                                <p className="text-lg text-slate-700">
                                    {lastAssessment === 'sparkle' && `PHQ‑9 Score: ${lastScore}`}
                                    {lastAssessment === 'energy' && `GAD‑7 Score: ${lastScore}`}
                                    {lastAssessment === 'mood' && `BSDS Score: ${lastScore}`}
                                </p>
                            )}
                            {recommendation && (
                                <p className="text-sm text-red-600 font-medium mt-2">{recommendation}</p>
                            )}
                            <p className="text-lg text-slate-600">Your Bloom is growing stronger!</p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    if (activeActivity) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 p-6">
                <div className="max-w-2xl mx-auto">
                    <Button variant="ghost" onClick={() => setActiveActivity(null)} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Activities
                    </Button>
                    {activeActivity === 'breathing' && <BreathingGame onComplete={handleQuestComplete} />}
                    {activeActivity === 'gratitude' && <GratitudeJournal onComplete={handleQuestComplete} />}
                    {activeActivity === 'worry' && <WorryDragon onComplete={handleQuestComplete} />}
                    {activeActivity === 'mindfulness' && <MindfulnessMoment onComplete={handleQuestComplete} />}
                    {activeActivity === 'sparkle' && <SparkleCheck onComplete={handleAssessmentComplete} />}
                    {activeActivity === 'energy' && <EnergyMeter onComplete={handleAssessmentComplete} />}
                    {activeActivity === 'mood' && <MoodPatterns onComplete={handleAssessmentComplete} />}
                </div>
            </div>
        );
    }

    const renderJournalEntries = () => {
        if (journalEntries.length === 0) return null;
        return (
            <Card className="mt-8 p-6 bg-gradient-to-br from-pink-50 to-purple-50 border-none shadow-xl">
                <h2 className="text-2xl font-bold text-slate-700 mb-4">Your Gratitude Journal</h2>
                <ul className="list-disc list-inside space-y-2 text-slate-800">
                    {journalEntries.map((entry, idx) => (
                        <li key={idx}>{entry}</li>
                    ))}
                </ul>
            </Card>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-700">Activities</h1>
                    <Link href="/teen-space">
                        <Button variant="ghost">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Sanctuary
                        </Button>
                    </Link>
                </div>

                {/* Quests Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        Quests
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activities
                            .filter((a) => a.category === 'Quest')
                            .map((activity) => {
                                const Icon = activity.icon;
                                return (
                                    <Card
                                        key={activity.id}
                                        className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                                        onClick={() => setActiveActivity(activity.id)}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className={`p-4 rounded-full bg-gradient-to-br ${activity.color}`}>
                                                <Icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700">{activity.title}</h3>
                                            <p className="text-sm text-slate-600">{activity.description}</p>
                                            <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <Star className="h-4 w-4 fill-yellow-400" />
                                                {activity.xp} XP
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                                                Start Quest
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })}
                    </div>
                </div>

                {/* Check-Ins Section */}
                <div>
                    <h2 className="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        Daily Check-Ins
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {activities
                            .filter((a) => a.category === 'Check-In')
                            .map((activity) => {
                                const Icon = activity.icon;
                                return (
                                    <Card
                                        key={activity.id}
                                        className="p-6 bg-white/80 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
                                        onClick={() => setActiveActivity(activity.id)}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-4">
                                            <div className={`p-4 rounded-full bg-gradient-to-br ${activity.color}`}>
                                                <Icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700">{activity.title}</h3>
                                            <p className="text-sm text-slate-600">{activity.description}</p>
                                            <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <Star className="h-4 w-4 fill-yellow-400" />
                                                {activity.xp} XP
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                                                Start Check-In
                                            </Button>
                                        </div>
                                    </Card>
                                );
                            })}
                    </div>
                </div>

                {/* Render saved journal entries when not in an activity */}
                {renderJournalEntries()}
            </div>
        </div>
    );
}
