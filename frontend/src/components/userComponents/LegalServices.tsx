import { Button } from '@nextui-org/react';
import React from 'react';
import { FaBuilding, FaLaptopCode, FaGavel, FaHome, FaBalanceScale, FaUserShield } from 'react-icons/fa';  // Import relevant icons


const LegalServices: React.FC = () => {
    return (
        <div className='min-h-screen p-6 bg-primary'>

            <h1 className='text-center mb-5 font-bold text-3xl text-white'>Our Legal Services</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto'>


                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'>
                            <FaBuilding className='text-white text-2xl' />  {/* Corporate Law Icon */}

                        </span>
                    </div>
                    <h1 className='font-semibold text-xl'>Corporate Law</h1>
                    <h5 className='my-4 text-gray-600'>
                        Expert legal guidance in contracts, mergers, governance, and compliance.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>


                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'> <FaLaptopCode className='text-white text-2xl' /> </span>
                    </div>
                    <h1 className='font-semibold text-xl'>Cyber Law</h1>
                    <h5 className='my-4 text-gray-600'>
                        Legal support for data privacy, internet regulation, and compliance.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>

                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'> <FaHome className='text-white text-2xl' />  {/* Real Estate Law Icon */}</span>
                    </div>
                    <h1 className='font-semibold text-xl'>Real Estate Law</h1>
                    <h5 className='my-4 text-gray-600'>
                        Comprehensive services for real estate transactions, disputes, and zoning.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>


                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'> <FaUserShield className='text-white text-2xl' />  </span>
                    </div>
                    <h1 className='font-semibold text-xl'>Family Law</h1>
                    <h5 className='my-4 text-gray-600'>
                        Support for divorce, custody, and other family matters.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>


                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'>   <FaBalanceScale className='text-white text-2xl' /></span>
                    </div>
                    <h1 className='font-semibold text-xl'>Intellectual Property</h1>
                    <h5 className='my-4 text-gray-600'>
                        Protect your innovations and creative works with legal support.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>


                <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                    <div className='bg-primary rounded-full shadow-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center'>

                        <span className='text-white font-bold text-2xl'><FaGavel className='text-white text-2xl' /> </span>
                    </div>
                    <h1 className='font-semibold text-xl'>Criminal Law</h1>
                    <h5 className='my-4 text-gray-600'>
                        Defense and legal representation for criminal matters.
                    </h5>
                    <Button
                        color='primary'
                        type='submit'
                        className='w-full mt-3'
                    >
                        Book Now
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default LegalServices;
