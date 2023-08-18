import { useContext } from "react";
import { AuthentificationContext } from "../Context/AuthentificationContext";

const useAuth = () => {
    return useContext(AuthentificationContext);
}

export default useAuth;