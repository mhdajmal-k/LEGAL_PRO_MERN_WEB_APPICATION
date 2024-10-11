import React from 'react'
import AdminNavbar from '../../layout/AdminNavbar'
import LegalFooter from '../../layout/footer'
import LawyerOtpFrom from '../../components/lawyerComponents/Otp'


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