'use client'
import { PageContext } from "@/context/PageContext"
import { ConfirmationModalProps } from "@/types"
import { useSearchParams } from "next/navigation"
import { useContext, useEffect, useRef } from "react"

export default function ConfirmationModal () {
    
    const { isOpen, goFalse } = useContext(PageContext)

    if (!isOpen) return null;


    return (
        <>
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-25 flex justify-center items-center">
            <button className='text-white border-4 p-5' onClick={goFalse}>
                Close modal
            </button>
        </div>
       </>
    )
}