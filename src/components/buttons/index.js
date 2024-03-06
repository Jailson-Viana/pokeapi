import React, { useContext } from "react"
import { ThemeContext } from "../../contexts"

const Button = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <button{...props}
            style={{ color: theme.color, backgroundColor: theme.background }}
        />
    )
}

export { Button }