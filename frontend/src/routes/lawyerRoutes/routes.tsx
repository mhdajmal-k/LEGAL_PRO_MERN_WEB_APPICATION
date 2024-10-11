import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LawyerSingUp from '../../pages/lawyerpages/LawyerSingUP'
import LawyerVerifyOtp from '../../pages/lawyerpages/VerifyOtp'
import ProfessionalDetails from '../../pages/lawyerpages/ProfessionalDetails'
import LawyerLogin from '../../pages/lawyerpages/Login'
<<<<<<< HEAD
import LawyerLandingPage from '../../pages/lawyerpages/LawyerLandingPage'
import ProfilePage from '../../pages/lawyerpages/ProfilePage'
import LawyerProtectRoute from '../LaywerProtectRoute'
import LawyerPublicRoute from '../LawyerPublicRotute'
import LawyerForgotPassword from '../../pages/lawyerpages/LawyerForgotPassword'
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611

const LawyerRoutes: React.FC = () => {
    return (
        <Routes>
<<<<<<< HEAD
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
            </Route>
        </Routes >
=======
            <Route path='/signup' element={<LawyerSingUp />} />
            <Route path='/verify-otp' element={<LawyerVerifyOtp />} />
            <Route path='/ProfessionalData' element={<ProfessionalDetails />} />
            <Route path='/login' element={<LawyerLogin />} />
            <Route path='/' element={<h1>heLLO HOME LAYWER</h1>} />
        </Routes>
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
    )
}

export default LawyerRoutes