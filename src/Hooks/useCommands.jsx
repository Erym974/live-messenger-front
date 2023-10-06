import { useEffect, useState } from "react"
import useMessenger from "./useMessenger"
import useApi from "./useApi"
import toast from "react-hot-toast"
import Notifications from "../Components/Notifications/Notifications"

export default function useCommands() {

    const { group } = useMessenger()
    const { post: sendPokeApi } = useApi("api/realtime/pokes")

    const easters = [
        {active: true, name: "mango", chat: true, audio: "mango", alias: ["mangue"], image: "https://media0.giphy.com/media/S8HRMhG0ecGOTuVnVP/giphy.gif?cid=ecf05e47t1x6bltn2pnjgvbduc5f9na0kwu0uc07egykwrfe&ep=v1_gifs_search&rid=giphy.gif&ct=g"}, 
        {active: true, name: "issou", chat: true, audio: "issou", alias: ["ayaderisitas"], image: "https://media.tenor.com/ZOPUNPN6FugAAAAd/issou-drole.gif"},
        {active: false, name: "idle", chat: false, audio: "idle", alias: [], image: "https://media.tenor.com/acFXt21UBcgAAAAC/sleepy-kid.gif"},
    ]

    const commands= [
        {command: "poke", alias: ["pokes"], callback: execPoke},
    ]

    const executeCommand = (cmd, chat) => {

        cmd = cmd.toLowerCase().trim().replace('/', '')

        const easter = easters.find(easter => easter.name === cmd || easter.alias.includes(cmd));

        if(easter && easter.active && (easter.chat === null || easter.chat === chat)) return execEaster(easter)
        if(easter && !easter.active) return
        
        const command = commands.find(command => command.name === cmd || command.alias.includes(cmd))

        if(!command) return toast.error("Commande inconnue")
        return command.callback()

    }

    const execEaster = (easter) => {
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

    async function execPoke() {
        if(!group) return

        Notifications.Promise(async () => {
            const response = await sendPokeApi({ group: group.id })
            if(!response?.status) return false
            return true
        }, 'Envoi en cours...', 'Poke envoyé', 'Une erreur est survenue')

        // toast.promise(new Promise(async (resolve, reject) => {
        //     const response = await sendPokeApi({ group: group.id })
        //     if(!response?.status) return reject()
        //     resolve()
        // }),
        // {
        //     loading: 'Envoi en cours...',
        //     success: 'Poke envoyé',
        //     error: 'Une erreur est survenue',
        // })
    }

    return { executeCommand }

}