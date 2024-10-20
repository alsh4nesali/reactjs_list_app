import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";

// Define props for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
  
    // If the user is authenticated and tries to access the login page,
    // redirect them to the home page
    const isLoginPage = window.location.pathname === "/";
    if (isAuthenticated && isLoginPage) {
      return <Navigate to="/Home" />;
    }
  
    return <>{children}</>;
  };

export default PrivateRoute;
