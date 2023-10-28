

export default function GameGrid() {
    
    
    const words = ["Holaa","Miami","Fulbo","Rayos","Goool"]
    
    return (
        <div className="grid gap-2 items-center justify-center pt-10">
            {Array.isArray(words) ? words.map((word, index) => 
            <div key={index + 1} className="grid grid-cols-5 gap-2 grid-flow-row">
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black">{word[0]}</h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black"></h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black"></h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black"></h3>
                </div>
                <div className="w-20 h-20 flex items-center text-center justify-center rounded-md bg-modalColor">
                    <h3 className="text-[50px] text-black"></h3>
                </div>
            </div>
            ) : ""}
        </div>
    )
}