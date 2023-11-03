'use client'
import { PageContext } from "@/context/PageContext"
import { ConfirmationModalProps } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect, useRef, useState } from "react"
import Image from 'next/image'

export default function ConfirmationModal () {

    const router = useRouter();

    const GoToPlay = () => router.push('/game')
    
    const { isOpen, goFalse } = useContext(PageContext)

    const [language, setLanguage] = useState("")

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
                <div className="h-1/2 flex flex-col">
                <div className="text-2xl flex justify-start items-start pl-5">
                    <h3 className="text-black">Select language:</h3>
                </div>
                <div className="h-1/2 grid grid-cols-2 justify-center items-center gap-10">
                    {/* <div className="pt-5 flex gap-5"> */}
                        {/* <div className="bg-[#9b9b9b] rounded-[15px] p-2">
                        <input type="radio" name="language" id="english" className="mr-2 gap-3"/>
                        <label htmlFor="english">English</label>
                        </div>
                        <div className="bg-[#9b9b9b] rounded-[15px] p-2">
                        <input type="radio" name="language" id="spanish" className="mr-2 gap-3"/>
                        <label htmlFor="spanish">Spanish</label>
                        </div> */}
                        <div className="flex justify-center items-center">
                            <select value={language} onChange={(ev: any) => setLanguage(ev.target.value)} className="hover:ease-in-out px-5 py-3 border-2 rounded-[10px] bg-greenBtn2">
                                <option value={""} selected>
                                    Select a language
                                </option>
                                <option value={"Spanish"}>
                                    Spanish
                                </option>
                                <option value={"English"}>
                                    English
                                </option>
                            </select>
                        </div>
                    <div className="flex justify-center items-center">
                        <div className="flex bg-[#9b9b9b] px-5 py-3 rounded-[15px]">
                            {language === "Spanish" ? (
                                <Image src="/spain.png" alt="arrow" width={100} height={100} />
                            ) : (
                                <Image src="/eeuu.png" alt="arrow" width={100} height={100} />
                            )}
                        </div>
                    </div>
                </div>
                </div>
                <div className="py-5 flex items-center justify-center">
                   <button className="text-black border-2 bg-greenBtn2 px-10 py-3 rounded-[15px] hover:bg-greenBtn hover:ease-in-out" onClick={GoToPlay}>
                    Go to game!
                   </button>
                </div>
            </div>
        </div>
       </>
    )
}