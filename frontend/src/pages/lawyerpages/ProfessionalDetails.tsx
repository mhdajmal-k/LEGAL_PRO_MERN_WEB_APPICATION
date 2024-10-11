import React from "react";
<<<<<<< HEAD
import LegalFooter from "../../layout/footer";
import ProfessionalData from "../../components/lawyerComponents/ProfessionalData";
import AdminNavbar from '../../layout/AdminNavbar'

const ProfessionalDetails: React.FC = () => {
    return <>
        <AdminNavbar />
=======
import Navbar from "../../layout/Navbar";
import LegalFooter from "../../layout/footer";
import ProfessionalData from "../../components/lawyerComponents/ProfessionalData";

const ProfessionalDetails: React.FC = () => {
    return <>
        <Navbar />
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
        <ProfessionalData />
        <LegalFooter />
    </>
}

export default ProfessionalDetails