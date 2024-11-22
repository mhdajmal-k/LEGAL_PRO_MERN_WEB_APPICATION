import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store/store';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';
import Select, { MultiValue } from "react-select";
import { practiceAreas } from '../../utils/constants/PracticeAreas';
import { updateProfessionalData } from '../../services/store/features/lawyerServices';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';



interface OptionType {
    value: string;
    label: string;
}

const LawyerProfile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { lawyerInfo, } = useSelector((state: RootState) => state.lawyer);
    const [editMode, setEditMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null)

    const options: OptionType[] = practiceAreas.map(area => ({ value: area.value, label: area.label }));

    const formik = useFormik({
        initialValues: {
            userName: lawyerInfo?.userName || '',
            email: lawyerInfo?.email || '',
            gender: lawyerInfo?.gender || '',
            city: lawyerInfo?.city || '',
            state: lawyerInfo?.state || '',
            practiceArea: lawyerInfo?.practice_area || [],
            yearsOfExperience: lawyerInfo?.years_of_experience || '',
            barCouncilNumber: lawyerInfo?.certifications[0].enrolmentNumber || '',
            stateBarCouncilNumber: lawyerInfo?.certifications[1].enrolmentNumber || '',
            designation: lawyerInfo?.designation || '',
            courtPracticeArea: lawyerInfo?.courtPracticeArea || '',
            languages: lawyerInfo?.languages_spoken || [],
            aboutMe: lawyerInfo?.about || '',
            profilePicture: null as File | null
        },
        // validationSchema: lawyerProfileValidator,
        validateOnChange: editMode,
        validateOnBlur: editMode,
        onSubmit: async (values) => {

            const formData = new FormData();

            formData.append('userName', values.userName);
            formData.append('gender', values.gender);
            formData.append('city', values.city);
            formData.append('state', values.state);
            formData.append('years_of_experience', String(values.yearsOfExperience));
            formData.append('designation', values.designation);
            formData.append('courtPracticeArea', values.courtPracticeArea);
            formData.append('about', values.aboutMe);

            formData.append('practice_area', JSON.stringify(values.practiceArea));


            formData.append('languages', JSON.stringify(values.languages));
            if (values.profilePicture) {
                formData.append('profilePicture', values.profilePicture);
            }
            try {
                console.log(formData, "is the form data in the professionalData")
                const response = await dispatch(updateProfessionalData(formData)).unwrap();

                if (response.status) {
                    toast(<CustomToast message={response.message} type="success" />);

                }
            } catch (error: any) {
                toast(<CustomToast message={error || error.message} type="error" />);
            }
            setEditMode(false)
        },
    });

    const handleSelectChange = (newValue: MultiValue<OptionType>) => {
        const selectedValues = newValue.map(option => option.value);
        formik.setFieldValue('practiceArea', selectedValues);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0]
        if (file) {
            formik.setFieldValue("profilePicture", file)
        }
    }



    return (
        <div className='container mx-auto p-6'>
            <div className='max-w-3xl mx-auto shadow-lg p-8 rounded-lg'>
                <div className='flex justify-center'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300'>
                        <img
                            src={formik.values.profilePicture ? URL.createObjectURL(formik.values.profilePicture) : lawyerInfo?.profile_picture || 'https://via.placeholder.com/150'}

                            alt='Lawyer Avatar'
                            className='object-cover'
                        />

                    </div>

                </div>
                <Button color="primary" className='text-center items-center' onClick={() => fileInputRef.current?.click()}>
                    Change
                </Button>
                <input type='file'
                    ref={fileInputRef}
                    onChange={handleChange}
                    className='hidden'
                    accept='image/*' />
                <h2 className='text-center text-2xl font-bold mt-4'>Welcome {lawyerInfo?.userName}</h2>

                <form onSubmit={formik.handleSubmit} className='space-y-6 mt-6'>
                    <Input
                        label='Name'
                        name='userName'
                        value={formik.values.userName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.userName && !!formik.touched.userName}
                        errorMessage={editMode && formik.touched.userName && formik.errors.userName}
                    />

                    <Input
                        label='Email'
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly

                    />

                    <Input
                        label='Gender'
                        name='gender'
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.gender && !!formik.touched.gender}
                        errorMessage={editMode && formik.touched.gender && formik.errors.gender}
                    />

                    <div className='grid grid-cols-3 gap-4'>
                        <Input
                            label='City'
                            name='city'
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!editMode}
                            isInvalid={editMode && !!formik.errors.city && !!formik.touched.city}
                            errorMessage={editMode && formik.touched.city && formik.errors.city}
                        />

                        <Input
                            label='State'
                            name='state'
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!editMode}
                            isInvalid={editMode && !!formik.errors.state && !!formik.touched.state}
                            errorMessage={editMode && formik.touched.state && formik.errors.state}
                        />

                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium  text-gray-700'>Practice Areas</label>

                        {editMode ? (
                            <Select
                                isMulti
                                options={options}
                                value={options.filter(option => formik.values.practiceArea.includes(option.value))}
                                onChange={handleSelectChange}
                                isDisabled={!editMode}
                                className='z-20'
                            />
                        ) : (
                            <div className='text-sm font-medium text-gray-700'>
                                {formik.values.practiceArea.length > 0 ? (
                                    formik.values.practiceArea
                                        .map(area => options.find(option => option.value === area)?.label || area)
                                        .join(', ')
                                ) : (
                                    'No practice areas selected'
                                )}
                            </div>
                        )}

                        {editMode && formik.touched.practiceArea && formik.errors.practiceArea && (
                            <div className='text-red-500 text-sm'>{formik.errors.practiceArea}</div>
                        )}
                    </div>



                    <Input
                        label='Years of Experience'
                        name='yearsOfExperience'
                        value={formik.values.yearsOfExperience as string}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.yearsOfExperience && !!formik.touched.yearsOfExperience}
                        errorMessage={editMode && formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
                    />

                    <div className='grid  grid-cols-2 gap-4'>
                        <div>
                            <Input
                                label='Bar Council of India Number'
                                name='barCouncilNumber'
                                value={formik.values.barCouncilNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly
                                isInvalid={editMode && !!formik.errors.barCouncilNumber && !!formik.touched.barCouncilNumber}
                                errorMessage={editMode && formik.touched.barCouncilNumber && formik.errors.barCouncilNumber}
                            />

                        </div>
                        <div>
                            <Input
                                label='State Bar Council Number'
                                name='stateBarCouncilNumber'
                                value={formik.values.stateBarCouncilNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                readOnly
                                isInvalid={editMode && !!formik.errors.stateBarCouncilNumber && !!formik.touched.stateBarCouncilNumber}
                                errorMessage={editMode && formik.touched.stateBarCouncilNumber && formik.errors.stateBarCouncilNumber}
                            />

                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div className=''>
                            <select
                                name="designation"
                                onChange={formik.handleChange}
                                value={formik.values.designation}
                                className="w-full sm:p-2 border rounded my-2  bg-gray-200"
                            >
                                <option value={formik.values.designation}>{formik.values.designation}</option>
                                <option value="junior Advocate">Junior Advocate</option>
                                <option value="senior Advocate">Senior Advocate</option>
                            </select>
                        </div>
                        <div>

                            <select
                                name="courtPracticeArea"
                                onChange={formik.handleChange}
                                value={formik.values.courtPracticeArea}
                                className=" w-full sm:p-2 border rounded my-2 bg-gray-200"
                            >
                                <option value="" disabled>Court Practice Area</option>
                                <option value="district Court">District Court</option>
                                <option value="high Court">High Court</option>
                                <option value="supreme Court">Supreme Court</option>
                            </select>
                        </div>


                    </div>

                    <div className='space-y-2'>
                        <label className='block text-sm font-medium text-gray-700'>Languages Spoken</label>
                        <div className='flex flex-wrap gap-4'>
                            {['English', 'Hindi', 'Malayalam', 'Kannada', 'Tamil', 'Telugu', 'Other'].map((lang) => (
                                <label key={lang} className='inline-flex items-center'>
                                    <input
                                        type='checkbox'
                                        name='languages'
                                        value={lang}
                                        checked={formik.values.languages.includes(lang)}
                                        onChange={formik.handleChange}
                                        disabled={!editMode}
                                        className='form-checkbox'
                                    />
                                    <span className='ml-2'>{lang}</span>
                                </label>
                            ))}
                        </div>
                        {editMode && formik.touched.languages && formik.errors.languages && (
                            <div className='text-red-500 text-sm'>{formik.errors.languages}</div>
                        )}
                    </div>

                    <Textarea
                        label='About Me'
                        name='aboutMe'
                        value={formik.values.aboutMe}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.aboutMe && !!formik.touched.aboutMe}
                        errorMessage={editMode && formik.touched.aboutMe && formik.errors.aboutMe}
                    />

                    <div className='flex justify-end space-x-4'>
                        {!editMode && (
                            <Button onClick={() => setEditMode(true)} color="primary">
                                Edit Profile
                            </Button>
                        )}
                        {editMode && (
                            <>
                                <Button onClick={() => setEditMode(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LawyerProfile;