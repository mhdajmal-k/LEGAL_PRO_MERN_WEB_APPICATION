import React from "react";
import Navbar from "../../layout/Navbar";
import LegalFooter from "../../layout/footer";
import ProfessionalData from "../../components/lawyerComponents/ProfessionalData";

const ProfessionalDetails: React.FC = () => {
    return <>
        <Navbar />
        <ProfessionalData />
        <LegalFooter />
    </>
}

export default ProfessionalDetails