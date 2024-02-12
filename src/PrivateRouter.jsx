import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRouter = ({ element, ...rest }) => {
    const isAuthenticated = !!window.localStorage.getItem("userInfo");
    return isAuthenticated ? (
        <Route {...rest} element={element} />
    ) : (
        <Navigate to="/" replace />
    );
}

export default PrivateRouter;