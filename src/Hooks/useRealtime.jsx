import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useAuth from "./useAuth"

export default function useRealtime() {

    const { auth } = useAuth()
    const [socket, setSocket] = useState(null)

    // Checking the authenticity of the user
    useEffect(() => {
        if(!socket) return


    }, [socket])


    return { socket, setSocket }
}