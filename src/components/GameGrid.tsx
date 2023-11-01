import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function GameGrid() {
    
    const [inputWord, setInputWord] = useState("")

    const [numberWord, setNumberWord] = useState(0)

    const [words, setWords] = useState(["Hola","Miami","Fulbo","Rayos","Goool", ""])

    const router = useRouter()

    const handleKeyDown = (ev: any) => {
        if(ev.key === "Enter") {
            console.log("Enter")
            console.log(inputWord)
            if (inputWord.length === 5) {
                setInputWord("")
                setNumberWord(numberWord + 1)
            }
            else {
                alert("The word must have 5 letters")
                setInputWord("")
            }
        }
        else if(ev.key === "Escape") {
            router.push('/')
        }
        else {
            console.log("Not Enter", ev.key)
        }
    }

    useEffect(() => {
        const findWord = words.find(word => words[numberWord] === word)

        console.log(words.indexOf(findWord!))
        const newWords = [...words]
        newWords[numberWord] = inputWord
        setWords(newWords)
    }, [inputWord])
    const inputChange = (word: string) => {
        if (word.length > 5) {
            setInputWord(word.slice(0, 5))
        }
        else {
            setInputWord(word)
        }
    }
    
    return (
        <div className="grid gap-2 items-center justify-center pt-10 pb-5">
            <input type="text" value={inputWord} onKeyDown={handleKeyDown} onChange={(ev: any) => inputChange(ev.target.value)} className="w-full h-full absolute opacity-0 left-0 top-0 cursor-default"></input>
            {Array.isArray(words) ? words.map((word, index) => 
            <div key={index + 1} className="grid grid-cols-5 gap-2 grid-flow-row">
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[0] ? word[0].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[1] ? word[1].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[2] ? word[2].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[3] ? word[3].toLocaleUpperCase() : ''}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[4] ? word[4].toLocaleUpperCase() : ''}</h3>
                </div>
            </div>
            ) : ""}
        </div>
    
    )
}