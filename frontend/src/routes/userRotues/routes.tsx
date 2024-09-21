import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../../pages/userPages/SignUp'



const UserRouters:React.FC = () => {
  return (

    <div>
        <Routes>
            <Route path='/signup' element={<SignUp/>} />
        </Routes>
    </div>
  )
}

export default UserRouters