'use client'
import ConfirmationModal from "@/components/ConfirmationModal";
import GameGrid from "@/components/GameGrid";
import Header from "@/components/Header";


export default function Home() {
    return (
        <div className="w-screen h-screen bg-landingColor">
            <Header inHome={false} />
            <GameGrid />
        </div>
    )
}