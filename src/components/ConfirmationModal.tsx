'use client'
import { ConfirmationModalProps } from "@/types"
import { useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"

export default function ConfirmationModal ({isOpen}: ConfirmationModalProps) {
    // const handleModalClose = () => {
    //     isOpen = false;
    // }

    // useEffect(() => {
    //     if (isOpen) {
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         document.body.style.overflow = 'unset';
    //     }
    // }, [isOpen])
    if (!isOpen) return null;

    return (
        <>
        <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-25 flex justify-center items-center">
            <button className='text-white border-4 p-5'>
                Close modal
            </button>
        </div>
       </>
    )
}