import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LawyerPublicRoute: React.FC = () => {
    const { lawyerInfo } = useSelector((state: RootState) => state.lawyer);
    return lawyerInfo?.userName ? <Navigate to="/lawyer" /> : <Outlet />;
};

export default LawyerPublicRoute;
