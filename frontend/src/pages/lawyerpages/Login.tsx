import React from 'react'
import LegalFooter from '../../layout/footer'
import LawyerLoginForm from '../../components/lawyerComponents/LoginForm'
import AdminNavbar from '../../layout/AdminNavbar'

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
