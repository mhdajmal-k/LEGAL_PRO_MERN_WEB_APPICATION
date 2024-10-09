import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
    console.log(userInfo, "this is the user Info")
    return userInfo && !userInfo.block ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoute;
