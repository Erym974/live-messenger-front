import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { closeModal as closeSliceModal, openModal as openSliceMode } from "../Slices/modalSlice"

export default function useModal() {

    const { modal, isModalOpen } = useSelector(state => state.modal)
    const dispatch = useDispatch()

    const openModal = (Element) => dispatch(openSliceMode(Element))
    const closeModal = () => dispatch(closeSliceModal())

    return { openModal, closeModal, modal, isModalOpen }

}