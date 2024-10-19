import React from 'react';
import teamLawyer from "../../assets/images/teamLawyer.jpg";
import laptopConsultation from "../../assets/images/smiling-young-woman-gesturing-while-talking-telephone-with-laptop-desk.jpg";
import grow from "../../assets/images/grow.jpg";
import { motion } from 'framer-motion';
import income2 from "../../assets/images/income2.jpg";
import { Button } from '@nextui-org/react';

const LawyerFeature: React.FC = () => {
    return (
        <div className='container mt-10'>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Why Join Us?</h2>
                <p className="text-lg">Discover the benefits of becoming a part of our legal consulting network.</p>
            </div>

            <div className='min-h-screen container mx-auto px-4 bg-white'>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 sm:ml-10 sm:mb-10'
                >
                    <motion.div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                        <img src={teamLawyer} alt="Team of lawyers" className="w-full h-auto rounded-lg shadow-lg" />
                    </motion.div>
                    <div className="lg:w-2/3 lg:pl-8">
                        <h2 className="text-3xl font-bold mb-4">Join our panel of lawyers for free</h2>
                        <p className="text-gray-600">
                            Join our panel of lawyers for free and attract more clients—no contracts, no fees, and cancel anytime. Answer users' questions, boost your ratings, and receive direct consultations. No catch, just opportunities!
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 sm:ml-10 sm:mb-10'>
                    <div className="lg:w-2/3 lg:pl-8">
                        <h2 className="text-3xl font-bold mb-4">Take Phone or Laptop Consultations</h2>
                        <p className="text-gray-600">
                            Your Profile is visible to Indians worldwide for consultation requests. Engage directly with clients from Legal_Pro without any interference.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                        <img src={laptopConsultation} alt="Laptop Consultation" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 sm:ml-10 sm:mb-10'>
                    <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                        <img src={income2} alt="Boost Your Income" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div className="lg:w-2/3 lg:pl-8">
                        <h2 className="text-3xl font-bold mb-4">Boost Your Practice and Income</h2>
                        <p className="text-gray-600">
                            Empower your practice and elevate your income—grow your legal career on your terms.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col lg:flex-row lg:justify-between p-7 items-center mt-8 sm:ml-10 sm:mb-10'>
                    <div className="lg:w-2/3 lg:pl-8">
                        <h2 className="text-3xl font-bold mb-4">Grow Your Professional Network</h2>
                        <p className="text-gray-600">
                            Clients can rate your consultations, building your reputation and attracting more consultations and clients over time. Helping you build a trusted reputation as a subject matter expert.
                        </p>
                    </div>
                    <div className="w-full lg:w-1/3 mb-8 mt-3 lg:mb-0">
                        <img src={grow} alt="Grow Your Professional Network" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col bg-primary h-30 mb-8 w-full items-center shadow-lg rounded-lg p-6 space-y-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xl font-semibold text-white">
                        Choose when and how you want to work
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} >
                        <Button color='secondary' className='px-8 py-3 rounded-lg bg-secondary hover:bg-secondary-dark text-white transition duration-300 ease-in-out transform hover:scale-105'>
                            Schedule Now
                        </Button>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default LawyerFeature;
