import AppointmentListLawyerSide from "../../components/lawyerComponents/AppointmentList"
import AdminNavbar from "../../layout/AdminNavbar"
import LegalFooter from "../../layout/footer"

const LawyerSideAppointments: React.FC = () => {

    return (
        <div>
            <AdminNavbar />
            <AppointmentListLawyerSide userType="lawyer" />
            <LegalFooter />
        </div>
    )
}
export default LawyerSideAppointments