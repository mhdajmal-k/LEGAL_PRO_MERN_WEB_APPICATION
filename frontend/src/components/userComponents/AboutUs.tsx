
import React from 'react';
import about from "../../assets/images/test.jpg";

const AboutUs: React.FC = () => {
    return (
        <div className='min-h-screen p-8'>
            <h1 className='text-center mb-5 font-bold text-2xl'>About Us</h1>
            <div className='max-w-6xl mx-auto'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div className='space-y-6 w-full' >
                        <div className='bg-white   rounded-lg shadow-lg overflow-hidden'>
                            <img src={about} alt="About Us" className='object-fill' />
                        </div>

                    </div>
                    <div className='space-y-6'>
                        <div className='bg-white rounded-lg shadow-lg p-6'>
                            <h3 className='text-orange-500 font-medium mb-2'>How It Started</h3>
                            <h2 className='text-3xl font-bold mb-4'>Empowering Individuals with Trusted Legal Support</h2>
                            <p className='text-gray-600'>
                                LawyerPro connects individuals with seasoned legal professionals for expert advice in areas like corporate, family, and intellectual property law. Our platform makes it easy to find, consult, and book appointments with qualified advocates, offering a seamless and user-friendly experience for all your legal needs.
                            </p>
                        </div>
                        <div className='bg-white rounded-lg shadow-lg p-6'>
                            <h3 className='text-orange-500 font-semibold mb-2'>OUR MISSION</h3>
                            <h2 className='text-3xl font-bold mb-4'>Transforming Legal Access Globally"</h2>
                            <p className='text-gray-600'>
                                To revolutionize legal advice by connecting users with trusted professionals through a modern, secure platform. We enhance access to quality legal services with technology and a client-focused approach, ensuring personalized and reliable assistance.
                            </p>
                        </div>

                    </div>



                </div>

            </div>
            <div className='bg-gray-100 my-3 w-full rounded-lg shadow-lg p-6'>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='text-center bg-white'>
                        <h3 className='text-2xl font-bold text-black'>1000+</h3>
                        <h5 className='text-sm text-gray-500'>Trusted Clients</h5>
                    </div>
                    <div className='text-center bg-white'>
                        <h3 className='text-2xl font-bold text-black'>300+</h3>
                        <h5 className='text-sm text-gray-500'>Expert Lawyers</h5>
                    </div>
                    <div className='text-center bg-white'>
                        <h3 className='text-2xl font-bold text-black'>100+</h3>
                        <h5 className='text-sm text-gray-500'>Published Blogs</h5>
                    </div>
                    <div className='text-center bg-white'>
                        <h3 className='text-2xl font-bold text-black'>1000+</h3>
                        <h5 className='text-sm text-gray-500'>Successful Consultants</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default AboutUs;
// 
