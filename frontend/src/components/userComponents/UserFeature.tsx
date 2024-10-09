import React from 'react';
import CLENTTOCLIENT from "../../assets/images/CLENT TO CLIENT.jpg";
import ENNOVATIVE from "../../assets/images/ENNOVATIVE.jpeg";
import { motion } from 'framer-motion';
import SPECIALISE from "../../assets/images/SPECIALISE EXP.jpg";




const UserFeature: React.FC = () => {
    return (
        <div className='container mt-10'>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
            </div>

            <div className='min-h-screen container mx-auto'>
                <div className='max-w-6xl mx-auto'>



                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}

                        className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 ml-10 mb-10'>
                        <div className="w-[75%] lg:w-1/3 mb-8 mt-3 lg:mb-0">
                            <img src={CLENTTOCLIENT} alt="Laptop Consultation" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                        <div className="lg:w-2/3 lg:pl-8">
                            <h2 className="text-3xl font-bold mb-4">Client-Focused Service</h2>
                            <p className="text-gray-600">
                                We take the time to understand each client's unique situation and provide custom-tailored legal strategies. Our commitment to clear and responsive communication ensures you stay informed and confident at every step.                            </p>
                        </div>

                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 ml-10 mb-10'>
                        <div className="lg:w-2/3 lg:pl-8">
                            <h2 className="text-3xl font-bold mb-4">Specialized Expertise</h2>
                            <p className="text-gray-600">
                                Our team has in-depth knowledge and experience in various fields, including corporate law, intellectual property, and litigation. This allows us to offer comprehensive legal support for businesses of all sizes.                            </p>
                        </div>
                        <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                            <img src={SPECIALISE} alt="Laptop Consultation" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 ml-10 mb-10'>
                        <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                            <img src={ENNOVATIVE} alt="Boost Your Income" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                        <div className="lg:w-2/3 lg:pl-8">
                            <h2 className="text-3xl font-bold mb-4">Innovative Technology</h2>
                            <p className="text-gray-600">
                                We leverage cutting-edge technology to streamline legal processes, reduce costs, and deliver fast, reliable services. This modern approach ensures a seamless experience for our clients.                            </p>
                        </div>
                    </motion.div>

                    {/* <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 ml-10 mb-10'>
                        <div className="lg:w-2/3 lg:pl-8">
                            <h2 className="text-3xl font-bold mb-4">Grow Your Professional Network</h2>
                            <p className="text-gray-600">
                                Clients can rate your consultations, building your reputation and attracting more consultations and clients over time. Helping you build a trusted reputation as a subject matter expert.
                            </p>
                        </div>
                        <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                            <img src={grow} alt="Grow Your Professional Network" className="w-full h-auto rounded-lg shadow-lg" />
                        </div>
                    </motion.div> */}


                </div>

            </div>
        </div>
    )
}

export default UserFeature