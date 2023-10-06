import { useEffect, useState } from "react"
import { useLocalStorage } from "./CustomHooks"
import Theme from "../Constant/Theme"
import { FaMoon, FaSun } from "react-icons/fa6"

export default function useTheme() {

    const [themeIcon, setThemeIcon] = useState()
    const [local, setLocal] = useLocalStorage('theme', "light")
    const [theme, setTheme] = useState(local || "light")

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

    useEffect(() => {
        const body = document.querySelector('body');
        body.classList.remove(Theme.LIGHT, Theme.DARK)
        switch(theme) {
            case "dark":
                setLocal("dark")
                body.classList.add("dark")
                setThemeIcon(<FaSun />)
                break;
            default:
                setLocal("light")
                body.classList.add("light")
                setThemeIcon(<FaMoon />)
                break;
        }
    }, [theme])

    return { theme, setTheme, toggleTheme, themeIcon }

}