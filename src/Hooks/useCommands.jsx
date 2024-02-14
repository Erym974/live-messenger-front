import useMessenger from "./useMessenger"
import { socket } from "../socket"
import { useEffect } from "react"

export default function useCommands() {

    const { group } = useMessenger()

    useEffect(() => {
        if(!socket) return
        socket.on('easter-received', execEaster)
        return () => {
            socket.off("easter-received")
        }
    
    }, [socket])

    const easters = [
        {active: true, name: "mango", chat: true, audio: "mango", alias: ["mangue"], image: "https://media0.giphy.com/media/S8HRMhG0ecGOTuVnVP/giphy.gif?cid=ecf05e47t1x6bltn2pnjgvbduc5f9na0kwu0uc07egykwrfe&ep=v1_gifs_search&rid=giphy.gif&ct=g"}, 
        {active: true, name: "issou", chat: true, audio: "issou", alias: ["ayaderisitas"], image: "https://media.tenor.com/ZOPUNPN6FugAAAAd/issou-drole.gif"},
        {active: false, name: "idle", chat: false, audio: "idle", alias: [], image: "https://media.tenor.com/acFXt21UBcgAAAAC/sleepy-kid.gif"},
    ]


    const executeCommand = (cmd, chat) => {

        cmd = cmd.toLowerCase().trim().replace('/', '')

        const easter = easters.find(easter => easter.name === cmd || easter.alias.includes(cmd));

        if(easter) {
            if(!easter.active) return false

            if(easter.chat === null || easter.chat === chat) {
                sendEaster(easter)
                return true
            }
        }
    
        return false

    }

    const sendEaster = async (easter) => {
        socket.emit("send-easter", {id: group.id, easter})
    }

    const execEaster = (easter) => {

        if(typeof easter === "string")easter = easters.find(e => e.name === easter)
        if(!easter) return

        document.body.classList.add("easter")
        document.body.classList.add(easter.name)
        if(easter.image) document.body.style.cssText = `--easter-image: url("${easter.image}")`

        if(easter.audio) {
            try {
                let audio = new Audio(`/audios/${easter.audio}.mp3`);
                if(audio) {
                    audio.play();
                
                    audio.addEventListener("loadedmetadata", () => { 
                        setTimeout(() => {
                            document.body.classList.remove("easter")
                            document.body.classList.remove(easter.name)
                        }, audio.duration * 1000)
                    })
                }

            } catch(e) {
                setTimeout(() => {
                    document.body.classList.remove("easter")
                    document.body.classList.remove(easter.name)
                }, 3000)
            }
        } else {
            setTimeout(() => {
                document.body.classList.remove("easter")
                document.body.classList.remove(easter.name)
            }, 3000)
        }


    }

    return { executeCommand, execEaster }

}