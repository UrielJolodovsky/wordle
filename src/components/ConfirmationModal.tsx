'use client'
import { PageContext } from "@/context/PageContext"
import { ConfirmationModalProps } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useRef } from "react"

export default function ConfirmationModal () {

    const router = useRouter();

    const GoToPlay = () => router.push('/game')
    
    const { isOpen, goFalse } = useContext(PageContext)

    if (!isOpen) return null;


    return (
        <>
        <div className="fixed inset-0 backdrop-blur-sm flex flex-col justify-center items-center">
            <div className="w-1/2 h-1/2 items-center justify-center bg-modalColor rounded-[15px]">
                <div className="flex items-end justify-end pr-3 pt-2 h-1/6">
                <button className='text-black border-4 p-5' onClick={goFalse}>
                    Close modal
                </button>
                </div>
                <div className="h-5/6 flex items-center justify-center">
                   <button className="text-black border-2 p-3 rounded-[15px]" onClick={GoToPlay}>
                    Play
                   </button>
                </div>
            </div>
        </div>
       </>
    )
}