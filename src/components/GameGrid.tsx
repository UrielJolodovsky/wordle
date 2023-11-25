import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function GameGrid() {

    const [word, setWord] = useState("WHENS")

    let compareWord = Array.from(word)

    const dic = {
        1: "hola"
    }
    
    const [inputWord, setInputWord] = useState("")

    const [compareInput, setCompareInput] = useState(Array.from(inputWord))

    const [numberWord, setNumberWord] = useState(0)

    const [corrects, setCorrects] = useState([[-1, -1 , -1, -1, -1], [-1, -1 , -1, -1, -1], [-1, -1 , -1, -1, -1], [-1, -1 , -1, -1, -1], [-1, -1 , -1, -1, -1], [-1, -1 , -1, -1, -1]])

    const [words, setWords] = useState(["","","","","",""])

    const classname_div_grid = "2xl:w-20 2xl:h-20 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center text-center justify-center rounded-md border-2 border-modalColor text-modalColor"

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
                // const newCompareInput = Array.from(compareInput)
                // newCompareInput[i] = ","
                // setCompareInput(newCompareInput)
                // const newCompareWord = Array.from(compareWord)
                // newCompareWord[i] = ";"
                // setCompareWord(newCompareWord)
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
                // const newCompareInput = Array.from(compareInput)
                // newCompareInput[i] = ","
                // setCompareInput(newCompareInput)
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
    }, [])

    useEffect(() => {
        // useEffect para cuando llegue a la ultima palabra
        }, [numberWord === 6])
    
    const handleKeyDown = (ev: any) => {
        if(ev.key === "Enter") {
            if (inputWord.length === 5 && numberWord < 5) {
                // Comparar palabras
                verifyWord()
            }
            else if(inputWord.length === 5 && numberWord === 5) {
                // Comparar palabras y decirle la respuesta correcta en caso de no acertar
                // router.push('/')
                verifyWord()
            }
            else {
                alert("The word must have 5 letters")
                setInputWord("")
            }
        }
            else if(ev.key === "Escape") {
            router.push('/')
        }
    }

    useEffect(() => {
        const findWord = words.find(word => words[numberWord] === word)
        console.log(words.indexOf(findWord!))
        const newWords = [...words]
        newWords[numberWord] = inputWord
        setWords(newWords)
        setCompareInput(Array.from(inputWord))
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
            <input  type="text" value={inputWord} autoFocus onKeyDown={handleKeyDown} onChange={(ev: any) => inputChange(ev.target.value)} className="w-full h-full absolute opacity-0 left-0 top-0 cursor-default"></input>
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
        </div>
    
    )
}