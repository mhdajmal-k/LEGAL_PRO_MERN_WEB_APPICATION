import React from 'react';
import hero from "../../assets/images/hero.png";
import { Button } from '@nextui-org/react';

const HeroSection: React.FC = () => {
    return (
        <div className="bg-primary min-h-screen relative w-full overflow-hidden ">
            <section className=" container pt-12  pb-12 sm:pb-16 lg:pt-8 sm:pl-20">
                <div className=" sm:m-5 max-w-7xl sm:px-2 lg:px-4">
                    <div className="pt-4 ">

                        <div className='w-full sm:pl-10 sm:pt-10' >
                            <div className="text-center lg:text-left leading-normal">
                                <h1 className=" md:text-4xl text-xl sm:font-bold font-semibold   sm:leading-3 text-white sm:text-xl ">
                                    PROTECT YOUR RULE
                                    <br />
                                    <span className="sm:mt-2  block ml-20">SECURE YOUR FUTURE</span>
                                </h1>

                                <div className="mt-4 text-base font-light text-white flex gap-5 container">
                                    <p>
                                        Expert legal solutions combining
                                        <br /> professionalism with modern technology

                                    </p>
                                    {/* <button
                                        className=' w-20 sm:w-32 h-auto sm:h-10 rounded-md bg-secondary   text-white'
                                    >Book Now</button> */}
                                </div>

                            </div>

                        </div>

                        <div className="relative lg:absolute lg:bottom-0 lg:right-0 w-full sm:pr-14 lg:w-auto -z-1">
                            <img className="w-full p-5  lg:w-auto  lg:p-0" src={hero} alt="Hero Section Image" />
                        </div>
                    </div>

                </div>
                <div className='container sm:pl-20  flex justify-center w-full items-center  z-50 '>


                    <form className="mt-8 w-full justify-center  sm:mt-10 relative items-center">

                        <div className="relative h-16 pb-2 bg-white border border-gray-400 group rounded-xl  w-full focus-within:ring-1 flex focus-within:border-gray-900  mx-auto lg:w-3/5 lg:mx-0">
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder="What legal assistance do you need?"
                                className="block w-3/4 px-6 py-5 font-medium text-gray-900 placeholder-gray-500 bg-transparent border-none outline-none rounded-xl"
                            />
                            <div className="mt-4 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:flex lg:items-center shadow-lg  items-center px-10">
                                <Button color="primary" type="submit" className="w-full sm:mt-3 lg:mt-0">
                                    Search

                                </Button>
                            </div>
                        </div>
                        <h6 className="ml-4 text-center lg:text-left my-5 z-50">
                            <p className='text-gray-100 text-sm'>
                                Generate advices through AI. We always recommend booking a consultant.
                            </p>


                        </h6>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
