import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LawyerSignUp = lazy(() => import('../../pages/lawyerpages/LawyerSingUP'));
const LawyerVerifyOtp = lazy(() => import('../../pages/lawyerpages/VerifyOtp'));
const ProfessionalDetails = lazy(() => import('../../pages/lawyerpages/ProfessionalDetails'));
const LawyerLogin = lazy(() => import('../../pages/lawyerpages/Login'));
const LawyerLandingPage = lazy(() => import('../../pages/lawyerpages/LawyerLandingPage'));
const ProfilePage = lazy(() => import('../../pages/lawyerpages/ProfilePage'));
const LawyerForgotPassword = lazy(() => import('../../pages/lawyerpages/LawyerForgotPassword'));
const SlotCreation = lazy(() => import('../../pages/lawyerpages/SlotCreaion'));
const Appointments = lazy(() => import('../../pages/lawyerpages/Appointmnets'));
const LawyerViewAppointment = lazy(() => import('../../pages/lawyerpages/ViewOneAppointment'));
const Blog = lazy(() => import('../../pages/lawyerpages/Blog'));

import LawyerProtectRoute from '../LaywerProtectRoute';
import LawyerPublicRoute from '../LawyerPublicRotute';
import LoadingFallback from '../../components/LoadingFallback';
import ViewBlog from '../../pages/lawyerpages/ViewBlog';



const LawyerRoutes: React.FC = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route element={<LawyerPublicRoute />}>
                    <Route path='/signup' element={<LawyerSignUp />} />
                    <Route path='/verify-otp' element={<LawyerVerifyOtp />} />
                    <Route path='/ProfessionalData' element={<ProfessionalDetails />} />
                    <Route path='/lawyerforgotpassword/:token' element={<LawyerForgotPassword />} />
                    <Route path='/login' element={<LawyerLogin />} />
                </Route>

                <Route path='/' element={<LawyerLandingPage />} />

                <Route element={<LawyerProtectRoute />}>
                    <Route path='/profile' element={<ProfilePage />} />
                    <Route path='/blog' element={<Blog />} />
                    <Route path='/blog/:blogId' element={<ViewBlog />} />
                    <Route path='/slot' element={<SlotCreation />} />
                    <Route path='/appointments' element={<Appointments />} />
                    <Route path='/view/:AppointmentId' element={<LawyerViewAppointment />} />
                </Route>

                <Route path='*' element={<div className='text-center'>404 Not Found</div>} />
            </Routes>
        </Suspense>
    );
}

export default LawyerRoutes;
