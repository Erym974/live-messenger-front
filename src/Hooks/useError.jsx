import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setError as setErrorSlice } from './../Slices/generalSlice'

export default function useError() {

    const { error } = useSelector(state => state.general)
    const dispatch = useDispatch()

    const setError = (message) => dispatch(setErrorSlice(message))

    return { error, setError }

}