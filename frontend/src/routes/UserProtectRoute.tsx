import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    return userInfo?._id ? <Outlet /> : <Navigate to="/login" />;


};

export default ProtectRoute;
