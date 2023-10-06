import { useRef } from "react"
import axios from "axios";
import { useSelector } from "react-redux";

export default function useApi(path = "api") {

    const { current: apiPath } = useRef(`http://127.0.0.1:8000/${path}`)
    const { auth } = useSelector(state => state.auth)

    const post = async (datas) => {

        const headers = {}
        if(datas instanceof FormData) headers['Content-Type'] = 'multipart/form-data'
        if(auth) headers['Authorization'] = `Bearer ${auth}`

        try {
            const response = await axios.post(apiPath, datas, {
                headers
            })
            return response?.data
        } catch(e) {
            return e?.response?.data
        }
    }

    const delet = async (datas) => {

        const headers = {}
        if(datas instanceof FormData) headers['Content-Type'] = 'multipart/form-data'
        if(auth) headers['Authorization'] = `Bearer ${auth}`

        try {
            const response = await axios.delete(apiPath, {
                headers,
                data: datas
            })
            return response?.data
        } catch(e) {
            return e?.response?.data
        }
    }

    const patch = async (datas) => {

        const headers = {}
        if(auth) headers['Authorization'] = `Bearer ${auth}`

        try {
            const response = await axios.patch(apiPath, datas, {
                headers
            })
            return response?.data
        } catch(e) {
            return e?.response?.data
        }
    }

    const get = async (params = null) => {

        const headers = {}
        if(auth) headers['Authorization'] = `Bearer ${auth}`

        const getPath = apiPath
        let finalPath = getPath

        if(params) {
            if(!path.includes('?')) {
                finalPath = `${getPath}/${params.join('/')}`
            } else {
                let temp = getPath.split('?')
                finalPath = finalPath.split('?')[0]
                finalPath = `${finalPath}/${params.join('/')}?${temp[1]}`
            }
        } else {
            finalPath = getPath
        }

        try {
            const response = await axios.get(finalPath, {
                headers
            })
            return response?.data
        } catch(e) {
            return e?.response?.data
        }
    }

    return { post, get, patch, delet }

}