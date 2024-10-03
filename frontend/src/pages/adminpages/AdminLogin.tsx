import { useFormik } from 'formik'
import React, { useState } from 'react'
// import CustomToast from '../userComponents/CustomToast'
// import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Button, Input } from '@nextui-org/react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../services/store/store'
import { toast } from 'sonner'
import CustomToast from '../../components/userComponents/CustomToast'
import axiosInstance from '../../services/api/axiosConfigue'
import { ADMINLOGIN } from '../../services/api/lawyerApi'
import { adminValidationSchema } from '../../utils/validator/validateAdmin'
import { response } from '../../utils/type/lawyerType'
import { AxiosError } from 'axios'

const AdminLoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { loading, error } = useSelector((state: RootState) => state.lawyer);
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: adminValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post(ADMINLOGIN, values) as response;
                console.log(response, "checking.....")


                navigate('/admin/dashboard');

            } catch (error: any) {
                let errorMessage = "An unknown error occurred";
                if (error instanceof AxiosError) {
                    if (error.response) {
                        errorMessage = error.response.data.message || "Server error";
                    } else if (error.request) {
                        errorMessage = "Network error. Please check your connection.";
                    }
                }
                toast(<CustomToast message={errorMessage} type="error" />);
            }
        },
    })
    return (
        <div className=" h-screen  flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-md mx-auto flex w-full max-w-xl">
                <div className="flex-auto  p-8">
                    <h2 className="text-2xl font-bold mb-3 text-center">Welcome Back Admin</h2>
                    <div className='mx-3 my-4'>
                        <form onSubmit={formik.handleSubmit}>
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
                                <div className='mt-8 flex justify-center items-center'>
                                    <Button type="submit" className="w-2/3 font-semibold text-base bg-blue-800">
                                        {loading ? "Signing Up..." : "Sign Up"}
                                    </Button>
                                    {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                                </div>

                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default AdminLoginForm
