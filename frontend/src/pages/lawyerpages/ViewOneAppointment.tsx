import LegalFooter from '../../layout/footer'
import { useParams } from 'react-router-dom'
import ViewOneAppointmentDetails from '../../components/lawyerComponents/LawyerOneAppointmentView'
import AdminNavbar from '../../layout/AdminNavbar'


const LawyerViewAppointment: React.FC = () => {
    const { AppointmentId } = useParams()

    return (
        <div>
            <AdminNavbar />
            <ViewOneAppointmentDetails AppointmentId={AppointmentId} />
            <LegalFooter />
        </div>
    )
}

export default LawyerViewAppointment
