import React from 'react'
import {  Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../Hooks/CustomHooks'
import { Loader } from '../Components/Loader'

export default function PublicRoute() {

    const { auth } = useAuth()

    return (
      auth === false ?
        <Outlet /> 
        : 
        <Navigate to="/settings/account" replace />
    )
}
