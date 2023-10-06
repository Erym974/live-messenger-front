import { useRef, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { addSubscribtion } from "../Slices/realtimeSlice"
import useAuth from "./useAuth"

export default function useRealtime() {

    const { current: topic_base } = useRef("http://localhost:3000")
    const dispatch = useDispatch()
    const { user } = useAuth()
    const { subscribions } = useSelector(state => state.realtime)

    const Subscribe = (topic, callback) => {
        const url = new URL('http://localhost:8001/.well-known/mercure')
        const final_topic = topic_base + (!topic.startsWith('/') ? '/' : '') + topic;
        url.searchParams.append('topic', final_topic)

        try {
            const eventSource = new EventSource(url, { withCredentials: false })

            if(subscribions.find(subscription => subscription === eventSource.url)) return
            dispatch(addSubscribtion(eventSource.url))

            eventSource.onmessage = event => {
                const datas = JSON.parse(event.data);
                callback(datas)
            }
        } catch(e) {
            console.log(e);
        }
    }

    return { Subscribe }
}