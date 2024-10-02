import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import LawyerLoginForm from '../../components/lawyerComponents/LoginForm'

const LawyerLogin: React.FC = () => {
    return (
        <div>
            <Navbar />
            <LawyerLoginForm />
            <LegalFooter />
        </div>
    )
}

export default LawyerLogin
