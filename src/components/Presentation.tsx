'use client'
import { PageContext } from "@/context/PageContext";
import { useContext } from "react";

const Presentation = () => {
    const { goTrue } = useContext(PageContext)
    const GoModal = () => goTrue();

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
            <div className="text-3xl sm:text-5xl lg:text-6xl text-white font-bold italic leading-tight">
                <p>Welcome to Uri Jolo&apos;s</p>
                <p className="pt-2 sm:pt-3">Wordle Game</p>
            </div>
            <button
                onClick={GoModal}
                className="mt-10 sm:mt-14 bg-greenBtn px-10 sm:px-14 py-3 sm:py-4 rounded-2xl text-3xl sm:text-5xl text-black font-black shadow-lg hover:scale-105 transition-transform"
            >
                PLAY
            </button>
        </div>
    )
}

export default Presentation
