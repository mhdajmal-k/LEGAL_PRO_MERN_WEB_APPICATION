import SlotComponents from "../../components/lawyerComponents/SlotComponents"
import AdminNavbar from "../../layout/AdminNavbar"
import LegalFooter from "../../layout/footer"

const SlotCreation: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <SlotComponents />
            <LegalFooter />
        </div>
    )
}
export default SlotCreation