import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPublicRoute: React.FC = () => {
    const { adminInfo } = useSelector((state: RootState) => state.admin);
    return adminInfo ? <Navigate to="/admin/dashboard" /> : <Outlet />;
};

export default AdminPublicRoute;
