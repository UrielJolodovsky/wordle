import { createContext, useContext, useState } from "react";

type PageContextType = {
    inHome: boolean,
    setInHome: (inHome: boolean) => void
}

export const PageContext = createContext<PageContextType>({
    inHome: true,
    setInHome: () => { }
})

export const PageProvider = ({ children }: {children: React.ReactNode}) => {
    const [inHome, setInHome] = useState(true)

    return (
        <PageContext.Provider value={{inHome, setInHome}}>
            {children}
        </PageContext.Provider>
    )
}