import React from 'react'
import {  Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../Hooks/CustomHooks'
import { Loader } from '../Components/Loader'

export default function PublicRoute() {

    const { user, loading } = useAuth()

    return (
      !loading ?
        user === null ?
          <Outlet /> 
          : 
          <Navigate to="/messenger" replace />
      :
      <div className="d-flex aic jcc h-100">
        <Loader />
      </div>
    )
}
