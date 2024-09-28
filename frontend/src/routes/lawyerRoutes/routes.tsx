import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LawyerSingUp from '../../pages/lawyerpages/LawyerSingUP'

const LawyerRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/signup' element={<LawyerSingUp />} />
        </Routes>
    )
}

export default LawyerRoutes