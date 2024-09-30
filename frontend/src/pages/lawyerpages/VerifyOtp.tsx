import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import LawyerOtpFrom from '../../components/lawyerComponents/Otp'

const LawyerVerifyOtp: React.FC = () => {
    return (
        <div>
            <Navbar />
            <LawyerOtpFrom />
            <LegalFooter />
        </div>
    )
}

export default LawyerVerifyOtp