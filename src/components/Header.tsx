'use client'
import { useRouter } from "next/navigation";

type HeaderProps = {
    inHome: boolean
}

export default function Header(props: HeaderProps) {
    const router = useRouter();
    const inHome = props.inHome
    const goHome = () => router.push('/')

    return (
        <header className="w-full flex items-center justify-between px-4 sm:px-8 py-4 border-b border-[#2a2e30]">
            <h1
                onClick={goHome}
                className="text-3xl sm:text-5xl italic text-wordle font-extrabold tracking-wide cursor-pointer select-none"
            >
                WORDLE
            </h1>
            {!inHome && (
                <button
                    onClick={goHome}
                    className="text-white text-xs sm:text-sm font-semibold border border-modalColor px-3 py-2 rounded-lg hover:bg-modalColor hover:text-black transition-colors"
                >
                    <span className="hidden sm:inline">Press </span>ESC<span className="hidden sm:inline"> to return</span>
                </button>
            )}
        </header>
    )
}
