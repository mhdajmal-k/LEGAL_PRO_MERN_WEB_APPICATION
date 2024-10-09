import React from 'react'
import LegalFooter from '../../layout/footer'
import LawyerOtpFrom from '../../components/lawyerComponents/Otp'
import AdminNavbar from '../../layout/AdminNavbar'

const LawyerVerifyOtp: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <LawyerOtpFrom />
            <LegalFooter />
        </div>
    )
}

export default LawyerVerifyOtp