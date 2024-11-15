import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminPublicRoute from '../AdminPublicRoute';
import AdminProtectRoute from '../AdminProtectRoute';
import { AdminDashBoard } from '../../pages/adminpages/adminDashBoard';
import LoadingFallback from '../../components/LoadingFallback';
const AdminLoginForm = lazy(() => import('../../pages/adminpages/AdminLogin'));
const UsersList = lazy(() => import('../../pages/adminpages/UserList'));
const AdminLayout = lazy(() => import('../../components/AdminComponents.tsx/AdminLayout'));
const LawyerList = lazy(() => import('../../pages/adminpages/LaywerList'));
const ApprovalLawyerList = lazy(() => import('../../pages/adminpages/ApprovalLawyerList'));
const AppointmentListAdminSide = lazy(() => import('../../components/AdminComponents.tsx/AppointmentList'));
const ViewAppointmentDetails = lazy(() => import('../../components/AdminComponents.tsx/ViewAppointmentDetails'));



const AdminRoutes: React.FC = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>


            <Routes>
                <Route element={<AdminPublicRoute />}>

                    <Route path='/login' element={<AdminLoginForm />} />
                </Route>
                <Route element={<AdminProtectRoute />}>
                    <Route path='/' element={<AdminLayout />}>
                        <Route path='dashBoard' element={<AdminDashBoard />} />
                        <Route path='users' element={<UsersList />} />
                        <Route path='lawyers' element={< LawyerList />} />
                        <Route path='appointments' element={<AppointmentListAdminSide />} />
                        <Route path='view/:appointmentId' element={<ViewAppointmentDetails />} />
                        <Route path='PendingApproval' element={<ApprovalLawyerList />} />
                        <Route path='lawyers' element={<LawyerList />} />
                    </Route>
                </Route>

            </Routes>
        </Suspense>
    );
}

export default AdminRoutes;
