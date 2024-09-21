import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserRouters from './routes/userRotues/routes'

const App:React.FC=()=> {
  
  return (
    <>
    <Routes>
      <Route path='/*' element={<UserRouters/>}></Route>
      {/* <Route path='*' element={<ErrorPage/>}></Route>
       */}
    </Routes>
    </>
    )
}

export default App
