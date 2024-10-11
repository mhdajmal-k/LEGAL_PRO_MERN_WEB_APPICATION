import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../../pages/userPages/SignUp'
import OtpVerify from '../../pages/userPages/OtpVerify'
import Home from '../../pages/userPages/Home'
import LoginPage from '../../pages/userPages/LoginPage'
import PublicRoute from '../UserpublicRoute'
import UserProfileLayout from '../../components/userComponents/UserProfileLayout'
import Appointment from '../../components/userComponents/Appoinement'
import ProfileData from '../../components/userComponents/ProfileData'
import ProtectRoute from '../UserProtectRoute'
<<<<<<< HEAD
import ForgotPasswordFrom from '../../components/ForgotPasswordFrom'
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611

const UserRouters: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otpVerify' element={<OtpVerify />} />
          <Route path='/login' element={<LoginPage />} />
<<<<<<< HEAD
          <Route path='/forgotpassword/:token' element={<ForgotPasswordFrom />} />
=======
>>>>>>> 1cb3bf3d1224596338a622879a6d01c174d4c611
        </Route>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectRoute />}>
          <Route path='/profile' element={<UserProfileLayout />}>
            <Route index element={<ProfileData />} />
            <Route path='appointment' element={<Appointment />} />
            <Route path='wallet' element={<h1>Wallet</h1>} />
            <Route path='change-password' element={<h1>Change Password</h1>} />
          </Route>
        </Route>
        <Route path='*' element={<div className='text-center'>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default UserRouters