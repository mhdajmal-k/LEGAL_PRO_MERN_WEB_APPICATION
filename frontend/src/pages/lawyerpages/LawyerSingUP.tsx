import React, { useEffect, useState } from 'react';

import LegalFooter from '../../layout/footer';
import { Button, Input } from '@nextui-org/react';
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import { clearError } from '../../services/store/features/lawyerSlilce';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { lawyerValidationSchema } from '../../utils/validator/lawyerValidate';
import { signUpLawyer } from '../../services/store/features/lawyerServices';
import CustomToast from '../../components/userComponents/CustomToast';
import { IoMdClose } from "react-icons/io";
import { LawyerSignUpData } from '../../utils/type/userType';
import AdminNavbar from '../../layout/AdminNavbar';


const LawyerSignUp: React.FC = () => {
    const [showPassword, setShowPassword] = useState<Boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<Boolean>(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewAImage, setPreviewImage] = useState<string | null>(null)

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file)
            setPreviewImage(URL.createObjectURL(file))
        }
    };


    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.lawyer);

    useEffect(() => {



        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 2000);
        }
        return () => {
            if (previewAImage) {

                // URL.revokeObjectURL(previewAImage);
                URL.revokeObjectURL(previewAImage); // Cleanup memory when component unmounts or on re-render
            }
        };
    }, [error, dispatch, previewAImage]);

    const formik = useFormik({
        initialValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            city: '',
            state: '',
            zipCode: '',
        },
        validationSchema: lawyerValidationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const formData = new FormData()
            Object.keys(values).forEach(Key => {
                formData.append(Key, values[Key as keyof typeof values])
            })


            if (selectedImage) {
                formData.append('image', selectedImage);
            }
            try {
                const lawyerSignUpData: LawyerSignUpData = Object.fromEntries(formData) as LawyerSignUpData;
                console.log(lawyerSignUpData)
                const response = await dispatch(signUpLawyer(lawyerSignUpData)).unwrap();
                console.log(response, "checking.....")
                if (response.status) {
                    toast(<CustomToast message={response.message} type="success" />);
                    navigate('/lawyer/verify-otp');
                }
                console.log(lawyerSignUpData)
            } catch (error: any) {
                toast(<CustomToast message={error || error.message} type="error" />);
            }
        },
    });
    const handelRemove = () => {
        if (previewAImage) {
            URL.revokeObjectURL(previewAImage)
        }
        setSelectedImage(null)
        setPreviewImage(null)


    }

    return (
        <>

            <AdminNavbar />
            <div className='container'>
                <div className='flex-grow sm:mx-auto min-h-screen'>
                    <h1 className="text-2xl font-bold p-4 text-center">Sign up as Lawyer</h1>
                    <div className='max-w-3xl mx-auto  sm:mt-8   mb-16 shadow-lg rounded-lg  sm:y-10 border border-current'>
                        <div className="flex">
                            <div className="w-4/5 p-6">
                                <div className="mb-4">
                                    <span className="bg-primary text-white px-2 py-1 rounded text-sm">Step 1/3</span>
                                    <h2 className="text-xl font-semibold mt-2">Personal Information</h2>
                                </div>
                                <form className="space-y-4 container" onSubmit={formik.handleSubmit}>
                                    <Input
                                        type="text"
                                        label="Username"
                                        name='userName'
                                        size="sm"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.userName}
                                        variant="bordered"
                                        isInvalid={!!formik.errors.userName}
                                    />
                                    {formik.errors.userName && formik.touched.userName ? <div className='text-red-500 text-sm'>{formik.errors.userName}</div> : null}

                                    <div>
                                        <label className="block mb-1">Gender</label>
                                        <div className="space-x-4">
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="gender" value="Male" onChange={formik.handleChange} />
                                                <span className="ml-2">Male</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="gender" value="Female" onChange={formik.handleChange} />
                                                <span className="ml-2">Female</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="gender" value="Other" onChange={formik.handleChange} />
                                                <span className="ml-2">Other</span>
                                            </label>
                                        </div>
                                        {formik.errors.gender && formik.touched.gender ? <div className='text-red-500 text-sm'>{formik.errors.gender}</div> : null}
                                    </div>

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
                                    <div className='py-4'>
                                        <input
                                            type='file'
                                            onChange={handleImageChange}
                                            accept='image/*'
                                            style={{ display: 'none' }}
                                            id="imageUpload"
                                        />
                                        <label htmlFor="imageUpload" className="cursor-pointer font-light bg-primary text-white px-1 py-2 rounded">
                                            Select Profile Image
                                        </label>

                                        {previewAImage && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img src={previewAImage} alt='Selected' className='w-36 h-32 object-contain' />
                                                <button onClick={handelRemove} className="mt-2 text-red-500">
                                                    <IoMdClose /> Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-4">
                                        <Input
                                            type="text"
                                            label="City"
                                            name='city'
                                            size="sm"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.city}
                                            variant="bordered"
                                            isInvalid={!!formik.errors.city && formik.touched.city}
                                        />
                                        <div className="inline-block">

                                            {formik.errors.city && formik.touched.city ? <div className='text-red-500 text-sm'>{formik.errors.city}</div> : null}
                                        </div>
                                        <Input
                                            type="text"
                                            label="State"
                                            name='state'
                                            size="sm"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.state}
                                            variant="bordered"
                                            isInvalid={!!formik.errors.state && formik.touched.state}
                                        />
                                        {formik.errors.state && formik.touched.state ? <div className='text-red-500 text-sm'>{formik.errors.state}</div> : null}
                                        <Input
                                            type="text"
                                            label="Zip Code"
                                            name='zipCode'
                                            size="sm"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.zipCode}
                                            variant="bordered"
                                            isInvalid={!!formik.errors.zipCode && formik.touched.zipCode}
                                        />
                                        {formik.errors.zipCode && formik.touched.zipCode ? <div className='text-red-500 text-sm'>{formik.errors.zipCode}</div> : null}
                                    </div>

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
                                    <div className="relative">
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
                                            style={{ position: "absolute", right: '10px', top: '50%', transform: 'translateY(-50%)' }} // Prevent movement
                                        >
                                            {showConfirmPassword ? <FaRegEye className="h-5 w-5" /> : <FaEyeSlash className="h-5 w-5" />}
                                        </button>
                                    </div>

                                    <Button color="primary" type="submit" className="w-full">
                                        {loading ? "Signing Up..." : "Sign Up"}
                                    </Button>
                                    {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                                </form>
                            </div>
                            <div className=" bg-primary rounded-md w-full"></div>
                        </div>
                        <p className="my-4 text-center text-sm text-gray-600">
                            Already have an account? <Link to={"/lawyer/login"} className='text-blue-900' >Sign In </Link>
                        </p>
                    </div>
                </div>
            </div >
            <LegalFooter />
        </>
    );
}

export default LawyerSignUp;
