import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../../pages/userPages/SignUp'
import OtpVerify from '../../pages/userPages/OtpVerify'



const UserRouters: React.FC = () => {
  return (

    <div>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/otpVerify' element={<OtpVerify />} />
      </Routes>
    </div>
  )
}

export default UserRouters