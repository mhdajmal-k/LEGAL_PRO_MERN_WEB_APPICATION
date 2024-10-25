import LegalFooter from '../../layout/footer'
import { useParams } from 'react-router-dom'
import Navbar from '../../layout/Navbar'
import ViewOneAppointment from '../../components/userComponents/ViewOneAppointment'


const ViewAppointment: React.FC = () => {
    const { AppointmentId } = useParams()

    return (
        <div>
            <Navbar />
            <ViewOneAppointment AppointmentId={AppointmentId} />
            <LegalFooter />
        </div>
    )
}

export default ViewAppointment
