import React from 'react'
import Navbar from '../../layout/Navbar'
import LegalFooter from '../../layout/footer'

const Home: React.FC = () => {
    return (
        <div>
            <Navbar />
            <div className='min-h-screen'>
                <div className=' flex justify-center '>
                    <div className='items-center text-3xl'> <h1>WELCOME TO HOME PAGE</h1></div>
                </div>
            </div>
            <LegalFooter />
        </div>

    )
}

export default Home