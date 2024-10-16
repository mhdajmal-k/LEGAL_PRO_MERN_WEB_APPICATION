import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import { Button } from "@nextui-org/button";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../services/store/store';
import { IoIosNotifications } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { Tooltip, Avatar } from "@nextui-org/react";
import { userLogout } from '../services/store/features/userSlice';
import { logOut } from '../services/store/features/userServices';
import CustomToast from '../components/userComponents/CustomToast';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const handleLogout = async () => {
    try {
      dispatch(userLogout());
      const response = await dispatch(logOut()).unwrap();
      if (response) {
        toast(<CustomToast message={response.message} type="success" />);
      }
    } catch (error: any) {
      toast(<CustomToast message={error} type="error" />);
    }
  };

  return (
    <nav className="bg-primary p-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center mx-2.5">
          <img src={Logo} className="w-10" alt="logo" />
          <Link to="/" className="ml-3 font-bold text-white">
            Legal_Pro
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/">HOME</Link>
          <Link to="/findLawyers" className="hover:text-black">FIND LAWYERS</Link>
          <Link to="/services" className="hover:text-black">ABOUT</Link>
          <Link to="/contact" className="hover:text-black">BLOG</Link>
        </div>

        {/* User Info and Icons */}
        <div>
          {userInfo?.userName ? (
            <div className="flex items-center space-x-4">
              <IoIosNotifications className="text-xl" />
              <FaHeart className="text-xl" />
              <Tooltip
                content={
                  <div className="py-2">
                    <Button className="w-full mb-2 justify-start" variant="light">
                      <Link to="/profile">Profile</Link>
                    </Button>
                    <Button className="w-full justify-start" variant="light" onClick={handleLogout}>
                      LogOut
                    </Button>
                  </div>
                }
              >
                <Avatar
                  isBordered
                  radius="full"
                  src={userInfo.email || "https://i.pravatar.cc/150?u=default"}
                  alt={userInfo.userName}
                  className="cursor-pointer"
                />
              </Tooltip>
              <span className="text-sm font-medium">{userInfo.userName}</span>
            </div>
          ) : (
            <div className="sm:flex sm:space-x-4 hidden">
              <Button size="sm" className="bg-secondary text-black font-bold hover:bg-secondary-50">
                <Link to="/signup">SIGN UP</Link>
              </Button>
              <Button size="sm" className="bg-secondary text-black font-bold hover:bg-secondary-50">
                <Link to="/lawyer/signup" className="uppercase">Become a Lawyer</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 text-white">
          <Link to="/" className="block">HOME</Link>
          <Link to="/findLawyers" className="block">FIND LAWYERS</Link>
          <Link to="/services" className="block">ABOUT</Link>
          <Link to="/contact" className="block">BLOG</Link>
          <div>
            <Button size="sm" className="bg-secondary text-black font-bold hover:bg-slate-200">
              <Link to="/signup">SIGNUP</Link>
            </Button>
            <Button size="sm" className="bg-secondary text-black font-bold hover:bg-slate-200 ml-2">
              <Link to="/lawyer/signup" className="uppercase">Become a Lawyer</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
