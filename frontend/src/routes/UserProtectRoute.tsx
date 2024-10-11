import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute: React.FC = () => {
    const { userInfo } = useSelector((state: RootState) => state.user);
<<<<<<< HEAD
    console.log(userInfo, "this is the user Info")
    return userInfo && !userInfo.block ? <Outlet /> : <Navigate to="/" />;
=======
    return userInfo ? <Outlet /> : <Navigate to="/" />;
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
};

export default ProtectRoute;
