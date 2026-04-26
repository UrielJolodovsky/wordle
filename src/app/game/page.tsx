'use client'
import GameGrid from "@/components/GameGrid";
import Header from "@/components/Header";


export default function Game() {
    return (
        <div className="min-h-screen bg-landingColor flex flex-col">
            <Header inHome={false} />
            <main className="flex-1 flex justify-center items-start sm:items-center pt-4">
                <GameGrid />
            </main>
        </div>
    )
}
