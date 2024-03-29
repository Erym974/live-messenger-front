import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal as closeSliceModal, openModal as openSliceMode } from "../Slices/modalSlice"

export default function useModal() {

    const { modal, isModalOpen, params } = useSelector(state => state.modal)
    const { searchModal } = useSelector(state => state.settings)
    const dispatch = useDispatch()

    const openModal = (name, params = {}) => dispatch(openSliceMode({name, params}))
    const closeModal = () => dispatch(closeSliceModal())

    return { openModal, closeModal, modal, isModalOpen, searchModal, params }

}