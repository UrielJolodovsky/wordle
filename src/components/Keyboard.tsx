import { cn } from "@/lib/utils"

type KeyboardProps = {
    onKey: (letter: string) => void
    onEnter: () => void
    onBackspace: () => void
    letterStatus: Record<string, number>
}

const ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
]

const statusClass = (s: number | undefined) => {
    if (s === 0) return "bg-[#3CE62D] text-black border-[#3CE62D]"
    if (s === 1) return "bg-[#E2E62D] text-black border-[#E2E62D]"
    if (s === 2) return "bg-[#3a3a3c] text-white border-[#3a3a3c]"
    return "bg-[#818384] text-white border-[#818384]"
}

export default function Keyboard({ onKey, onEnter, onBackspace, letterStatus }: KeyboardProps) {
    const handleClick = (key: string) => {
        if (key === "ENTER") onEnter()
        else if (key === "BACK") onBackspace()
        else onKey(key)
    }

    return (
        <div className="w-full max-w-md flex flex-col gap-1.5 sm:gap-2 items-center px-1 select-none">
            {ROWS.map((row, i) => (
                <div key={i} className="w-full flex gap-1 sm:gap-1.5 justify-center">
                    {row.map((key) => {
                        const isWide = key === "ENTER" || key === "BACK"
                        const status = key.length === 1 ? letterStatus[key] : undefined
                        return (
                            <button
                                key={key}
                                type="button"
                                onClick={() => handleClick(key)}
                                className={cn(
                                    "h-12 sm:h-14 rounded-md font-bold uppercase border-2 active:scale-95 transition-transform",
                                    isWide
                                        ? "flex-[1.5] text-xs sm:text-sm px-1"
                                        : "flex-1 text-base sm:text-lg",
                                    statusClass(status)
                                )}
                            >
                                {key === "BACK" ? "⌫" : key}
                            </button>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
