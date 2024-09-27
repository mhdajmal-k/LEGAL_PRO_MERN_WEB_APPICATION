import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'
import HeroSection from '../../components/userComponents/HeroSection'
import AboutUs from '../../components/userComponents/aboutus'

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <AboutUs />
            <LegalFooter />
        </div>

    )
}

export default Home