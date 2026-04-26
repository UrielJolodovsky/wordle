import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import Papa from "papaparse"
import Keyboard from "./Keyboard"

const emptyCorrects = () => Array.from({ length: 6 }, () => [-1, -1, -1, -1, -1])
const emptyWords = () => ["", "", "", "", "", ""]

export default function GameGrid() {

    const [word, setWord] = useState("")
    const [wordList, setWordList] = useState<string[]>([])

    let compareWord = Array.from(word)

    const [inputWord, setInputWord] = useState("")
    const [compareInput, setCompareInput] = useState(Array.from(inputWord))
    const [numberWord, setNumberWord] = useState(0)
    const [corrects, setCorrects] = useState<number[][]>(emptyCorrects())
    const [words, setWords] = useState<string[]>(emptyWords())
    const [lose, setLose] = useState(false)
    const [win, setWin] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetch('/FreqWords.csv')
            .then((res) => res.text())
            .then((csv) => {
                const parsed = Papa.parse<string[]>(csv, { skipEmptyLines: true })
                const list = parsed.data
                    .slice(1)
                    .map((row) => (Array.isArray(row) ? row[0] : row))
                    .filter((w): w is string => typeof w === 'string' && w.length === 5)
                    .map((w) => w.toUpperCase())
                setWordList(list)
                if (list.length > 0) {
                    setWord(list[Math.floor(Math.random() * list.length)])
                }
            })
            .catch(() => {
                setWord("WHENS")
            })
    }, [])

    const resetGame = () => {
        setCorrects(emptyCorrects())
        setWords(emptyWords())
        setInputWord("")
        setCompareInput([])
        setNumberWord(0)
        setLose(false)
        setWin(false)
        if (wordList.length > 0) {
            setWord(wordList[Math.floor(Math.random() * wordList.length)])
        }
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const classname_div_grid = "2xl:w-20 2xl:h-20 w-14 h-14 lg:w-16 lg:h-16 flex items-center text-center justify-center rounded-md border-2 border-modalColor text-modalColor"

    const Conditions = (input: number) => {
        return {
            "text-[#3CE62D] border-[#3CE62D]": input == 0,
            "text-[#E2E62D] border-[#E2E62D]": input == 1,
            "text-[#808080] border-[#808080]": input == 2,
        }
    }

    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

    const router = useRouter()

    const verifyWord = () => {
        for(let i = 0; i < inputWord.length; i++) {
            if(compareInput[i].toLocaleUpperCase() === compareWord[i].toLocaleUpperCase()) {
                const newCorrects = [...corrects]
                newCorrects[numberWord][i] = 0
                setCorrects(newCorrects)
                const newCompareWord = [...compareWord]
                newCompareWord[i] = ","
                compareWord = newCompareWord
                console.log(compareWord)
            }
        }
        for (let i = 0; i < inputWord.length; i++) {
            if(compareWord.includes(compareInput[i].toLocaleUpperCase())) {
                const newCorrects = [...corrects]
                newCorrects[numberWord][i] = 1
                setCorrects(newCorrects)
                let position = compareWord.indexOf(compareInput[i].toLocaleUpperCase())
                compareWord[position] = ","
            }
        }
        for(let i = 0; i < inputWord.length; i++) {
            if(corrects[numberWord][i] === -1) {
                const newCorrects = [...corrects]
                newCorrects[numberWord][i] = 2
                setCorrects(newCorrects)
            }
        }
            compareWord = Array.from(word)
            setInputWord("")
            setNumberWord(numberWord + 1) 
    }
    useEffect(() => {
    // useEffect para cuando adivine la palabra
        if (corrects[numberWord - 1] && corrects[numberWord - 1].every((value) => value === 0)) {
            setWin(true)
            setNumberWord(6)
        }
}, [numberWord])

    useEffect(() => {
        setLose(corrects[5].includes(2) || corrects[5].includes(1))
        }, [numberWord === 6])
    
    const submitWord = () => {
        if (!word || numberWord >= 6) return
        if (inputWord.length === 5) {
            verifyWord()
        } else {
            alert("The word must have 5 letters")
            setInputWord("")
        }
    }

    const handleKeyDown = (ev: any) => {
        if(ev.key === "Enter") {
            submitWord()
        }
            else if(ev.key === "Escape") {
            router.push('/')
        }
    }

    const onKeyboardLetter = (letter: string) => {
        if (numberWord >= 6) return
        setInputWord((prev) => (prev.length >= 5 ? prev : prev + letter))
        inputRef.current?.focus()
    }

    const onKeyboardBackspace = () => {
        if (numberWord >= 6) return
        setInputWord((prev) => prev.slice(0, -1))
        inputRef.current?.focus()
    }

    const letterStatus = useMemo(() => {
        const status: Record<string, number> = {}
        for (let r = 0; r < numberWord; r++) {
            const guess = words[r]
            if (!guess) continue
            for (let i = 0; i < guess.length; i++) {
                const letter = guess[i].toLocaleUpperCase()
                const c = corrects[r][i]
                if (c < 0) continue
                const prev = status[letter]
                if (prev === undefined || c < prev) status[letter] = c
            }
        }
        return status
    }, [words, corrects, numberWord])

    useEffect(() => {
        if (numberWord < 6) {
        const findWord = words.find(word => words[numberWord] === word)
        console.log(words.indexOf(findWord!))
        const newWords = [...words]
        newWords[numberWord] = inputWord
        setWords(newWords)
        setCompareInput(Array.from(inputWord))
        }
    }, [inputWord])
    
    const inputChange = (word: string) => {
        for (let i = 0; i < word.length; i++) {
            if (!letters.includes(word[i].toLocaleUpperCase())) {
                word = word.replace(word[i], "")
            }
        }
        if (word.length > 5) {
            setInputWord(word.slice(0, 5))
        }
        else {
            setInputWord(word)
        }
    }

    return (
        <div className="grid gap-2 items-center justify-center 2xl:pt-10 pb-5 sm:pt-5">
            <input  ref={inputRef} type="text" value={inputWord} autoFocus onKeyDown={handleKeyDown} onChange={(ev: any) => inputChange(ev.target.value)} className="w-full h-full absolute opacity-0 left-0 top-0 cursor-default"></input>
            {Array.isArray(words) ? words.map((word, index) => 
            <div key={index + 1} className="grid grid-cols-5 gap-2 grid-flow-row">
                <div className="">
                    <div className={cn(classname_div_grid, Conditions(corrects[index][0]))}>
                    <h3 className="2xl:text-[50px] xl:text-[40px] sm:text-[30px]">{word[0] ? word[0].toLocaleUpperCase() : ''}</h3>
                    </div>
                </div>
                <div className={cn(classname_div_grid, Conditions(corrects[index][1]))}>
                    <h3 className="2xl:text-[50px] xl:text-[40px] sm:text-[30px]">{word[1] ? word[1].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className={cn(classname_div_grid, Conditions(corrects[index][2]))}>
                    <h3 className="2xl:text-[50px] xl:text-[40px] sm:text-[30px]">{word[2] ? word[2].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className={cn(classname_div_grid, Conditions(corrects[index][3]))}>
                    <h3 className="2xl:text-[50px] xl:text-[40px] sm:text-[30px]">{word[3] ? word[3].toLocaleUpperCase() : ''}</h3>
                </div>
                {/* <div className="animate-tilt shadow-white -inset-0.5 opacity-50"> */}
                <div className={cn(classname_div_grid, Conditions(corrects[index][4]))}>
                    <h3 className="2xl:text-[50px] xl:text-[40px] sm:text-[30px]">{word[4] ? word[4].toLocaleUpperCase() : ''}</h3>
                </div>
                {/* </div> */}
            </div>
            ) : ""}
            {lose ? <div className="flex flex-col gap-2 justify-center items-center pt-3">
                <h5 className="text-white text-2xl">You lose! The word was: <span className="font-bold">{word}</span></h5>
            </div>: ""}
            {win ? <div className="flex flex-col gap-2 justify-center items-center pt-3">
                <h5 className="text-white text-2xl">You win!</h5>
                </div>: ""}
            {(lose || win) ? <div className="flex justify-center items-center pt-2">
                <button onClick={resetGame} className="bg-greenBtn px-6 py-2 rounded-[15px] text-2xl text-zinc-800 font-black shadow hover:scale-105">
                    Play again
                </button>
            </div> : ""}
            <Keyboard
                onKey={onKeyboardLetter}
                onEnter={submitWord}
                onBackspace={onKeyboardBackspace}
                letterStatus={letterStatus}
            />
        </div>

    )
}