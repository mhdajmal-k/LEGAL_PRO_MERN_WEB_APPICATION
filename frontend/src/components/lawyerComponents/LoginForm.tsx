import { useFormik } from 'formik'
import React, { useState } from 'react'
import CustomToast from '../userComponents/CustomToast'
import { toast } from 'sonner'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../services/store/store'
import { lawyerValidationSchema } from '../../utils/validator/lawyerValidate'

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.lawyer);
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const formik = useFormik({
        initialValues: {
            userName: 'ajmal',
            email: 'ajmalchundappuram@gmail.com',
            password: '@Ajmal111',
            confirmPassword: '@Ajmal111',
            gender: '',
            city: 'calicut',
            state: 'kerala',
            zipCode: '789878',
        },
        validationSchema: lawyerValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const formData = new FormData()
            Object.keys(values).forEach(Key => {
                formData.append(Key, values[Key as keyof typeof values])
            })


            // try {

            //     const response = await dispatch(signUpLawyer(lawyerSignUpData)).unwrap();
            //     console.log(response, "checking.....")
            //     if (response.status) {
            //         toast(<CustomToast message={response.message} type="success" />);
            //         Navigate('/lawyer/verify-otp');
            //     }console.log(lawyerSignUpData)
            // } catch (error: any) {
            //     toast(<CustomToast message={error} type="error" />);
            // }
        },
    })
    return (
        <div className=" h-screen container flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-md mx-auto flex w-full max-w-2xl">
                <div className="flex-1 w-4/5  p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
                    <div className='mx-3'>


                        <form>
                            <div className="my-6">
                                <Input
                                    type="email"
                                    label="Email"
                                    name='email'
                                    size="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    variant="bordered"
                                    isInvalid={!!formik.errors.email && formik.touched.email}
                                />
                                {formik.errors.email && formik.touched.email ? <div className='text-red-500 text-sm'>{formik.errors.email}</div> : null}
                            </div>
                            <div className="my-5">
                                <div className="relative">
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
                                <div className="text-right my-4">
                                    <a href="#" className="text-sm text-blue-600 hover:underline">
                                        Forgot Password?
                                    </a>
                                </div>
                                <Button color="primary" type="submit" className="w-full">
                                    {loading ? "Signing Up..." : "Sign Up"}
                                </Button>
                                {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                            </div>
                        </form>
                    </div>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an Account?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
                <div className="w-1/5 bg-primary rounded-r-lg"></div>
            </div>
        </div>
    )
}

export default LoginForm
