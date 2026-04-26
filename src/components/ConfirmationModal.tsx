'use client'
import { PageContext } from "@/context/PageContext"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"
import Image from 'next/image'

export default function ConfirmationModal() {

    const router = useRouter();
    const GoToPlay = () => router.push('/game')
    const { isOpen, goFalse } = useContext(PageContext)
    const [language, setLanguage] = useState("English")

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="w-full max-w-md bg-modalColor rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl text-black font-bold">Select language</h3>
                    <button onClick={goFalse} aria-label="Close">
                        <Image src="/Close-icon.png" alt="close" width={28} height={28} />
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={language}
                        onChange={(ev) => setLanguage(ev.target.value)}
                        className="flex-1 px-4 py-3 rounded-lg bg-greenBtn2 border-2 border-transparent focus:outline-none focus:border-greenBtn text-black font-semibold"
                    >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                    <div className="bg-[#9b9b9b] p-2 rounded-lg shrink-0">
                        <Image
                            src={language === "Spanish" ? "/spain.png" : "/eeuu.png"}
                            alt={language}
                            width={56}
                            height={56}
                            className="w-14 h-14 object-cover rounded"
                        />
                    </div>
                </div>

                <button
                    onClick={GoToPlay}
                    className="bg-greenBtn px-6 py-3 rounded-xl text-lg text-black font-extrabold shadow hover:scale-[1.02] transition-transform"
                >
                    Go to game!
                </button>
            </div>
        </div>
    )
}
