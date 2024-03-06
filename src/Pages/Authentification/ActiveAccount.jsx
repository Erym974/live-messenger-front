import React, { useEffect, useState } from 'react'
import useTranslation from '../../Hooks/useTranslation';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

export const ActiveAccount = () => {

    const { sendActiveAccount } = useAuth();
    const { token } = useParams();
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        sendActiveAccount(token)
    }, [token])

  
    return (<></>)
}
