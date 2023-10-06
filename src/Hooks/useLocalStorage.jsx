import { useEffect, useState } from "react"

export default function useLocalStorage(item, initialState = null, parseData = false) {

    if(!item) throw new Error("You must provide an item name")

    const [value, setValue] = useState(parseData ? JSON.parse(localStorage.getItem(item)) : localStorage.getItem(item) || initialState)

    useEffect(() => {
        if(parseData) localStorage.setItem(item, JSON.stringify(value))
        else localStorage.setItem(item, value)
    }, [value])

    return [value, setValue]

}