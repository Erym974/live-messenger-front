import React from 'react'
import useModal from '../../Hooks/useModal'
import useTranslation from '../../Hooks/useTranslation'
import { socket } from './../../socket';
import useAuth from '../../Hooks/useAuth';
 
export default function RemoveGroup() {

    const { t } = useTranslation()
    const { closeModal, params } = useModal()
    const { auth } = useAuth()

    /** When the user valide the group creation */
    const handleForm = async (evt) => {
        socket.emit('remove-group', { id: params.id, token: auth })
        closeModal()
    }

  return (
    <>
        <div className="modal-body">
        <h2 className='text-center'>{t('removeGroup.title')}</h2>
        
        <p>{t('removeGroup.confirm')}</p>
        
        <hr className="my-3" />
        </div>
        <div className="modal-footer d-flex g-5 jce">
            <button className="" onClick={handleForm}>{(t('modal.sure'))}</button>
            <button className="bg-danger" onClick={closeModal}>{(t('modal.cancel'))}</button>
        </div>
    </>
  )
}
