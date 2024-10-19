import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import HeroSection from '../../components/userComponents/HeroSection'
import AboutUs from '../../components/userComponents/AboutUs'

import UserFeature from "../../components/userComponents/UserFeature"
import LegalServices from '../../components/userComponents/LegalServices'


const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutUs />
            <UserFeature />
            <LegalServices />

            <LegalFooter />
        </div>

    )
}

export default Home