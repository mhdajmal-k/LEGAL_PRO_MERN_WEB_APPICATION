import React from 'react';
import { RootState } from '../services/store/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LawyerProtectRoute: React.FC = () => {
    const { lawyerInfo } = useSelector((state: RootState) => state.lawyer);
    return lawyerInfo?.verified ? <Outlet /> : <Navigate to="/lawyer/login" />;
};

export default LawyerProtectRoute;
