import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'


import SuccessPaymentAppointment from '../../components/userComponents/SuccessPaymentAppointment'


const AppointmentSuccess: React.FC = () => {

    const { AppointmentId } = useParams()

    return (
        <div>
            <Navbar />
            <SuccessPaymentAppointment AppointmentId={AppointmentId} />
            <LegalFooter />
        </div>
    )
}

export default AppointmentSuccess
