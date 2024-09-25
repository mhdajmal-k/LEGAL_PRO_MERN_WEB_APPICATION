import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../../pages/userPages/SignUp'
import OtpVerify from '../../pages/userPages/OtpVerify'
import Home from '../../pages/userPages/Home'
import LoginPage from '../../pages/userPages/LoginPage'



const UserRouters: React.FC = () => {
  return (

    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/otpVerify' element={<OtpVerify />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  )
}

export default UserRouters