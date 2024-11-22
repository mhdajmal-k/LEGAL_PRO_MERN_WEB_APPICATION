import { useState } from 'react';
import { IoHomeSharp, IoPerson, IoLogOut } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaPenToSquare } from "react-icons/fa6";
import lawyerHero from "../../assets/images/LawyerHero.png";
import { useNavigate } from 'react-router-dom';
import appointmentshedule from "../../assets/images/appointment-shedule.png"
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { lawyerLogOut } from '../../services/store/features/lawyerServices';
import { logout } from '../../services/store/features/lawyerSlilce';


const LawyerLandingPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const { lawyerInfo } = useSelector((state: RootState) => state.lawyer)
    const handleLogout = async () => {
        try {
            dispatch(logout())
            const response = await dispatch(lawyerLogOut()).unwrap();
            if (response.status) {
                toast(<CustomToast message={response.message} type="success" />);
                // navigate("/admin/login")


            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }
    }
    return (
        <div className="bg-primary sm:min-h-screen text-white relative">
            <div className="container px-4 py-8">
                <main className="flex flex-col-reverse lg:flex-row items-center">
                    <div
                        className={`absolute  left-3 top-3 sm:top-0 sm:left-0  lg:relative sm:w-10 h-[75%] w-16 lg:w-20 sm:h-full bg-white rounded-lg cursor-pointer transition-transform duration-200 z-10 lg:translate-x-0 
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <button
                            className="absolute top-4 right-4 text-black lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            ✖
                        </button>

                        <div className="flex flex-col sm:h-[50%] max-h-screen  items-center py-4">

                            <div className="text-black flex flex-col items-center  gap-2 sm:gap-4">
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center my-2 sm:my-5">

                                    <IoHomeSharp className="text-3xl" title="Home" onClick={() => navigate("/lawyer")} />
                                </div>
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center sm:my-5">
                                    <IoPerson className="text-3xl" title="Profile" onClick={() => navigate("/lawyer/profile")} />
                                </div>
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center sm:my-5">
                                    < RiCalendarScheduleFill className="text-3xl" title=" Schedule" onClick={() => navigate("/lawyer/slot")} />
                                </div>
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center sm:my-5">
                                    <img src={appointmentshedule} alt="" className="text-3xl" title="Appointment" onClick={() => navigate("/lawyer/appointments")} />

                                </div>
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center sm:my-5">
                                    <FaPenToSquare className="text-3xl text-black   " title='Create Blog' onClick={() => navigate("/lawyer/blog")} />
                                </div>
                                <div className="bg-gray-200 w-10 h-10 rounded-lg flex items-center justify-center ">
                                    <IoLogOut className="text-3xl" title="Logout" onClick={handleLogout} />
                                </div>
                            </div>
                        </div>
                    </div>


                    <button
                        className={`lg:hidden fixed ${isSidebarOpen ? "hidden" : ""} top-10 mt-8 left-2 sm:top-4 sm:left-4 z-20 sm:text-2xl bg-secondary p-2 rounded-md text-white`}
                        onClick={() => setSidebarOpen(true)}
                    >
                        ☰
                    </button>

                    <div className="w-full lg:w-2/3 lg:-mr-24 mb-8 lg:mb-0">
                        <img src={lawyerHero} alt="Lawyer" className="w-full h-auto" />
                    </div>


                    <section className="w-full sm:-mt-30  md:-mt-48 lg:w-1/3 flex justify-center items-center">
                        <div className="sm:max-w-xl md:max-w-lg text-center lg:text-left lg:-ml-6">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4">
                                WE BRING CLIENTS TO YOU
                            </h2>
                            <p className="text-xl md:text-2xl mb-6">
                                Expand Your Reach and Grow Your Practice
                            </p>
                            <button className="bg-secondary hover:bg-secondary-dark text-white px-6 py-3  rounded-lg transition duration-300 ease-in-out transform hover:scale-105" onClick={() => navigate("/lawyer/signup")}>
                                {lawyerInfo ? "Schedule Now" : "SignUP Now"}
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default LawyerLandingPage;
