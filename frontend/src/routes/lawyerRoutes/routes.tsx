import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LawyerSingUp from '../../pages/lawyerpages/LawyerSingUP'
import LawyerVerifyOtp from '../../pages/lawyerpages/VerifyOtp'
import ProfessionalDetails from '../../pages/lawyerpages/ProfessionalDetails'
import LawyerLogin from '../../pages/lawyerpages/Login'

const LawyerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/signup' element={<LawyerSingUp />} />
            <Route path='/verify-otp' element={<LawyerVerifyOtp />} />
            <Route path='/ProfessionalData' element={<ProfessionalDetails />} />
            <Route path='/login' element={<LawyerLogin />} />
            <Route path='/' element={<h1>heLLO HOME LAYWER</h1>} />
        </Routes>
    )
}

export default LawyerRoutes