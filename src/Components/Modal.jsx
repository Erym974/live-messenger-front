import React from 'react'
import useModal from '../Hooks/useModal'

export const Modal = () => {

  const { modal, closeModal } = useModal()

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={closeModal}></div>
      <div className="modal-content">
          {modal}
      </div>
    </div>
  )
}
