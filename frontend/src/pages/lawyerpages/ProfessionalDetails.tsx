import React from "react";
import LegalFooter from "../../layout/footer";
import ProfessionalData from "../../components/lawyerComponents/ProfessionalData";
import AdminNavbar from '../../layout/AdminNavbar'

const ProfessionalDetails: React.FC = () => {
    return <>
        <AdminNavbar />
        <ProfessionalData />
        <LegalFooter />
    </>
}

export default ProfessionalDetails