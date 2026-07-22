import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../Loader"

const ProtectedRoute = ({ children, user, role }) => {
    const jwt = Cookies.get("jwt_token");

    if (!jwt) {
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <Loader text="Waking up the server, please wait..." />;
    }

    if (user.role !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;