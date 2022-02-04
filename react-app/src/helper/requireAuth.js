import { Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/userContext";

export const RequireAuth = ({ children, redirectTo }) => {

  const { user, loaded } = useUserContext()

  return !loaded && (user ? children : <Navigate replace to={redirectTo}/>);
}