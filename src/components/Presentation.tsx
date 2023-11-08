'use client'
import { PageContext } from "@/context/PageContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Presentation = () => {
    
    const router = useRouter();
    
    const { goTrue } = useContext(PageContext)

    const GoModal = () => goTrue();


    return (
        <div className="flex-col items-center justify-center pt-16 h-1/2">
            <div className="text-center text-6xl text-white font-bold italic">
                <p>
                    Welcome to Uri Jolo's
                </p>
                <p className="pt-3">
                    Wordle Game
                </p>
            </div>
            <div className="justify-center items-center text-center pt-14">
                <button className="bg-greenBtn px-[40px] py-2.5 rounded-[15px] text-[55px] text-zinc-800 font-black shadow hover:scale-105" onClick={GoModal}>
                    PLAY
                </button>
            </div>
        </div>
    )
}

export default Presentation