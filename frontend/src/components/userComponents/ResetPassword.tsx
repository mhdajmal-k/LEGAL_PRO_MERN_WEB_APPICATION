import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { resetPasswordValidator } from '../../utils/validator/resetPasswordValidator';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import { resetPassword } from '../../services/store/features/userServices';
import CustomToast from './CustomToast';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';

const ResetPassword: React.FC = () => {
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const { userInfo } = useSelector((state: RootState) => state.user);

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',

        },
        validationSchema: resetPasswordValidator,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { resetForm }) => {
            const { currentPassword, newPassword } = values;
            try {
                const response = await dispatch(resetPassword({ currentPassword, newPassword, id: userInfo?._id })).unwrap();
                if (response.status) {
                    toast(<CustomToast message={response.message} type="success" />);
                    resetForm()
                }
            } catch (error: any) {
                console.log(error, "is the service Error")
                toast(<CustomToast message={error || error.message || 'An error occurred during Update password'} type="error" />);
            }
        },
    });
    return (
        <div className="mb-4 mx-auto  items-center flex justify-center flex-col w-full">
            <p className='my-5 text-xl font-semibold text-center'>Reset Password</p>
            <form className='w-full md:w-3/4 pr-0 md:pr-4 md:ml-5 space-y-7 h-full' onSubmit={formik.handleSubmit} >
                <Input
                    type="text"
                    label="current Password"
                    name='currentPassword'
                    size="sm"
                    color='default'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.currentPassword && !!formik.touched.currentPassword}
                    value={formik.values.currentPassword}
                />
                {formik.errors.currentPassword && formik.touched.currentPassword && (
                    <div className='text-red-500 text-sm'>{formik.errors.currentPassword}</div>
                )}
                <Input
                    type="text"
                    label="Enter New Password"
                    name='newPassword'
                    size="sm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={!!formik.errors.newPassword && !!formik.touched.newPassword}
                    value={formik.values.newPassword}

                />
                {formik.errors.newPassword && formik.touched.newPassword && (
                    <div className='text-red-500 text-sm'>{formik.errors.newPassword}</div>
                )}
                <div className="mb-4 relative ">
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        label="Enter New Password"
                        name='confirmPassword'
                        size="sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.confirmPassword && !!formik.touched.confirmPassword}
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
                <div className='flex gap-3'>
                    <Button
                        color={"success"}
                        type="submit"
                        className=" flex-1 text-lg font-medium"

                    >

                        Update Password
                    </Button>

                </div>
                {/* {error && <div className="text-red-500 mt-2 text-center">{error}</div>} */}
            </form>
        </div>
    )
}

export default ResetPassword
