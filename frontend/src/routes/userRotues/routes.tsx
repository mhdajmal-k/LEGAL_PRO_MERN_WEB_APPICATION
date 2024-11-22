import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoadingFallback from '../../components/LoadingFallback';
import Blogs from '../../pages/userPages/BlogList';
import ViewBlogUserSide from '../../pages/userPages/UserBlogDetails';
import Wallet from '../../components/Wallet';

// Lazy loaded components
const SignUp = lazy(() => import('../../pages/userPages/SignUp'));
const OtpVerify = lazy(() => import('../../pages/userPages/OtpVerify'));
const Home = lazy(() => import('../../pages/userPages/Home'));
const LoginPage = lazy(() => import('../../pages/userPages/LoginPage'));
const PublicRoute = lazy(() => import('../UserpublicRoute'));
const UserProfileLayout = lazy(() => import('../../components/userComponents/UserProfileLayout'));
const ProfileData = lazy(() => import('../../components/userComponents/ProfileData'));
const ProtectRoute = lazy(() => import('../UserProtectRoute'));
const ForgotPasswordForm = lazy(() => import('../../components/ForgotPasswordFrom'));
const ResetPassword = lazy(() => import('../../components/userComponents/ResetPassword'));
const LawyersList = lazy(() => import('../../pages/userPages/LawyersList'));
const LawyerProfile = lazy(() => import('../../pages/userPages/LawyerProfile'));
const LawyerSlots = lazy(() => import('../../pages/userPages/LawyerSlots'));
const AppointmentReviewAndPayment = lazy(() => import('../../pages/userPages/AppointmentReviewAndPayment'));
const AppointmentSuccess = lazy(() => import('../../pages/userPages/AppoitnmentSuccess'));
const AppointmentList = lazy(() => import('../../components/userComponents/Appoinement'));
const ViewAppointment = lazy(() => import('../../pages/userPages/ViewAppontment'));
// const UserVideoCall = lazy(() => import('../../pages/userPages/UserVideoCall'));

const UserRouters: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otpVerify' element={<OtpVerify />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forgotpassword/:token' element={<ForgotPasswordForm />} />
        </Route>

        <Route path='/' element={<Home />} />
        <Route path='/findLawyers' element={<LawyersList />} />

        <Route element={<ProtectRoute />}>
          <Route path="/viewLawyer/:id" element={<LawyerProfile />} />
          <Route path="/slots/:id" element={<LawyerSlots />} />
          <Route path="/payment/:id" element={<AppointmentReviewAndPayment />} />
          <Route path="/paymentSuccess/:AppointmentId" element={<AppointmentSuccess />} />
          <Route path="/viewAppointment/:AppointmentId" element={<ViewAppointment />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path='/blog/:blogId' element={<ViewBlogUserSide />} />
          <Route path='/profile' element={<UserProfileLayout />}>
            <Route index element={<ProfileData />} />
            <Route path='appointment' element={<AppointmentList userType="user" />} />
            <Route path='wallet' element={<Wallet />} />
            <Route path='changePassword' element={<ResetPassword />} />
          </Route>
        </Route>

        <Route path='*' element={<div className='text-center'>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default UserRouters;
