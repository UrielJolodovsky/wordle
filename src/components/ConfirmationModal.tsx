'use client'
import { PageContext } from "@/context/PageContext"
import { ConfirmationModalProps } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useRef } from "react"
import Image from 'next/image'

export default function ConfirmationModal () {

    const router = useRouter();

    const GoToPlay = () => router.push('/game')
    
    const { isOpen, goFalse } = useContext(PageContext)

    if (!isOpen) return null;


    return (
        <>
        <div className="fixed inset-0 backdrop-blur-sm flex flex-col justify-center items-center">
            <div className="w-1/2 h-1/2 items-center justify-center bg-modalColor rounded-[15px]">
                <div className="flex items-end justify-end p-5">
                <button className='text-black' onClick={goFalse}>
                    <Image src="/Close-icon.png" alt="close" width={30} height={30} />
                </button>
                </div>
                <div className="h-1/3 flex flex-col">
                <div className="text-2xl flex justify-start items-start pl-5">
                    <h3 className="text-black">Select language:</h3>
                </div>
                <div className="h-1/2 flex flex-direction:row justify-center items-center">
                    <div className="pt-5 flex gap-5">
                        <div className="bg-[#9b9b9b] rounded-[15px] p-2">
                        <input type="radio" name="language" id="english" className="mr-2 gap-3"/>
                        <label htmlFor="english">English</label>
                        </div>
                        <div className="bg-[#9b9b9b] rounded-[15px] p-2">
                        <input type="radio" name="language" id="spanish" className="mr-2 gap-3"/>
                        <label htmlFor="spanish">Spanish</label>
                        </div>
                    </div>
                </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex bg-[#9b9b9b] px-5 rounded-[15px]">
                    <Image src="/spain.png" alt="arrow" width={100} height={100} />
                    </div>
                </div>
                <div className="py-5 flex items-center justify-center">
                   <button className="text-black border-2 bg-greenBtn2 px-10 py-3 rounded-[15px] hover:bg-greenBtn" onClick={GoToPlay}>
                    Go to game!
                   </button>
                </div>
            </div>
        </div>
       </>
    )
}