import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../Hooks/CustomHooks'
import { Loader } from '../Components/Loader'

export default function ProtectedRoute() {

    const { user, loading } = useAuth()
    const location = useLocation()

    return (
      !loading ?
        user != null ?
          <Outlet /> 
          : 
          <Navigate to="/auth/login" state={{ from: location }} replace />
      :
      <div className="d-flex aic jcc h-100">
        <Loader />
      </div>
    )
}
