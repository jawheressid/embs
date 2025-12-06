'use client'

import Image from 'next/image'

export function BloomPet() {
    const images = [
        "/pet0.gif",
        "/pet2.png",
        "/pet3.png"
    ]

    const selectedImage = images[0] // replace with your logic

    return (
        <div className="relative flex items-center justify-center h-[500px] w-full bg-transparent">
            <div className="flex items-center justify-center bg-transparent">
                <Image
                    src={selectedImage}
                    alt="pet"
                    width={300}
                    height={300}
                    className="object-contain drop-shadow-2xl bg-transparent"
                />
            </div>
        </div>
    )
}
