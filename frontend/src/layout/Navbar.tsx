import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import { Button } from "@nextui-org/button";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../services/store/store';
import { IoIosNotifications } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { Tooltip, Avatar } from "@nextui-org/react";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch()
  const { loading, userInfo, error } = useSelector((state: RootState) => state.user)
  return (
    <nav className="bg-primary p-2 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center ">
        {/* Logo and Title */}
        <div className="flex items-center mx-2.5  m:items-center m:space-x-2  ">
          <img src={Logo} className='w-10' alt="logo" />

          <Link to="/" className=" ml-3 first-line:font-bold text-white">
            Legal_Pro
          </Link>


        </div>

        {/* Menu for larger screens */}
        <div className="hidden md:flex space-x-6 text-white">
          <Link to="/">
            HOME
          </Link>
          <Link to="/findLawyers" className="hover:text-black">
            FIND LAWYERS
          </Link>
          <Link to="/services" className="hover:text-black">
            ABOUT
          </Link>
          <Link to="/contact" className="hover:text-black">
            BLOG
          </Link>
        </div>

        {/* SignUp and Become a Lawyer Buttons */}
        <div>
          {userInfo?.userName ? (
            <div className='flex items-center space-x-4'>
              <div className='flex items-center'>
                <IoIosNotifications className="text-xl" />
              </div>
              <div className='flex items-center'>
                <FaHeart className="text-xl" />
              </div>
              <Tooltip
                content={
                  <div className="py-2">
                    <Button className="w-full mb-2 justify-start" variant="light">
                      <div className="text-sm font-normal">Profile</div>
                    </Button>
                    <Button className="w-full justify-start" variant="light">
                      <div className="text-sm font-normal">LogOut</div>
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
              <div>
                <span className="text-sm font-medium">{userInfo.userName}</span>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Button size="sm" className="bg-secondary text-black font-bold hover:bg-secondary-50">
                <Link to="/signup">
                  SIGN UP
                </Link>
              </Button>
              <Button size="sm" className="bg-secondary text-black font-bold hover:bg-secondary-50">
                <Link to="/become-lawyer" className='uppercase'>
                  Become a Lawyer
                </Link>
              </Button>
            </div>
          )}
        </div>



        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
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

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 text-white">
          <Link to="/" className="block ">
            HOME
          </Link>
          <Link to="/about" className="block hover:underline">
            FIND LAWYERS
          </Link>
          <Link to="/services" className="block hover:underline">
            ABOUT
          </Link>
          <Link to="/contact" className="block hover:underline">
            BLOG
          </Link>
          <div>
            <Button size='sm' className="bg-secondary text-black font-bold hover:bg-slate-200">
              <Link to="/signup">
                SIGNUP
              </Link>
            </Button>
            <Button size='sm' className="bg-secondary text-black font-bold hover:bg-slate-200 ml-2">
              <Link to="/become-lawyer" className='uppercase'>
                Become a Lawyer
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
