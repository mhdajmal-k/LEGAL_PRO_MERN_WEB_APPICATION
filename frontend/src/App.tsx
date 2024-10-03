import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserRouters from './routes/userRotues/routes'
import LawyerRoutes from './routes/lawyerRoutes/routes'
import AdminRoutes from './routes/adminRoutes/routes'


const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path='/*' element={<UserRouters />}></Route>
        <Route path='/lawyer/*' element={<LawyerRoutes />}></Route>
        <Route path='/admin/*' element={<AdminRoutes />}></Route>

      </Routes>
    </>
  )
}

export default App
