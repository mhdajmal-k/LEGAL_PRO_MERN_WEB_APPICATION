import AppointmentList from "../../components/userComponents/Appoinement"
import AdminNavbar from "../../layout/AdminNavbar"
import LegalFooter from "../../layout/footer"

const Appointments: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <AppointmentList userType="user" />
            <LegalFooter />
        </div>
    )
}
export default Appointments