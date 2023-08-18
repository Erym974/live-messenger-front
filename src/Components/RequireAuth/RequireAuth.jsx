import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";

const RequireAuth = () => {

    const { logged } = useAuth();
    const location = useLocation();

    return (
        logged 
            ? <Outlet />
            : <Navigate to={{ pathname: "/auth/login", state: location }} replace />
    )

}

export default RequireAuth;