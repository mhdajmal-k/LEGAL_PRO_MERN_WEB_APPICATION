import React from 'react'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/footer'
import SingUpForm from '../../components/userComponents/signUpFrom'
import { Toaster } from 'sonner'



const SignUp: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <SingUpForm />
      <Footer />
    </div>
  )
}

export default SignUp