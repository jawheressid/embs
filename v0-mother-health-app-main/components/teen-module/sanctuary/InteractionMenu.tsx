'use client'

import { Button } from '@/components/ui/button'
import { Heart, Utensils, Wind } from 'lucide-react'
import { useGameStore } from '@/lib/teen-module/store'

export function InteractionMenu() {
    const { updatePetStats, pet } = useGameStore()

    const handleFeed = () => {
        updatePetStats({ happiness: Math.min(100, pet.happiness + 10), health: Math.min(100, pet.health + 5) })
    }

    return (
        <div className="flex justify-center gap-4 p-4">
            <Button variant="outline" size="icon" onClick={handleFeed} className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <Utensils className="h-8 w-8 text-white" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <Heart className="h-8 w-8 text-pink-300" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full h-16 w-16 bg-white/20 backdrop-blur-lg border-white/40 hover:bg-white/30 transition-all hover:scale-110">
                <Wind className="h-8 w-8 text-blue-300" />
            </Button>
        </div>
    )
}
