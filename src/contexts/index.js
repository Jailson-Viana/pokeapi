import { createContext, useState } from "react"

export const themes = {
    light: {
        color: '#000000',
        background: '#CFD8DC'
    },
    dark: {
        color: '#ffffff',
        background: '#202124'   
    }
}

const ThemeContext = createContext({})

const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light)
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext, ThemeProvider}