import useMessenger from "./useMessenger"
import toast from "react-hot-toast"
import axios from "../Api/axios"

export default function useCommands() {

    const { group } = useMessenger()

    const easters = [
        {active: true, name: "mango", chat: true, audio: "mango", alias: ["mangue"], image: "https://media0.giphy.com/media/S8HRMhG0ecGOTuVnVP/giphy.gif?cid=ecf05e47t1x6bltn2pnjgvbduc5f9na0kwu0uc07egykwrfe&ep=v1_gifs_search&rid=giphy.gif&ct=g"}, 
        {active: true, name: "issou", chat: true, audio: "issou", alias: ["ayaderisitas"], image: "https://media.tenor.com/ZOPUNPN6FugAAAAd/issou-drole.gif"},
        {active: false, name: "idle", chat: false, audio: "idle", alias: [], image: "https://media.tenor.com/acFXt21UBcgAAAAC/sleepy-kid.gif"},
    ]

    const commands= [
        
    ]

    const executeCommand = (cmd, chat) => {

        cmd = cmd.toLowerCase().trim().replace('/', '')

        const easter = easters.find(easter => easter.name === cmd || easter.alias.includes(cmd));

        if(easter && easter.active && (easter.chat === null || easter.chat === chat)) return sendEaster(easter)
        if(easter && !easter.active) return
        
        const command = commands.find(command => command.name === cmd || command.alias.includes(cmd))

        if(!command) return toast.error("Commande inconnue")
        return command.callback()

    }

    const sendEaster = async (easter) => {
        const response = await axios.post('/api/realtime/easter', { group: group.id, easter: easter.name })
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