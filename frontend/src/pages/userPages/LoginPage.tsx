import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import LoginForm from '../../components/userComponents/LoginForm'

const LoginPage: React.FC = () => {
    return (
        <div><Navbar />
            <LoginForm />
            <LegalFooter />

        </div>
    )
}

export default LoginPage