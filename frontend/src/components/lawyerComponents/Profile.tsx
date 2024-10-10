import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store/store';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useFormik } from 'formik';

import Select, { MultiValue } from "react-select";
import { practiceAreas } from '../../utils/constants/PracticeAreas';
import { lawyerProfileValidator } from '../../utils/validator/LawyerProfileProfessional';



interface OptionType {
    value: string;
    label: string;
}

const LawyerProfile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { lawyerInfo, error, loading } = useSelector((state: RootState) => state.lawyer);
    const [editMode, setEditMode] = useState(false);


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
            courtPracticeArea: lawyerInfo?.practice_area || '',
            languages: lawyerInfo?.languages_spoken || [],
            aboutMe: lawyerInfo?.about || '',
        },
        validationSchema: lawyerProfileValidator,
        validateOnChange: editMode,
        validateOnBlur: editMode,
        onSubmit: (values) => {
            const formData = new FormData();
        },
    });

    const handleSelectChange = (newValue: MultiValue<OptionType>) => {
        const selectedValues = newValue.map(option => option.value);
        formik.setFieldValue('practiceArea', selectedValues);
    };



    return (
        <div className='container mx-auto p-6'>
            <div className='max-w-3xl mx-auto shadow-lg p-8 rounded-lg'>
                <div className='flex justify-center'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300'>
                        <img
                            src={lawyerInfo?.profile_picture || 'https://via.placeholder.com/150'}
                            alt='Lawyer Avatar'
                            className='w-full h-full object-cover'
                        />
                    </div>
                </div>
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
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.email && !!formik.touched.email}
                        errorMessage={editMode && formik.touched.email && formik.errors.email}
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


                    {/* 
                    <Input
                        label='Years of Experience'
                        name='yearsOfExperience'
                        value={formik.values.yearsOfExperience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        readOnly={!editMode}
                        isInvalid={editMode && !!formik.errors.yearsOfExperience && !!formik.touched.yearsOfExperience}
                        errorMessage={editMode && formik.touched.yearsOfExperience && formik.errors.yearsOfExperience}
                    /> */}

                    <div className='grid grid-cols-2 gap-4'>
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
                        <Input
                            label='Designation'
                            name='designation'
                            value={formik.values.designation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            readOnly={!editMode}
                            isInvalid={editMode && !!formik.errors.designation && !!formik.touched.designation}
                            errorMessage={editMode && formik.touched.designation && formik.errors.designation}
                        />

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