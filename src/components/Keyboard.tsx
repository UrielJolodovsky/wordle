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
    if (s === 0) return "bg-[#3CE62D] text-zinc-900 border-[#3CE62D]"
    if (s === 1) return "bg-[#E2E62D] text-zinc-900 border-[#E2E62D]"
    if (s === 2) return "bg-[#808080] text-white border-[#808080]"
    return "bg-modalColor text-zinc-900 border-modalColor"
}

export default function Keyboard({ onKey, onEnter, onBackspace, letterStatus }: KeyboardProps) {
    const handleClick = (key: string) => {
        if (key === "ENTER") onEnter()
        else if (key === "BACK") onBackspace()
        else onKey(key)
    }

    return (
        <div className="flex flex-col gap-2 items-center pt-4 pb-6">
            {ROWS.map((row, i) => (
                <div key={i} className="flex gap-1.5 justify-center">
                    {row.map((key) => {
                        const isWide = key === "ENTER" || key === "BACK"
                        const status = key.length === 1 ? letterStatus[key] : undefined
                        return (
                            <button
                                key={key}
                                onClick={() => handleClick(key)}
                                className={cn(
                                    "rounded-md font-bold text-sm sm:text-base border-2 hover:scale-105 transition-transform",
                                    isWide ? "px-3 sm:px-4 py-3 sm:py-4" : "w-9 h-12 sm:w-11 sm:h-14",
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
