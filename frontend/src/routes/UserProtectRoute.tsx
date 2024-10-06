import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    return userInfo ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoute;
