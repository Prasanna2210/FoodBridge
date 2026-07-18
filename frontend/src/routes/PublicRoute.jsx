import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return (
      <Navigate
        to={user.role === "donor" ? "/donor" : "/recipient"}
        replace
      />
    );
  }

  return children;
};

export default PublicRoute;