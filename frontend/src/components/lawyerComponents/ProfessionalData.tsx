import { Button, Input } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { practiceAreas } from '../../utils/constants/PracticeAreas';
import Select, { ActionMeta, MultiValue } from "react-select"
import { IoMdClose } from 'react-icons/io';
import { clearError } from '../../services/store/features/lawyerSlilce';
import { lawyerProfessionalValidate } from '../../utils/validator/lawyerValidate';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

import { verifyProfessionalData } from '../../services/store/features/lawyerServices';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
    const [modalOpen, setModalOpen] = useState(false);
    const Navigate = useNavigate()
    const handleIndiaImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageIndia(file);
            setPreviewImageIndia(URL.createObjectURL(file));
        }
    };
    if (modalOpen) {
        setTimeout(() => {
            Navigate("/lawyer/login")
        }, 3000)
    }
    const handleKeralaImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImageKerala(file);
            setPreviewImageKerala(URL.createObjectURL(file));
        }
    };
    //changes in the metaaction
    const handleSelectChange = (newValue: MultiValue<OptionType>, _actionMeta: ActionMeta<OptionType>) => {
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

        }, validationSchema: lawyerProfessionalValidate,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('practiceArea', JSON.stringify(values.practiceArea));
            formData.append('yearsOfExperience', values.yearsOfExperience);
            formData.append('barCouncilNumber', values.barCouncilNumber);
            formData.append('stateBarCouncilNumber', values.stateBarCouncilNumber);
            formData.append('designation', values.designation);
            formData.append('courtPracticeArea', values.courtPracticeArea);
            formData.append('languages', JSON.stringify(values.languages));
            formData.append('aboutMe', values.aboutMe);
            if (selectedImageIndia) formData.append('imageIndia', selectedImageIndia);
            if (selectedImageKerala) formData.append('imageKerala', selectedImageKerala);
            try {
                console.log(formData, "is the form data in the professionalData")
                const response = await dispatch(verifyProfessionalData(formData)).unwrap();

                if (response.status) {
                    setModalOpen(true);
                }
            } catch (error: any) {
                toast(<CustomToast message={error || error.message} type="error" />);
            }
        }
    });

    useEffect(() => {
        console.log("hi")
        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 2000);
        }
        return () => {
            if (previewImageKerala) URL.revokeObjectURL(previewImageKerala)
            if (previewImageIndia) URL.revokeObjectURL(previewImageIndia)
        };
    }, [error, dispatch, previewImageIndia, previewImageKerala]);


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
                                            borderRadius: '8px',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            backgroundColor: 'white',
                                            zIndex: 9999,
                                        }),
                                    }}
                                />
                                {formik.errors.practiceArea && formik.touched.practiceArea ? <div className='text-red-500 text-sm'>{formik.errors.practiceArea}</div> : null}



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
                                {formik.errors.yearsOfExperience && formik.touched.yearsOfExperience ? <div className='text-red-500 text-sm'>{formik.errors.yearsOfExperience}</div> : null}
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
                                            {formik.errors.barCouncilNumber && formik.touched.barCouncilNumber ? <div className='text-red-500 text-sm'>{formik.errors.barCouncilNumber}</div> : null}

                                        </div>

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

                                    <div className="md:flex items-end space-x-4">
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
                                        {/* chack later */}
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
                                    </select>
                                    {formik.errors.designation && formik.touched.designation ? <div className='text-red-500 text-sm'>{formik.errors.designation}</div> : null}

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
                                    {formik.errors.courtPracticeArea && formik.touched.courtPracticeArea ? <div className='text-red-500 text-sm'>{formik.errors.courtPracticeArea}</div> : null}

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
                                    {formik.errors.languages && formik.touched.languages ? <div className='text-red-500 text-sm'>{formik.errors.languages}</div> : null}

                                </div>

                                <textarea
                                    name="aboutMe"
                                    placeholder="About me"
                                    onChange={formik.handleChange}
                                    value={formik.values.aboutMe}
                                    minLength={10}
                                    maxLength={400}
                                    className="w-full p-2 border rounded bg-gray-300"
                                />
                                {formik.errors.aboutMe && formik.touched.aboutMe ? <div className='text-red-500 text-sm'>{formik.errors.aboutMe}</div> : null}


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
            <Modal
                backdrop="opaque"
                isOpen={modalOpen}
                onOpenChange={() => setModalOpen(false)}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Submitted Successfully</ModalHeader>
                            <ModalBody>
                                <h1>Submitted Successfully</h1>
                                <p>
                                    Thank you for registering with LegalPro. We have received your details and documents.
                                </p>
                                <p>
                                    Our team will review your submission to verify your credentials, which usually takes 24 to 48 hours. Once approved, you will eceive a confirmation email, and your profile will be activated. You can then access the lawyer dashboard, manage your profile, and start receiving client inquiries.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-primary shadow-lg shadow-indigo-500/20 text-white" onClick={() => Navigate("/lawyer/login")}>
                                    Back to Login Page
                                </Button>
                            </ModalFooter>
                        </>
                        // onPress={onClose}
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ProfessionalData;
