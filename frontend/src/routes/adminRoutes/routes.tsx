// AdminRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginForm from '../../pages/adminpages/AdminLogin';

import UsersList from '../../pages/adminpages/UserList';
import AdminPublicRoute from '../AdminPublicRoute';
import AdminProtectRoute from '../AdminProtectRoute';
import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
import LawyerList from '../../pages/adminpages/LaywerList';
import ApprovalLawyerList from '../../pages/adminpages/ApprovalLawyerList';

// import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
// import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
// import AdminPublicRoute from '../AdminPublicRoute';
// import AdminProtectRoute from '../AdminProtectRoute';
// import ApprovalLawyerList from '../../pages/adminpages/ApprovalLawyerList';
// import LawyerList from '../../pages/adminpages/LaywerList';
// import LawyerList from '../../pages/adminpages/LawyerList';
// import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
// import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
// import LawyerPublicRoute from '../AdminPublicRoute';
// import AdminProtectRoute from '../AdminProtectRoute';



const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<AdminPublicRoute />}>
                {/* <Route element={<LawyerPublicRoute />}> */}
                <Route path='/login' element={<AdminLoginForm />} />
            </Route>
            <Route element={<AdminProtectRoute />}>
                <Route path='/' element={<AdminLayout />}>
                    <Route path='dashBoard' element={<AdminDashBoard />} />
                    <Route path='users' element={<UsersList />} />
                    <Route path='lawyers' element={< LawyerList />} />
                    <Route path='PendingApproval' element={<ApprovalLawyerList />} />
                    <Route path='lawyers' element={<LawyerList />} />
                </Route>
            </Route>

        </Routes>
    );
}

export default AdminRoutes;
