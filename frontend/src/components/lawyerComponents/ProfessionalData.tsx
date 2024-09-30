import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { practiceAreas } from '../../utils/constants/PracticeAreas';
import Select, { ActionMeta, MultiValue } from "react-select"
import { IoMdClose } from 'react-icons/io';
interface OptionType {
    value: string;
    label: string;
}

const ProfessionalData: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.lawyer);
    const options: OptionType[] = practiceAreas.map(area => ({ value: area.value, label: area.label }));
    const [selectedImageIndia, setSelectedImageIndia] = useState<File | null>(null);
    const [previewImageIndia, setPreviewImageIndia] = useState<string | null>(null);
    const [selectedImageKerala, setSelectedImageKerala] = useState<File | null>(null);
    const [previewImageKerala, setPreviewImageKerala] = useState<string | null>(null);

    const handleIndiaImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageIndia(file);
            setPreviewImageIndia(URL.createObjectURL(file));
        }
    };

    const handleKeralaImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageKerala(file);
            setPreviewImageKerala(URL.createObjectURL(file));
        }
    };

    const handleSelectChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
        const selectedValues = newValue.map(option => option.value);
        formik.setFieldValue('practiceArea', selectedValues);
    };
    const handleRemoveImageKerala = () => {
        if (previewImageKerala) {
            if (previewImageKerala) URL.revokeObjectURL(previewImageKerala);
        }
        setSelectedImageKerala(null);
        setPreviewImageKerala(null);
    };
    const handleRemoveImageIndia = () => {
        if (previewImageIndia) {
            if (previewImageIndia) URL.revokeObjectURL(previewImageIndia);
        }
        setSelectedImageIndia(null);
        setPreviewImageIndia(null);
    };




    const formik = useFormik({
        initialValues: {
            practiceArea: [] as string[],
            yearsOfExperience: '',
            barCouncilNumber: '',
            stateBarCouncilNumber: '',
            designation: '',
            courtPracticeArea: '',
            languages: [],
            aboutMe: '',
        },
        onSubmit: async (values) => {
            const formData = new FormData()
            console.log(values)
            // Object.keys(values).forEach(Key => {
            //     formData.append(Key, values[Key as keyof typeof values])
            // })

            // console.log(formData)
            // if (selectedImage) {
            //     formData.append('image', selectedImage);
            // }
            // try {
            //     const lawyerSignUpData: LawyerSignUpData = Object.fromEntries(formData) as LawyerSignUpData;
            //     const response = await dispatch(signUpLawyer(lawyerSignUpData)).unwrap();
            //     console.log(response, "checking.....")
            //     if (response.status) {
            //         toast(<CustomToast message={response.message} type="success" />);
            //         navigate('/lawyer/verify-otp');
            //     }
            //     console.log(lawyerSignUpData)
            // } catch (error: any) {
            //     toast(<CustomToast message={error} type="error" />);
            // }
        },
    });

    return (
        <div className='container'>
            <div className='flex-grow sm:mx-auto min-h-screen'>
                <h1 className="text-2xl font-bold p-4 text-center">Sign up as Lawyer</h1>
                <div className='max-w-4xl mx-auto sm:mt-8 mb-16 shadow-lg rounded-lg sm:y-10 border border-current'>
                    <div className='flex'>
                        <div className='w-4/5 p-6'>
                            <div className="mb-4">
                                <span className="bg-primary text-white px-2 py-1 rounded text-sm">Step 3/3</span>
                                <h2 className="text-xl font-semibold mt-2">Professional Information</h2>
                            </div>
                            <form className="space-y-4 container" onSubmit={formik.handleSubmit}>

                                {/* Replace standard <select> with CustomSelect */}
                                <Select
                                    placeholder="Practice Area"
                                    options={options}
                                    isMulti={true}
                                    onChange={handleSelectChange}
                                    value={options.filter(option => formik.values.practiceArea.includes(option.value))}
                                    theme={(theme) => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            neutral90: 'hotpink',
                                            primary: 'black',
                                        },
                                    })}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            borderRadius: '8px', // Adds rounded corners to the input
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                            zIndex: 9999,
                                        }),
                                    }}
                                />


                                <select
                                    name="yearsOfExperience"
                                    onChange={formik.handleChange}
                                    value={formik.values.yearsOfExperience}
                                    className="w-full py-2 border rounded bg-white pl-2 text-gray-600 "
                                >
                                    <option value="" disabled>Years of Experience</option>
                                    <option value="1">1 year</option>
                                    <option value="2">2 years</option>
                                    <option value="3">3 years</option>
                                    <option value="4">4 years</option>
                                    <option value="4">5+ years</option>

                                </select>
                                <div className="space-y-4">

                                    <div className="md:flex   items-end space-x-4">

                                        <div className="md:w-1/2  w-full ">
                                            <Input
                                                type="text"
                                                label="Bar Council of India Number"
                                                name="barCouncilNumber"
                                                size="sm"
                                                onChange={formik.handleChange}
                                                value={formik.values.barCouncilNumber}
                                                variant="bordered"
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Image Upload for Bar Council of India */}
                                        <div className='sm:py-2'>
                                            <input
                                                type='file'
                                                onChange={handleIndiaImageChange}
                                                accept='image/*'
                                                style={{ display: 'none' }}
                                                id="indiaImageUpload"
                                            />
                                            <label htmlFor="indiaImageUpload" className="cursor-pointer bg-primary text-white sm:px-2 py-1 rounded text-sm">
                                                Select Image
                                            </label>


                                        </div>
                                        {previewImageIndia && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img src={previewImageIndia} alt='Selected' className='w-24 h-24 object-contain border' />
                                                <button onClick={handleRemoveImageIndia} className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                                                    <IoMdClose /> <span>Remove</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* State Bar Council Section */}
                                    <div className="md:flex items-end space-x-4">
                                        {/* Input for State Bar Council Number */}
                                        <div className="md:w-1/2 w-full">
                                            <Input
                                                type="text"
                                                label="State Bar Council Number (optional)"
                                                name="stateBarCouncilNumber"
                                                size="sm"
                                                onChange={formik.handleChange}
                                                value={formik.values.stateBarCouncilNumber}
                                                variant="bordered"
                                                className="w-full"
                                            />
                                        </div>

                                        {/* Image Upload for State Bar Council */}
                                        <div className='py-2'>
                                            <input
                                                type='file'
                                                onChange={handleKeralaImageChange}
                                                accept='image/*'
                                                style={{ display: 'none' }}
                                                id="keralaImageUpload"
                                            />
                                            <label htmlFor="keralaImageUpload" className="cursor-pointer bg-primary text-white px-2 py-1 rounded text-sm">
                                                Select Image
                                            </label>


                                        </div>
                                        {previewImageKerala && (
                                            <div style={{ marginTop: '10px' }}>
                                                <img src={previewImageKerala} alt='Selected' className='w-24 h-24 object-contain border' />
                                                <button onClick={handleRemoveImageKerala} className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                                                    <IoMdClose /> <span>Remove</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className="md:flex sm:space-x-2">
                                    <select
                                        name="designation"
                                        onChange={formik.handleChange}
                                        value={formik.values.designation}
                                        className="sm:w-1/2 w-full sm:p-2 border rounded my-2"
                                    >
                                        <option value="">Designation</option>
                                        <option value="junior Advocate">Junior Advocate</option>
                                        <option value="senior Advocate">Senior Advocate</option>
                                        {/* Add more designation options */}
                                    </select>
                                    <select
                                        name="courtPracticeArea"
                                        onChange={formik.handleChange}
                                        value={formik.values.courtPracticeArea}
                                        className="sm:w-1/2 w-full sm:p-2 border rounded my-2"
                                    >
                                        <option value="">Court Practice Area</option>
                                        <option value="district Court">District Court</option>
                                        <option value="high Court">High Court</option>
                                        <option value="supreme Court">Supreme Court</option>
                                    </select>
                                </div>

                                <div className=''>
                                    <label className="block my-5">Language Spoken</label>
                                    <div className="flex flex-wrap gap-4 my-3">
                                        {['English', 'Hindi', 'Malayalam', 'Kannada', 'Tamil', 'Telugu', 'Other'].map((lang) => (
                                            <label key={lang} className="inline-flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="languages"
                                                    value={lang}
                                                    onChange={formik.handleChange}
                                                    className="form-checkbox"
                                                />
                                                <span className="ml-2">{lang}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <textarea
                                    name="aboutMe"
                                    placeholder="About me"
                                    onChange={formik.handleChange}
                                    value={formik.values.aboutMe}
                                    className="w-full p-2 border rounded bg-gray-300"
                                />

                                <Button color="primary" type="submit" className="w-full">
                                    {loading ? "Signing Up..." : "Sign Up as Lawyer"}
                                </Button>
                                {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
                            </form>
                        </div>
                        <div className="bg-primary rounded-md w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalData;
