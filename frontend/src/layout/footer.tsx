import React from 'react';
import FullLogo from "../assets/images/fullLogo.png";
import { FaInstagram, FaTwitterSquare, FaFacebook } from "react-icons/fa";

const LegalFooter: React.FC = () => {
    return (
        <footer className='bg-primary text-white p-6 pt-10'>
            <div className='container mx-auto grid md:grid-cols-4 gap-8'>
                <div className='flex flex-col items-start mb-6'>
                    <div className="w-32 mb-4">
                        <img src={FullLogo} alt="logo" />
                    </div>
                    <h2 className="text-xl mt-2 font-bold text-yellow-500">LEGAL_PRO</h2>
                    <p className='text-sm mb-4'>A leading legal firm dedicated to providing expert services across various fields of law</p>
                    <div className='flex space-x-4'>
                        <FaInstagram className='text-2xl hover:text-yellow-500 transition-colors' />
                        <FaTwitterSquare className='text-2xl hover:text-yellow-500 transition-colors' />
                        <FaFacebook className='text-2xl hover:text-yellow-500 transition-colors' />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                            <span>Home</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                            <span>About</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                            <span>Find Lawyers</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                            <span>Blog</span>
                        </li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="font-bold mb-4">Contact Us</h3>
                    <p className="flex items-center space-x-2 mb-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>123 Legal Street, City, State, Zip Code</span>
                    </p>
                    <p className="flex items-center space-x-2 mb-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>Phone: 7025862597</span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>Email: info@yourlawfirm.com</span>
                    </p>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="font-bold mb-4">Legal</h3>
                    <p className="flex items-center space-x-2 mb-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>Privacy Policy</span>
                    </p>
                    <p className="flex items-center space-x-2 mb-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>Disclaimer</span>
                    </p>
                    <p className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 bg-secondary rounded-full inline-block"></span>
                        <span>Terms of Service</span>
                    </p>
                </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t border-blue-800">
                <p>&copy; 2024 Legal_Pro. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default LegalFooter;
