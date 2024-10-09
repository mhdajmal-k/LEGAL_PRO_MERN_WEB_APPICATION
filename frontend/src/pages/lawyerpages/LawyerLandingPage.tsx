import React from 'react'
import LegalFooter from '../../layout/footer'
import LawyerHero from '../../components/lawyerComponents/LawyerHero'
import LawyerFeature from '../../components/lawyerComponents/LawyerFeature'
import AdminNavbar from '../../layout/AdminNavbar'

const LawyerLandingPage: React.FC = () => {
    return (
        <div>
            <AdminNavbar />
            <LawyerHero />
            <LawyerFeature />

            <LegalFooter />

        </div>
    )
}

export default LawyerLandingPage
