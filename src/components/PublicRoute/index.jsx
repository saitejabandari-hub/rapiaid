import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({children,user}) => {

    const jwt = Cookies.get("jwt_token");

    if (jwt && user) {
        
        return <Navigate to={`/${user.role}`} replace />;
    }

    return children;
};

export default PublicRoute;