import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectRoute: React.FC = () => {
    const { adminInfo } = useSelector((state: RootState) => state.admin);
    return adminInfo ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminProtectRoute;
