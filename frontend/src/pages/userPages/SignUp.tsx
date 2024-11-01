import React from 'react'
import Navbar from '../../layout/Navbar'
import Footer from '../../layout/footer'
import SingUpForm from '../../components/userComponents/signUpForm'




const SignUp: React.FC = () => {
  return (
    <div>
      <Navbar />
      <SingUpForm />
      <Footer />
    </div>
  )
}

export default SignUp