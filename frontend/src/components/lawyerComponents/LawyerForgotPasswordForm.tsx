import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { forgotpasswordValidatorSchema } from '../../utils/validator/ForgotPasswordValidator';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { lawyerResetForgotPassword } from '../../services/store/features/lawyerServices';

const ForgotPasswordFrom: React.FC = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const { loading, error } = useSelector((state: RootState) => state.lawyer);
    const dispatch: AppDispatch = useDispatch();
    const { token } = useParams()
    const formik = useFormik({
        initialValues: {
            password: '',
            conformPassword: '',
        },
        validationSchema: forgotpasswordValidatorSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {

            try {

                const response = await dispatch(lawyerResetForgotPassword({ password: values.password, token })).unwrap();

                if (response.status) {
                    toast(<CustomToast message={response.message} type="success" />);
                    navigate('/lawyer/login');
                }
            } catch (error: any) {
                toast(<CustomToast message={error || error.message} type="error" />);
            }
        },
    })
    return (
        <div className=" h-screen container flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-lg shadow-md mx-auto flex w-full max-w-2xl">
                <div className="flex-1 w-4/5  p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">Forgot you Password?</h2>
                    <div className='mx-3'>


                        <form onSubmit={formik.handleSubmit}>
                            <div className="my-6">
                                <Input
                                    type="text"
                                    label="Enter you Password password"
                                    name='password'
                                    size="sm"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    variant="bordered"
                                    isInvalid={!!formik.errors.password && formik.touched.password}
                                />
                                {formik.errors.password && formik.touched.password ? <div className='text-red-500 text-sm'>{formik.errors.password}</div> : null}
                            </div>
                            <div className="my-5">
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        label="conform Password"
                                        size="sm"
                                        name='conformPassword'
                                        variant="bordered"
                                        isInvalid={!!formik.errors.conformPassword && formik.touched.conformPassword}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.conformPassword}
                                    />
                                    {formik.errors.conformPassword && formik.touched.conformPassword ? (
                                        <div className='text-red-500 text-sm'>{formik.errors.conformPassword}</div>
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

                                <Button color="primary" type="submit" className="w-full mt-4">
                                    {loading ? "Resting Password..." : "Reset Password"}
                                </Button>
                                {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="w-1/5 bg-primary rounded-r-lg"></div>
            </div>
        </div>
    )
}

export default ForgotPasswordFrom