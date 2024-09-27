import React from 'react';
import hero from "../../assets/images/hero.png";
import { Button } from '@nextui-org/react';

const HeroSection: React.FC = () => {
    return (
        <div className="bg-primary min-h-screen relative w-full overflow-hidden ">
            <section className="pt-12  pb-12 sm:pb-16 lg:pt-8 sm:pl-20">
                <div className=" sm:m-5 max-w-7xl sm:px-2 lg:px-4">
                    <div className="pt-4 ">
                        {/* Left Section */}
                        <div className='w-full sm:pl-20 sm:pt-10' >
                            <div className="text-center lg:text-left">
                                <h1 className=" md:text-4xl text-2xl sm:font-bold font-semibold  sm:leading-3 text-white sm:text-4xl ">
                                    PROTECT YOUR RULE
                                    <br />
                                    <span className="mt-2  block ml-20">SECURE YOUR FUTURE</span>
                                </h1>

                                <div className="mt-4 text-white flex gap-5">
                                    <p>
                                        Expert legal solutions combining
                                        <br /> professionalism with modern technology

                                    </p>
                                    <button
                                        className=' w-20 sm:w-32 sm:h-10 rounded-md bg-secondary text-white'
                                    >Book Now</button>
                                </div>


                                {/* Larger Input Box */}
                                <div className='w-auto sm:w-full '>


                                    <form className="mt-8 sm:mt-10 relative items-center">

                                        <div className="relative h-16 pb-2 bg-white border border-gray-400 group rounded-xl  w-3/4 focus-within:ring-1 flex focus-within:border-gray-900  mx-auto lg:w-3/5 lg:mx-0">
                                            <input
                                                type="email"
                                                name=""
                                                id=""
                                                placeholder="Enter email address"
                                                className="block w-3/4 px-6 py-5 font-medium text-gray-900 placeholder-gray-900 bg-transparent border-none outline-none rounded-xl"
                                            />
                                            <div className="mt-4 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:items-center shadow-lg  items-center px-10">
                                                <Button color="primary" type="submit" className="w-full sm:mt-3 lg:mt-0">
                                                    Generate

                                                </Button>
                                            </div>
                                        </div>
                                        <h6 className="ml-4 text-center lg:text-left my-5">
                                            <p className='text-gray-100 text-sm'>
                                                Generate advices through AI. We always recommend booking a consultant.
                                            </p>


                                        </h6>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Image */}
                        <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full sm:pr-14 lg:w-auto">
                            <img className="w-full p-5  lg:w-auto  lg:p-0" src={hero} alt="Hero Section Image" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
