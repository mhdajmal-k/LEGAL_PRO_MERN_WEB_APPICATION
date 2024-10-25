import React from 'react'
import LegalFooter from '../../layout/footer'
import Navbar from '../../layout/Navbar'
import { useParams } from 'react-router-dom'
import { AppointmentDetails } from '../../components/userComponents/AppoinetmentReview'

const AppointmentReviewAndPayment: React.FC = () => {
    const { id } = useParams()

    return (
        <div><Navbar />
            <AppointmentDetails appointmentId={id} />
            <LegalFooter />
        </div>
    )
}

export default AppointmentReviewAndPayment