// AdminRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLoginForm from '../../pages/adminpages/AdminLogin';

import UsersList from '../../pages/adminpages/UserList';
import LawyerList from '../../pages/adminpages/LawyerList';
import AdminLayout from '../../components/AdminComponents.tsx/AdminLayout';
import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';


const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLoginForm />} />
            <Route path='/' element={<AdminLayout />}>
                <Route path='dashBoard' element={<AdminDashBoard />} />
                <Route path='users' element={<UsersList />} />
                <Route path='lawyers' element={<LawyerList />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;
