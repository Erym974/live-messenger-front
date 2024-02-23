import React, { useRef } from 'react'
import useModal from '../Hooks/useModal'
import CreateGroup from './Modals/CreateGroup'
import Members from './Modals/Members'
import Reactions from './Modals/Reactions'

export const Modal = () => {

  const { modal, closeModal } = useModal()

  const allowedModal = useRef({
    "CreateGroup": <CreateGroup />,
    "Members": <Members />,
    "Reactions": <Reactions />,
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
