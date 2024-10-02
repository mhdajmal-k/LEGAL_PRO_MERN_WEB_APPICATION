import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLoginForm from '../../pages/adminpages/AdminLogin'

const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLoginForm />} />

        </Routes>
    )
}

export default AdminRoutes