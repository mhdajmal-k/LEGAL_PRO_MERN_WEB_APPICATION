import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import signUpImage from "../../assets/images/signUP.jpg";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import { loginValidator } from "../../utils/validator/loginValidaotr"
import { useDispatch, useSelector } from 'react-redux';
import { googleSignup, loginUser } from '../../services/store/features/userServices';
import { AppDispatch, RootState } from '../../services/store/store';
import { userLoginData } from "../../utils/type/userType"
import { toast } from 'sonner';
import CustomToast from './CustomToast';
import { Link, useNavigate } from 'react-router-dom';
import { clearError } from '../../services/store/features/userSlice';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../config/firbase"
import ResetPasswordModal from '../ForgotPasswordModa';
const LoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);

    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const { loading, error } = useSelector((state: RootState) => state.user)
    const formik = useFormik({
        initialValues: {
            email: 'ajmalchundappuram@gmail.com',
            password: '@Ajmal111',
        },
        validationSchema: loginValidator,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: userLoginData) => {
            try {
                const response = await dispatch(loginUser(values)).unwrap();
                if (response) {
                    navigate('/');
                }
            } catch (error: any) {
                console.error("Login error:", error);
                toast(<CustomToast message={error || error.message} type="error" />);
            }
        },
    });

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000);
        }
    }, [error])

    const handleGoogle = async () => {
        const provider = await new GoogleAuthProvider()

        const result = await signInWithPopup(auth, provider)

        const data = { email: result.user.email, userName: result.user.displayName }
        if (data) {
            try {
                const response = await dispatch(googleSignup(data)).unwrap();
                if (response) {
                    toast(<CustomToast message={response.message || 'An error occurred during login'} type="success" />);
                    navigate('/');
                }
            } catch (error: any) {
                console.error("Login error:", error);
                toast(<CustomToast message={error || error.message || 'An error occurred during login'} type="error" />);
            }
        }


    }
    return (
        <div className='container flex justify-center items-center min-h-screen bg-white'>
            <div className="bg-white p-8 m-4 rounded-lg shadow-custom border-medium max-w-max">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

                <div className='flex flex-col md:flex-row gap-3'>
                    <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-4">
                        <img
                            src={signUpImage}
                            alt="Sign up illustration"
                            className="w-full h-auto rounded-lg"
                            style={{ width: '100%', maxWidth: '450px' }}
                        />
                    </div>
                    <form className='w-full md:w-2/3 pr-0 md:pr-4 md:ml-2 space-y-4 h-full' onSubmit={formik.handleSubmit}>

                        <Input
                            type="email"
                            label="Email"
                            name='email'
                            size="sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.email && !!formik.touched.email}
                            value={formik.values.email}
                            variant="bordered"
                        />
                        {formik.errors.email && formik.touched.email ? <div className='text-red-500 text-sm'>{formik.errors.email}</div> : null}

                        <div className="mb-4 relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                size="sm"
                                name='password'
                                variant="bordered"
                                isInvalid={!!formik.errors.password && !!formik.touched.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.errors.password && formik.touched.password ? (
                                <div className='text-red-500 text-sm'>{formik.errors.password}</div>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 fixe\
                                 flex items-center text-sm leading-5"
                                style={{ position: "absolute", right: '10px', top: '50%', transform: 'translateY(-50%)' }} // Ensures the button doesn't move
                            >
                                {showPassword ? <FaRegEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                            </button>
                        </div>
                        <Button
                            color="primary"
                            type="submit"
                            className="w-full mt-3"
                            disabled={loading}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                        <div className='text-end font-normal text-base cursor-pointer'>
                            <span onClick={() => setModalOpen(true)} >
                                ForgotPassword?
                            </span>
                        </div>
                        <div>
                            <ResetPasswordModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} role="user" />
                        </div>
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                        <div>
                            <Button
                                variant="bordered"
                                className="w-full mt-1"
                                startContent={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" onClick={handleGoogle} className="w-5 h-5" />}
                            >
                                Sign In with Google
                            </Button>
                        </div>

                    </form>


                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Dont have an Account? <Link to={"/signup"} className='text-blue-900' >Sign Up </Link>
                </p></div>

        </div >

    );
};

export default LoginForm;
