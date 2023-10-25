'use client'
import { PageContext } from "@/context/PageContext";
import { useRouter } from "next/navigation";
import { FC, useContext } from 'react'

type HeaderProps = {
    inHome: boolean
}

export default function Header (props: HeaderProps) {

    const router = useRouter();
    // const { inHome, setInHome} = useContext(PageContext)
    const inHome = props.inHome
    const GoToHome = () => {
        router.push('/')
    
    };

    return (
        <div className="flex flex-direction:row items-center pt-5  h-1/6">
            <div className="basis-3/4 pl-5">
                <h1 className="text-[92px] italic text-wordle font-bold flex-shrink-0 drop-shadow-[0px_5.777778148651123px_5.777778148651123px_rgba(0, 0, 0, 0.25)] border-3 border-white">WORDLE</h1>
            </div>
            {inHome ? (''
            ) : 
            <div className="pr-10">
                <button className="hover:scale-105 w-[323px] h-[78px] bg-white px-5 py-2.5 rounded-[25px] shadow border border-black justify-center items-center gap-2.5 inline-flex">
                    <p className="text-black text-5xl font-black italic" onClick={GoToHome}>Go to home</p>
                </button>
            </div>
        }
        </div>
    )
}