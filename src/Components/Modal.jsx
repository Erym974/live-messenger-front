import React, { useRef } from 'react'
import useModal from '../Hooks/useModal'
import CreateGroup from './Modals/CreateGroup'
import Members from './Modals/Members'
import Reactions from './Modals/Reactions'
import AddMember from './Modals/AddMember'
import RemoveGroup from './Modals/RemoveGroup'
import LeaveGroup from './Modals/LeaveGroup'
import EditGroup from './Modals/EditGroup'
import DeleteAccount from './Modals/DeleteAccount'

export const Modal = () => {

  const { modal, closeModal } = useModal()

  const allowedModal = useRef({
    "CreateGroup": <CreateGroup />,
    "Members": <Members />,
    "Reactions": <Reactions />,
    "AddMember": <AddMember />,
    "LeaveGroup": <LeaveGroup />,
    "RemoveGroup": <RemoveGroup />,
    "EditGroup": <EditGroup />,
    "DeleteAccount": <DeleteAccount />,
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
