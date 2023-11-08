'use client'
import { PageContext } from "@/context/PageContext";
import { useRouter } from "next/navigation";
import { FC, useContext } from 'react'

type HeaderProps = {
    inHome: boolean
}

export default function Header (props: HeaderProps) {

    const router = useRouter();
    const { isOpen, goTrue, goFalse } = useContext(PageContext)
    const inHome = props.inHome
    const GoToHome = () => {
        router.push('/')
    };

    return (
        <div className="flex flex-direction:row items-center pt-5 h-1/6">
            <div className="basis-3/4 pl-5">
                <h1 className="text-[72px] italic text-wordle font-bold flex-shrink-0 drop-shadow-[0px_5.777778148651123px_5.777778148651123px_rgba(0, 0, 0, 0.25)] border-3 border-white">WORDLE</h1>
            </div>
            {inHome ? (''
            ) : 
            <div className="pr-10">
                <button className="hover:scale-105 w-[323px] h-[78px] px-5 py-2.5 rounded-[25px] shadow justify-center items-center gap-2.5 inline-flex">
                    <p className="text-white text-2xl font-black italic" onClick={GoToHome}>Press ESC to return</p>
                </button>
            </div>
        }
        </div>
    )
}