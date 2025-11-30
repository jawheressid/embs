'use client'

import { useGameStore } from '@/lib/teen-module/store'
import { motion } from 'framer-motion'
import { Crown, Star, Sparkles, Zap } from 'lucide-react'

export function UserAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const { pet } = useGameStore()

    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-32 h-32',
    }

    const iconSizes = {
        sm: 'h-3 w-3',
        md: 'h-5 w-5',
        lg: 'h-8 w-8',
    }

    // Avatar upgrades based on level
    const getAvatarFeatures = () => {
        const level = pet.level

        // Base color progression
        let bgGradient = 'from-blue-300 to-purple-300'
        if (level >= 5) bgGradient = 'from-purple-400 to-pink-400'
        if (level >= 10) bgGradient = 'from-pink-400 to-orange-400'
        if (level >= 15) bgGradient = 'from-orange-400 to-yellow-400'
        if (level >= 20) bgGradient = 'from-yellow-400 to-green-400'

        // Border upgrades
        let borderClass = 'border-2 border-white/50'
        if (level >= 5) borderClass = 'border-4 border-yellow-300/70'
        if (level >= 10) borderClass = 'border-4 border-yellow-400/90 shadow-lg shadow-yellow-400/50'
        if (level >= 15) borderClass = 'border-[6px] border-orange-400 shadow-xl shadow-orange-400/60'
        if (level >= 20) borderClass = 'border-[6px] border-gradient-to-r from-yellow-400 to-pink-400 shadow-2xl shadow-pink-500/70'

        // Accessories
        const accessories = []
        if (level >= 3) accessories.push('crown')
        if (level >= 7) accessories.push('sparkles')
        if (level >= 12) accessories.push('stars')
        if (level >= 18) accessories.push('aura')

        // Animation intensity
        let pulseScale = [1, 1.05, 1]
        if (level >= 10) pulseScale = [1, 1.08, 1]
        if (level >= 20) pulseScale = [1, 1.12, 1]

        return { bgGradient, borderClass, accessories, pulseScale }
    }

    const { bgGradient, borderClass, accessories, pulseScale } = getAvatarFeatures()

    return (
        <div className="relative inline-block">
            {/* Aura effect for high levels */}
            {accessories.includes('aura') && (
                <motion.div
                    className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 opacity-30 blur-xl`}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}

            {/* Main avatar */}
            <motion.div
                className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${bgGradient} ${borderClass} flex items-center justify-center relative overflow-hidden`}
                animate={{
                    scale: pulseScale,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

                {/* Level number */}
                <div className="relative z-10 text-white font-bold text-center">
                    <div className={size === 'sm' ? 'text-xs' : size === 'md' ? 'text-lg' : 'text-3xl'}>
                        {pet.level}
                    </div>
                    {size !== 'sm' && (
                        <div className="text-[0.6rem] opacity-80">LVL</div>
                    )}
                </div>

                {/* Sparkle particles */}
                {accessories.includes('sparkles') && (
                    <>
                        <motion.div
                            className="absolute top-1 right-1"
                            animate={{
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1,
                            }}
                        >
                            <Sparkles className={`${iconSizes[size]} text-yellow-200`} />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-1 left-1"
                            animate={{
                                scale: [0, 1, 0],
                                rotate: [0, -180, -360],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 1.5,
                            }}
                        >
                            <Sparkles className={`${iconSizes[size]} text-pink-200`} />
                        </motion.div>
                    </>
                )}

                {/* Floating stars */}
                {accessories.includes('stars') && (
                    <>
                        <motion.div
                            className="absolute -top-1 left-1/2 -translate-x-1/2"
                            animate={{
                                y: [-5, -10, -5],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                        >
                            <Star className={`${iconSizes[size]} fill-yellow-300 text-yellow-300`} />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 left-1/4"
                            animate={{
                                y: [5, 10, 5],
                                rotate: [0, -360],
                            }}
                            transition={{
                                duration: 3.5,
                                repeat: Infinity,
                            }}
                        >
                            <Star className={`${iconSizes[size]} fill-pink-300 text-pink-300`} />
                        </motion.div>
                    </>
                )}
            </motion.div>

            {/* Crown accessory */}
            {accessories.includes('crown') && (
                <motion.div
                    className="absolute -top-2 left-1/2 -translate-x-1/2"
                    animate={{
                        rotate: [-5, 5, -5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <Crown className={`${iconSizes[size]} fill-yellow-400 text-yellow-500 drop-shadow-lg`} />
                </motion.div>
            )}

            {/* Lightning bolt for very high levels */}
            {pet.level >= 25 && (
                <motion.div
                    className="absolute -right-1 top-1/2 -translate-y-1/2"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                >
                    <Zap className={`${iconSizes[size]} fill-yellow-300 text-yellow-400`} />
                </motion.div>
            )}
        </div>
    )
}
