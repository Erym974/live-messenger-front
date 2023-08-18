import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const RequireVisitor = () => {

    const { logged } = useAuth();
    const location = useLocation();

    return (
        !logged 
            ? <Outlet />
            : <Navigate to={{ pathname: "/settings/general", state: location }} replace />
    )

}

export default RequireVisitor;