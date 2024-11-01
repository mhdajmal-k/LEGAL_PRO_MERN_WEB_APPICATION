import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LawyerSingUp from '../../pages/lawyerpages/LawyerSingUP'
import LawyerVerifyOtp from '../../pages/lawyerpages/VerifyOtp'
import ProfessionalDetails from '../../pages/lawyerpages/ProfessionalDetails'
import LawyerLogin from '../../pages/lawyerpages/Login'
import LawyerLandingPage from '../../pages/lawyerpages/LawyerLandingPage'
import ProfilePage from '../../pages/lawyerpages/ProfilePage'
import LawyerProtectRoute from '../LaywerProtectRoute'
import LawyerPublicRoute from '../LawyerPublicRotute'
import LawyerForgotPassword from '../../pages/lawyerpages/LawyerForgotPassword'
import SlotCreation from '../../pages/lawyerpages/SlotCreaion'
import Appointments from '../../pages/lawyerpages/Appointmnets'
import LawyerSideAppointments from '../../pages/lawyerpages/Appointmnets'
import LawyerViewAppointment from '../../pages/lawyerpages/ViewOneAppointment'
import Blog from '../../pages/lawyerpages/Blog'


const LawyerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route element={<LawyerPublicRoute />}>
                <Route path='/signup' element={<LawyerSingUp />} />
                <Route path='/verify-otp' element={<LawyerVerifyOtp />} />
                <Route path='/ProfessionalData' element={<ProfessionalDetails />} />
                <Route path='/lawyerforgotpassword/:token' element={<LawyerForgotPassword />} />
                <Route path='/login' element={<LawyerLogin />} />
            </Route>
            <Route path='/' element={<LawyerLandingPage />} />
            <Route element={<LawyerProtectRoute />}>
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/slot' element={<SlotCreation />} />
                <Route path='/appointments' element={<Appointments />} />
                <Route path='/view/:AppointmentId' element={<LawyerViewAppointment />} />
            </Route>
            <Route path='*' element={<div className='text-center'>404 Not Found</div>} />
        </Routes >

    )
}

export default LawyerRoutes