import React, { useRef } from 'react'
import useModal from '../Hooks/useModal'
import CreateGroup from './Modals/CreateGroup'

export const Modal = () => {

  const { modal, closeModal } = useModal()

  const allowedModal = useRef({
    "CreateGroup": <CreateGroup />
  })

  const getModalInstance = () => {
    return allowedModal.current[modal]
  }

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={closeModal}></div>
      <div className="modal-content">
          {getModalInstance()}
      </div>
    </div>
  )
}
