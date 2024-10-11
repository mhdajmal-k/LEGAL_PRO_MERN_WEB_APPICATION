import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import Navbar from '../../layout/Navbar';
import LegalFooter from '../../layout/footer';
import { CgProfile } from "react-icons/cg";
import { FiLock } from "react-icons/fi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiOutlineWallet } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { userLogout } from '../../services/store/features/userSlice';
import { logOut } from '../../services/store/features/userServices';
import CustomToast from './CustomToast';
import { toast } from 'sonner';
import { RootState } from '../../services/store/store';



const UserProfileLayout = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch()
    const { userInfo } = useSelector((state: RootState) => state.user)
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    const handleLogout = async () => {
        try {
            dispatch(userLogout())
            const response = await dispatch(logOut()).unwrap();
            if (response) {
                toast(<CustomToast message={response.message} type="success" />);

            }
        } catch (error: any) {
            toast(<CustomToast message={error} type="error" />);
        }
    }
=======

const UserProfileLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Function to check if the current route matches a button path
    const isActive = (path: string) => location.pathname === path;

>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
    return (
        <React.Fragment>
            <Navbar />
            <div className="container my-7 px-8 mx-auto sm:my-16 sm:px-36 justify-center items-center">
                <div className="flex flex-col md:flex-row border bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:w-1/4 bg-gray-400 p-6 flex flex-col items-center text-white">
                        <div className="mb-4">
                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                                <img
<<<<<<< HEAD
                                    src="https://via.placeholder.com/"
=======
                                    src="https://via.placeholder.com/150"
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
                                    alt="User Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

<<<<<<< HEAD
                        <h2 className="text-2xl font-bold mb-2">{userInfo?.userName}</h2>
                        <p className="text-sm mb-4 opacity-75">{userInfo?.email}</p>
=======
                        <h2 className="text-2xl font-bold mb-2">Ajmal</h2>
                        <p className="text-sm mb-4 opacity-75">ajmal@example.com</p>
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611

                        <div className="w-full ">
                            <Button
                                className={`w-full mb-2 bg-white ${isActive('/profile') ? 'bg-primary text-white  border border-black' : 'text-black hover:bg-primary'}`}
                                onClick={() => navigate('/profile')}
                            >
                                <CgProfile className="mr-2 text-base" /> View Profile
                            </Button>
                            <Button
                                className={`w-full mb-2 bg-white ${isActive('/profile/change-password') ? 'bg-primary text-white' : 'text-black hover:bg-primary'}`}
                                onClick={() => navigate('/profile/change-password')}
                            >
                                <FiLock className="mr-2 text-base" /> Change Password
                            </Button>
                            <Button
                                className={`w-full mb-2 bg-white ${isActive('/profile/appointment') ? 'bg-primary text-white' : 'text-black hover:bg-primary'}`}
                                onClick={() => navigate('/profile/appointment')}
                            >
                                <AiOutlineCalendar className="mr-2 text-base" /> Appointment
                            </Button>
                            <Button
                                className={`w-full mb-2 bg-white ${isActive('/profile/wallet') ? 'bg-primary text-white' : 'text-black hover:bg-primary'}`}
                                onClick={() => navigate('/profile/wallet')}
                            >
                                <AiOutlineWallet className="mr-2 text-base" /> Wallet
                            </Button>
<<<<<<< HEAD
                            <Button className="w-full mt-11 text-black" onClick={handleLogout} color="danger">
                                <FiLogOut className="mr-2 text-base" />Log Out
=======
                            <Button className="w-full mt-11 text-black" color="danger">
                                <FiLogOut className="mr-2 text-base" /> Log Out
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
                            </Button>
                        </div>
                    </div>

                    <div className="md:w-3/4 p-8">
                        <Outlet />
                    </div>
                </div>
            </div>

            <LegalFooter />
        </React.Fragment>
    );
};

export default UserProfileLayout;
