'use client'
import useModal from "@/hooks/useModal";
import { ConfirmationModalState } from "@/types";
import { useRouter } from "next/navigation";

const Presentation = ({pressed}: ConfirmationModalState) => {
    
    const router = useRouter();
    
    const GoToGame = () => {
        router.push('/game')
    };
    


    return (
        <div className="flex-col items-center justify-center pt-24 h-1/2">
            <div className="text-center text-6xl text-white font-bold italic">
                <p>
                    Welcome to Uri Jolo's
                </p>
                <p className="pt-3">
                    Wordle Game
                </p>
            </div>
            <div className="justify-center items-center text-center pt-20">
                <button className="bg-greenBtn px-[50px] py-2.5 rounded-[15px] text-[90px] text-zinc-800 font-black shadow hover:scale-105" onClick={GoToGame}>
                    PLAY
                </button>
            </div>
        </div>
    )
}

export default Presentation