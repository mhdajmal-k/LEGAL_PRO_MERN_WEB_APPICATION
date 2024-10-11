import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

<<<<<<< HEAD
const AdminPublicRoute: React.FC = () => {
=======
const LawyerPublicRoute: React.FC = () => {
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
    const { adminInfo } = useSelector((state: RootState) => state.admin);
    return adminInfo ? <Navigate to="/admin/dashboard" /> : <Outlet />;
};

<<<<<<< HEAD
export default AdminPublicRoute;
=======
export default LawyerPublicRoute;
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
