'use client'

import { BloomPet } from './BloomPet'
import { InteractionMenu } from './InteractionMenu'
import { LevelDisplay } from './LevelDisplay'
import { useGameStore } from '@/lib/teen-module/store'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sparkles } from 'lucide-react'

export function SanctuaryView() {
    const { pet } = useGameStore()

    return (
        <div className="min-h-screen w-full bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col items-center justify-between py-8 overflow-hidden">
            <header className="w-full px-6 flex justify-between items-center z-10">
                <LevelDisplay />
                <Link href="/teen-space/stats">
                    <div className="bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm hover:bg-white/40 transition-all cursor-pointer">
                        {pet.name}
                    </div>
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center justify-center w-full relative">
                {/* Background ambient elements could go here */}
                <BloomPet />
            </main>

            <footer className="w-full pb-8 z-10 space-y-4">
                <div className="flex justify-center">
                    <Link href="/teen-space/quests">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg">
                            <Sparkles className="mr-2 h-5 w-5" />
                            Start a Quest
                        </Button>
                    </Link>
                </div>
                <InteractionMenu />
            </footer>
        </div>
    )
}
