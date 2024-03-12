import React, { useState } from 'react'
import useModal from '../../Hooks/useModal'
import { useAuth, useTranslation } from '../../Hooks/CustomHooks'

export default function DeleteAccount() {

    const { closeModal } = useModal()
    const { t } = useTranslation()
    const { user, deleteAccount: deleteAuthAccount } = useAuth()

    const deleteAccount = () => {
        deleteAuthAccount()
        closeModal()
    }

    return (
        <>
            <div className="modal-body">
                <h2 className='text-center'>{t('general.delete_account')}</h2>

                <p className="text-center text-dark my-3">{t('general.delete_account_confirmation')}</p>

                <hr className="my-3" />
            </div>
            <div className="modal-footer d-flex g-5 jce">
                <button className="bg-danger" onClick={deleteAccount}>{(t('modal.delete'))}</button>
                <button className="bg-primary" onClick={closeModal}>{(t('modal.cancel'))}</button>
            </div>
        </>
    )
}
