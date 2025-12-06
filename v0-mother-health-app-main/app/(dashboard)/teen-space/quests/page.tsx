'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Wind, Sparkles, Shield, Star, Zap, Flower2, TrendingUp, Target } from 'lucide-react';

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
            if (score >= 15) rec = 'Ton score PHQ-9 suggère une dépression modérée à sévère. Considère de consulter un professionnel.';
        } else if (assessment === 'energy') {
            if (score >= 10) rec = 'Ton score GAD-7 indique une anxiété significative. Une évaluation médicale est recommandée.';
        } else if (assessment === 'mood') {
            if (score >= 14) rec = 'Ton score BSDS est élevé. Tu pourrais bénéficier d\'un suivi clinique.';
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
            title: 'Respiration Carrée',
            description: 'Calme ton esprit avec une respiration guidée',
            icon: Wind,
            color: 'from-blue-400 to-purple-400',
            xp: 30,
            category: 'Quête',
        },
        {
            id: 'gratitude' as const,
            title: 'Journal de Gratitude',
            description: 'Réfléchis aux bonnes choses de ta vie',
            icon: Sparkles,
            color: 'from-pink-400 to-yellow-400',
            xp: 30,
            category: 'Quête',
        },
        {
            id: 'worry' as const,
            title: 'Vaincre le Dragon des Soucis',
            description: 'Défie les pensées négatives',
            icon: Shield,
            color: 'from-purple-400 to-indigo-400',
            xp: 30,
            category: 'Quête',
        },
        {
            id: 'mindfulness' as const,
            title: 'Moment de Pleine Conscience',
            description: 'Un voyage paisible à travers tes sens',
            icon: Flower2,
            color: 'from-indigo-400 to-purple-400',
            xp: 30,
            category: 'Quête',
        },
        {
            id: 'sparkle' as const,
            title: 'Check Étincelle',
            description: 'Comment te sens-tu aujourd\'hui ?',
            icon: Star,
            color: 'from-yellow-400 to-orange-400',
            xp: 50,
            category: 'Check-In',
        },
        {
            id: 'energy' as const,
            title: 'Jauge d\'Énergie',
            description: 'Quelle est ton énergie du moment ?',
            icon: Zap,
            color: 'from-green-400 to-blue-400',
            xp: 50,
            category: 'Check-In',
        },
        {
            id: 'mood' as const,
            title: 'Schémas d\'Humeur',
            description: 'Comprends tes changements d\'humeur',
            icon: TrendingUp,
            color: 'from-purple-400 to-pink-400',
            xp: 50,
            category: 'Check-In',
        },
    ];

    if (showReward) {
        return (
            <div className="min-h-screen p-8 flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                >
                    <Card className="glass-card border-none p-12 text-center max-w-md">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-8xl mb-6"
                        >
                            🎉
                        </motion.div>
                        <h2 className="text-3xl font-bold text-slate-700 mb-4">Excellent Travail !</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-yellow-600">
                                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                                +{earnedXP} XP
                            </div>
                            {lastScore !== null && (
                                <p className="text-lg text-slate-700">
                                    {lastAssessment === 'sparkle' && `Score PHQ-9 : ${lastScore}`}
                                    {lastAssessment === 'energy' && `Score GAD-7 : ${lastScore}`}
                                    {lastAssessment === 'mood' && `Score BSDS : ${lastScore}`}
                                </p>
                            )}
                            {recommendation && (
                                <p className="text-sm text-red-600 font-medium mt-2">{recommendation}</p>
                            )}
                            <p className="text-lg text-slate-600">Ton Bloom devient plus fort !</p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        );
    }

    if (activeActivity) {
        return (
            <div className="min-h-screen p-8">
                <div className="max-w-2xl mx-auto">
                    <Button variant="ghost" onClick={() => setActiveActivity(null)} className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour aux Activités
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
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <Card className="glass-card border-none p-6">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-pink-500" />
                        Ton Journal de Gratitude
                    </h2>
                    <ul className="space-y-2">
                        {journalEntries.map((entry, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                                <span className="text-pink-500">•</span>
                                {entry}
                            </li>
                        ))}
                    </ul>
                </Card>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                            Activités
                        </span>
                        <Target className="w-8 h-8 text-purple-500" />
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Explore tes quêtes et check-ins quotidiens</p>
                </div>
                <Link href="/teen-space">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Retour au Sanctuaire
                    </Button>
                </Link>
            </motion.div>

            {/* Quests Section */}
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 mb-6 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-purple-500" />
                    Quêtes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities
                        .filter((a) => a.category === 'Quête')
                        .map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card
                                        className="glass-card border-none p-6 cursor-pointer h-full flex flex-col"
                                        onClick={() => setActiveActivity(activity.id)}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-4 flex-1">
                                            <div className={`p-4 rounded-full bg-gradient-to-br ${activity.color} shadow-lg`}>
                                                <Icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700">{activity.title}</h3>
                                            <p className="text-sm text-slate-600 flex-1">{activity.description}</p>
                                            <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <Star className="h-4 w-4 fill-yellow-400" />
                                                {activity.xp} XP
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg">
                                                Commencer
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                </div>
            </div>

            {/* Check-Ins Section */}
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 mb-6 flex items-center gap-2">
                    <Star className="h-6 w-6 text-yellow-500" />
                    Check-Ins Quotidiens
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activities
                        .filter((a) => a.category === 'Check-In')
                        .map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card
                                        className="glass-card border-none p-6 cursor-pointer h-full flex flex-col"
                                        onClick={() => setActiveActivity(activity.id)}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-4 flex-1">
                                            <div className={`p-4 rounded-full bg-gradient-to-br ${activity.color} shadow-lg`}>
                                                <Icon className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-slate-700">{activity.title}</h3>
                                            <p className="text-sm text-slate-600 flex-1">{activity.description}</p>
                                            <div className="flex items-center gap-1 text-yellow-600 font-semibold">
                                                <Star className="h-4 w-4 fill-yellow-400" />
                                                {activity.xp} XP
                                            </div>
                                            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg">
                                                Commencer
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            );
                        })}
                </div>
            </div>

            {/* Journal Entries */}
            {renderJournalEntries()}
        </div>
    );
}
