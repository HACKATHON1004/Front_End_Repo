import React from 'react';
import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';

const ProtectedRoute = ({ element: Component }) => {
    const token = cookie.get("token");

    return token&&token!=="null" ? Component : <Navigate to="/" />;
}

export default ProtectedRoute;
