import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LawyerSingUp from '../../pages/lawyerpages/LawyerSingUP'
import LawyerVerifyOtp from '../../pages/lawyerpages/VerifyOtp'
import ProfessionalDetails from '../../pages/lawyerpages/ProfessionalDetails'

const LawyerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/signup' element={<LawyerSingUp />} />
            <Route path='/verify-otp' element={<LawyerVerifyOtp />} />
            <Route path='/ProfessionalData' element={<ProfessionalDetails />} />
        </Routes>
    )
}

export default LawyerRoutes