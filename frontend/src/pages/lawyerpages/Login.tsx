import React from 'react'

import AdminNavbar from '../../layout/AdminNavbar'


import LegalFooter from '../../layout/footer'
import LawyerLoginForm from '../../components/lawyerComponents/LoginForm'

const LawyerLogin: React.FC = () => {
    return (
        <div>

            <AdminNavbar />

            <LawyerLoginForm />
            <LegalFooter />
        </div>
    )
}

export default LawyerLogin
