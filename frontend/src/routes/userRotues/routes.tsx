import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../../pages/userPages/SignUp'
import OtpVerify from '../../pages/userPages/OtpVerify'
import Home from '../../pages/userPages/Home'
import LoginPage from '../../pages/userPages/LoginPage'
import PublicRoute from '../publicRoute'



const UserRouters: React.FC = () => {
  return (

    <div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/otpVerify' element={<OtpVerify />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
        <Route path='/' element={<Home />} />

        <Route path='*' element={<div className='text-center'>404 Not Found</div>} />
      </Routes>
    </div>
  )
}

export default UserRouters