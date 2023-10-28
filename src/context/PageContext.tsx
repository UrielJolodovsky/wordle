import { createContext, useContext, useState } from "react";

type PageContextType = {
    isOpen: boolean,
    goTrue: () => void
    goFalse: () => void
}

export const PageContext = createContext<PageContextType>({
    isOpen: false,
    goTrue: () => { },
    goFalse: () => { }
})

export const PageProvider = ({ children }: {children: React.ReactNode}) => {
    
    const [isOpen, setIsOpen] = useState(false)

    const goTrue = () => setIsOpen(true)

    const goFalse = () => setIsOpen(false)

    return (
        <PageContext.Provider value={{isOpen, goTrue, goFalse}}>
            {children}
        </PageContext.Provider>
    )
}