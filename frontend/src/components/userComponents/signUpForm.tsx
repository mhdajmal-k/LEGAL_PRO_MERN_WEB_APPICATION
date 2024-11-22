import React, { useEffect, useState } from 'react';
import { Input, Button } from "@nextui-org/react";
import signUpImage from "../../assets/images/signUP.jpg";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import { validationSchema } from "../../utils/validator/validationSchema";
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { googleSignup, signUpUser } from '../../services/store/features/userServices';
import { AppDispatch, RootState } from '../../services/store/store';
// import userSignUp from "../../utils/type/userType"
import { toast } from 'sonner'; // Import Sonner
import CustomToast from './CustomToast';
import { Link, useNavigate } from 'react-router-dom';
import { clearError } from '../../services/store/features/userSlice';
import { userSignUp } from '../../utils/type/userType';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firbase';



const SignUpForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);


    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const { loading, error } = useSelector((state: RootState) => state.user)
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000);
        }
    }, [error])
    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userInfo: null,
            loading: false,
            error: null
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values: userSignUp) => {
            try {
                const response = await dispatch(signUpUser(values)).unwrap();

                toast(<CustomToast message={response.message} type="success" />);

                navigate('/otpVerify')



            } catch (error: any) {
                console.log(error, "from here")
                toast(<CustomToast message={error || error.message} type="error" />);
            }

        },
    });

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
                toast(<CustomToast message={error.message || 'An error occurred during login'} type="error" />);
            }
        }


    }

    return (
        <div className='container flex justify-center items-center min-h-screen bg-white'>
            <div className="bg-white p-8 m-4 rounded-lg shadow-custom border-medium w-auto">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <div className='flex flex-col md:flex-row'>
                    <form className='w-full md:w-2/3 pr-0 md:pr-4 space-y-4' onSubmit={formik.handleSubmit}>
                        <Input
                            type="text"
                            label="Username"
                            name='userName'
                            size="sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.userName}
                            value={formik.values.userName}
                            variant="bordered"
                        />
                        {formik.errors.userName && formik.touched.userName ? <div className='text-red-500 text-sm'>{formik.errors.userName}</div> : null}

                        <Input
                            type="email"
                            label="Email"
                            name='email'
                            size="sm"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={!!formik.errors.email && formik.touched.email}
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
                                isInvalid={!!formik.errors.password && formik.touched.password}
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
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                style={{ position: "absolute", right: '10px', top: '50%', transform: 'translateY(-50%)' }} // Ensures the button doesn't move
                            >
                                {showPassword ? <FaRegEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                            </button>
                        </div>

                        <div className="mb-4 relative whitespace-nowrap">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                label="Confirm Password"
                                size="sm"
                                name='confirmPassword'
                                variant="bordered"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                                value={formik.values.confirmPassword}
                            />
                            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                                <div className='text-red-500 text-sm '>{formik.errors.confirmPassword}</div>
                            ) : null}
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                style={{ position: "absolute", right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            >
                                {showConfirmPassword ? <FaRegEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                            </button>
                        </div>
                        {loading ? (
                            <Button
                                color="primary"
                                type="submit"
                                className="w-full"
                                isLoading
                                disabled
                            >
                                Signing Up...
                            </Button>
                        ) : (
                            <Button
                                color="primary"
                                type="submit"
                                className="w-full"
                            >
                                Sign Up
                            </Button>
                        )}
                        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}

                        <Button onClick={handleGoogle}
                            variant="bordered"
                            className="w-full mt-2"
                            startContent={<img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5" />}
                        >
                            Sign In with Google
                        </Button>
                    </form>

                    <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-4">
                        <img
                            src={signUpImage}
                            alt="Sign up illustration"
                            className="w-full h-auto rounded-lg"
                            style={{ width: '100%', maxWidth: '450px' }} // Adjust max-width for wider image
                        />
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to={"/login"} className='text-blue-900' >Sign In </Link>
                </p></div>

        </div >

    );
};

export default SignUpForm;
