import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    return userInfo ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
