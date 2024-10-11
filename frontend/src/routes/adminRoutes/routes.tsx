// AdminRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginForm from '../../pages/adminpages/AdminLogin';

import UsersList from '../../pages/adminpages/UserList';
<<<<<<< HEAD
import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
import AdminPublicRoute from '../AdminPublicRoute';
import AdminProtectRoute from '../AdminProtectRoute';
import ApprovalLawyerList from '../../pages/adminpages/ApprovalLawyerList';
import LawyerList from '../../pages/adminpages/LaywerList';
=======
import LawyerList from '../../pages/adminpages/LawyerList';
import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
import LawyerPublicRoute from '../AdminPublicRoute';
import AdminProtectRoute from '../AdminProtectRoute';
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611



const AdminRoutes: React.FC = () => {
    return (
        <Routes>
<<<<<<< HEAD
            <Route element={<AdminPublicRoute />}>
=======
            <Route element={<LawyerPublicRoute />}>
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
                <Route path='/login' element={<AdminLoginForm />} />
            </Route>
            <Route element={<AdminProtectRoute />}>
                <Route path='/' element={<AdminLayout />}>
                    <Route path='dashBoard' element={<AdminDashBoard />} />
                    <Route path='users' element={<UsersList />} />
<<<<<<< HEAD
                    <Route path='lawyers' element={< LawyerList />} />
                    <Route path='PendingApproval' element={<ApprovalLawyerList />} />
=======
                    <Route path='lawyers' element={<LawyerList />} />
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
                </Route>
            </Route>

        </Routes>
    );
}

export default AdminRoutes;
