import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children, redirectTo, user }) => {
    return user ? children : <Navigate replace to={redirectTo}/>;
  }