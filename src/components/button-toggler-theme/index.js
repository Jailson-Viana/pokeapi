import React, { useContext } from "react"
import { ThemeContext, themes } from "../../contexts"
import { TiAdjustContrast} from "react-icons/ti";

const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div>
            <TiAdjustContrast fontSize='40px' cursor='pointer' onClick={() => {
                setTheme(theme === themes.light ? themes.dark :
                    themes.light)
            }}/>
        </div>
    )
}


export { ThemeTogglerButton }