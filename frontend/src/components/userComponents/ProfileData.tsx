
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store/store';
import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import { userDataUpdateValidator } from '../../utils/validator/loginValidaotr';
interface FormValues {
    userName: string;
    email: string;
    phoneNumber?: string;
}


const ProfileData: React.FC = () => {
    const { userInfo, error, loading } = useSelector((state: RootState) => state.user)
    const [editMode, setEditMode] = useState(false);
    const formik = useFormik({
        initialValues: {
            userName: userInfo?.userName || "",
            email: userInfo?.email || '',
            phoneNumber: userInfo?.phoneNumber || '',

        },
        validationSchema: userDataUpdateValidator,
        validateOnChange: editMode,
        validateOnBlur: editMode,
        onSubmit: async (values: FormValues) => {
            alert(values)
            console.log("cllaed")
            // setEditMode(false);
            // try {
            //     const response = await dispatch(loginUser(values)).unwrap();
            //     if (response) {
            //         navigate('/');
            //     }



            // } catch (error: any) {
            //     console.error("Login error:", error);
            //     toast(<CustomToast message={error.message || 'An error occurred during login'} type="error" />);
            // }
        },
    });

    return (
        <div>

            <div className="mb-4 items-center flex justify-center flex-col">
                <div className="w-34 h-32 rounded-full border-4 border-white overflow-hidden">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <p>Welcome {userInfo?.userName}.</p>
                <form className='w-full md:w-2/3 pr-0 md:pr-4 md:ml-2 space-y-4 h-full' onSubmit={formik.handleSubmit}>

                    <Input
                        type="text"
                        label="Username"
                        name='userName'
                        size="sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={editMode && !!formik.errors.userName && !!formik.touched.userName} // Update condition to only show error in edit mode
                        value={formik.values.userName}
                        variant={editMode ? "bordered" : "flat"}
                        readOnly={!editMode}
                    />

                    {formik.errors.userName && formik.touched.userName && editMode && (
                        <div className='text-red-500 text-sm'>{formik.errors.userName}</div>
                    )}


                    <Input
                        type="email"
                        label="Email"
                        name='email'
                        size="sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={editMode && !!formik.errors.email && !!formik.touched.email}
                        value={formik.values.email}
                        variant={editMode ? "bordered" : "flat"}
                        readOnly={!editMode}
                    />
                    {formik.errors.email && formik.touched.email && editMode && (
                        <div className='text-red-500 text-sm'>{formik.errors.email}</div>
                    )}

                    <Input
                        type="tel"
                        label="Phone Number"
                        name='phoneNumber'
                        size="sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isInvalid={!!formik.errors.phoneNumber && !!formik.touched.phoneNumber}
                        value={formik.values.phoneNumber}
                        variant={editMode ? "bordered" : "flat"}
                        readOnly={!editMode}
                    />
                    {formik.errors.phoneNumber && formik.touched.phoneNumber && editMode && (
                        <div className='text-red-500 text-sm'>{formik.errors.phoneNumber}</div>
                    )}
                    <div className='flex gap-3'>
                        <Button
                            color={editMode ? "default" : "primary"}
                            type="button"
                            className=" flex-1"
                            onClick={() => setEditMode((prevEditMode) => !prevEditMode)} // Toggle edit mode
                        >
                            {editMode ? 'Cancel' : 'Edit'} {/* Change button text based on edit mode */}
                        </Button>
                        {editMode && (
                            <Button
                                color="success"
                                type="submit"
                                className="flex-1"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </Button>
                        )}
                    </div>


                    {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                </form>
            </div>

        </div>
    );
};

export default ProfileData;

