'use client'
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useState } from "react"
import Papa from "papaparse"
import Keyboard from "./Keyboard"

type GameStatus = 'playing' | 'win' | 'lose'

const ROWS = 6
const COLS = 5

const evaluate = (guess: string, target: string): number[] => {
    const result = Array<number>(COLS).fill(2)
    const targetArr = target.split('')
    for (let i = 0; i < COLS; i++) {
        if (guess[i] === targetArr[i]) {
            result[i] = 0
            targetArr[i] = ''
        }
    }
    for (let i = 0; i < COLS; i++) {
        if (result[i] === 0) continue
        const idx = targetArr.indexOf(guess[i])
        if (idx >= 0) {
            result[i] = 1
            targetArr[idx] = ''
        }
    }
    return result
}

const tileFilledClass = (status: number | undefined) => {
    if (status === 0) return 'bg-[#3CE62D] border-[#3CE62D] text-black'
    if (status === 1) return 'bg-[#E2E62D] border-[#E2E62D] text-black'
    if (status === 2) return 'bg-[#3a3a3c] border-[#3a3a3c] text-white'
    return 'border-modalColor text-white'
}

export default function GameGrid() {
    const router = useRouter()
    const [target, setTarget] = useState('')
    const [wordList, setWordList] = useState<string[]>([])
    const [guesses, setGuesses] = useState<string[]>([])
    const [statuses, setStatuses] = useState<number[][]>([])
    const [current, setCurrent] = useState('')
    const [shake, setShake] = useState(false)
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing')

    useEffect(() => {
        fetch('/FreqWords.csv')
            .then((r) => r.text())
            .then((csv) => {
                const parsed = Papa.parse<string[]>(csv, { skipEmptyLines: true })
                const list = parsed.data
                    .slice(1)
                    .map((row) => Array.isArray(row) ? row[0] : row)
                    .filter((w): w is string => typeof w === 'string' && w.length === COLS)
                    .map((w) => w.toUpperCase())
                setWordList(list)
                setTarget(list[Math.floor(Math.random() * list.length)] ?? 'WHENS')
            })
            .catch(() => setTarget('WHENS'))
    }, [])

    const reset = () => {
        setGuesses([])
        setStatuses([])
        setCurrent('')
        setGameStatus('playing')
        if (wordList.length) setTarget(wordList[Math.floor(Math.random() * wordList.length)])
    }

    const submit = useCallback(() => {
        if (gameStatus !== 'playing' || !target) return
        if (current.length !== COLS) {
            setShake(true)
            setTimeout(() => setShake(false), 450)
            return
        }
        const status = evaluate(current, target)
        const newGuesses = [...guesses, current]
        const newStatuses = [...statuses, status]
        setGuesses(newGuesses)
        setStatuses(newStatuses)
        setCurrent('')
        if (status.every((s) => s === 0)) setGameStatus('win')
        else if (newGuesses.length >= ROWS) setGameStatus('lose')
    }, [current, gameStatus, target, guesses, statuses])

    const addLetter = useCallback((letter: string) => {
        if (gameStatus !== 'playing') return
        setCurrent((prev) => (prev.length >= COLS ? prev : prev + letter))
    }, [gameStatus])

    const backspace = useCallback(() => {
        if (gameStatus !== 'playing') return
        setCurrent((prev) => prev.slice(0, -1))
    }, [gameStatus])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                router.push('/')
                return
            }
            if (e.key === 'Enter') {
                e.preventDefault()
                submit()
                return
            }
            if (e.key === 'Backspace') {
                e.preventDefault()
                backspace()
                return
            }
            const k = e.key.toUpperCase()
            if (k.length === 1 && /^[A-ZÑ]$/.test(k)) {
                addLetter(k)
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [submit, backspace, addLetter, router])

    const letterStatus = useMemo(() => {
        const map: Record<string, number> = {}
        guesses.forEach((g, r) => {
            for (let i = 0; i < g.length; i++) {
                const l = g[i]
                const s = statuses[r][i]
                if (map[l] === undefined || s < map[l]) map[l] = s
            }
        })
        return map
    }, [guesses, statuses])

    const rows = useMemo(() => {
        const out: { letters: string[]; statuses: (number | undefined)[]; isCurrent: boolean }[] = []
        for (let r = 0; r < ROWS; r++) {
            if (r < guesses.length) {
                out.push({
                    letters: guesses[r].split(''),
                    statuses: statuses[r],
                    isCurrent: false,
                })
            } else if (r === guesses.length && gameStatus === 'playing') {
                out.push({
                    letters: Array.from({ length: COLS }, (_, i) => current[i] ?? ''),
                    statuses: Array(COLS).fill(undefined),
                    isCurrent: true,
                })
            } else {
                out.push({
                    letters: Array(COLS).fill(''),
                    statuses: Array(COLS).fill(undefined),
                    isCurrent: false,
                })
            }
        }
        return out
    }, [guesses, statuses, current, gameStatus])

    return (
        <div className="flex flex-col items-center gap-5 sm:gap-6 px-3 pb-4">
            <div className="flex flex-col gap-1.5 sm:gap-2">
                {rows.map((row, r) => (
                    <div
                        key={r}
                        className={cn(
                            "grid grid-cols-5 gap-1.5 sm:gap-2",
                            row.isCurrent && shake && "animate-shake"
                        )}
                    >
                        {row.letters.map((letter, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-md border-2 font-bold text-2xl sm:text-3xl lg:text-4xl uppercase transition-colors duration-200",
                                    tileFilledClass(row.statuses[i]),
                                    letter && row.isCurrent && "border-white animate-pop"
                                )}
                            >
                                {letter}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {gameStatus !== 'playing' && (
                <div className="flex flex-col items-center gap-3 text-white text-center">
                    <p className="text-xl sm:text-2xl font-semibold">
                        {gameStatus === 'win'
                            ? '🎉 You won!'
                            : <>You lost. The word was <span className="font-extrabold text-wordle">{target}</span></>}
                    </p>
                    <button
                        onClick={reset}
                        className="bg-greenBtn px-6 py-2 rounded-xl text-xl text-black font-black shadow hover:scale-105 transition-transform"
                    >
                        Play again
                    </button>
                </div>
            )}

            <Keyboard
                onKey={addLetter}
                onEnter={submit}
                onBackspace={backspace}
                letterStatus={letterStatus}
            />
        </div>
    )
}
