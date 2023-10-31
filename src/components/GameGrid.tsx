import { useState } from "react"


export default function GameGrid() {
    
    const [inputWord, setInputWord] = useState("")

    const handleKeyDown = (ev: any) => {
        if(ev.key === "Enter") {
            console.log("Enter")
            console.log(inputWord)
            if (inputWord.length === 5) {
                setInputWord("")
            }
            else {
                alert("The word must have 5 letters")
                setInputWord("")
            }
        }
        else {
            console.log("Not Enter", ev.key)
        }
    }

    const inputChange = (word: string) => {
        if (word.length > 5) {
            setInputWord(word.slice(0, 5))
            console.log(inputWord)
        }
        else {
            setInputWord(word)
            console.log(inputWord)
        }
    }

    const words = ["Hola","Miami","Fulbo","Rayos","Goool", ""]
    
    return (
        <div className="grid gap-2 items-center justify-center pt-10">
            <input type="text" value={inputWord} onKeyDown={handleKeyDown} onChange={(ev: any) => inputChange(ev.target.value)} className="w-full h-full absolute opacity-0 left-0 top-0 cursor-default"></input>
            {Array.isArray(words) ? words.map((word, index) => 
            <div key={index + 1} className="grid grid-cols-5 gap-2 grid-flow-row">
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[0]}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[1]}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[2]}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[3]}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[4]}</h3>
                </div>
            </div>
            ) : ""}
        </div>
    
    )
}