'use client'
import { ConfirmationModalProps } from "@/types"
import { useEffect } from "react"

export default function ConfirmationModal ( {isOpen}: ConfirmationModalProps) {
    
    const handleModalClose = () => {
        isOpen = false;
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen])
    
    return (
        <>
       {isOpen ? (
        <div className="items-center justify-center flex">
            <button className='text-white border-4 p-5' onClick={handleModalClose}>
                Close modal
            </button>
        </div>
       ) : ('')}
       </>
    )
}