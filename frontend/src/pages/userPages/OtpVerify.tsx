import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import OtpFrom from '../../components/userComponents/Otp'

const OtpVerify: React.FC = () => {
    return (
        <div>
            <Navbar />
            <OtpFrom />
            <LegalFooter />
        </div>
    )
}

export default OtpVerify