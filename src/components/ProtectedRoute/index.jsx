import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, user, role }) => {
    const jwt = Cookies.get("jwt_token");

    if (!jwt) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <h1>Loading...</h1>;
    }

    if (user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;