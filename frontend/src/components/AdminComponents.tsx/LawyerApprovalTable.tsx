import React, { useState } from 'react';
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomSkelton from '../skeltton';
import { CgProfile } from "react-icons/cg";

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react';
import { getLawyer, undVerifyLawyer, verifyLawyer } from '../../services/store/features/adminServices'; // Update this path to where your actions are defined
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
// import { Lawyer } from '../../utils/type/lawyerType';


interface Lawyer {
    _id: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    block: boolean;
    profile_picture: string;
    designation: string;
    years_of_experience: string;
    verified: boolean;
    city: string;
    state: string;
    languages_spoken: string[];
    practice_area: string[];
    certifications: Certification[];
}

interface Certification {
    certificateType: string;
    enrolmentNumber: string;
    certificate: string;
}


interface CommonTableProps {
    columns: string[];
    data: Lawyer[];
    onRefresh: () => void
}

const LawyerTable: React.FC<CommonTableProps> = ({ columns, data, onRefresh }) => {
    const dispatch: AppDispatch = useDispatch();
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | undefined>();
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [unverifyReason, setUnverifyReason] = useState('');
    const [showReasonInput, setShowReasonInput] = useState(false);
    const { loading } = useSelector((state: RootState) => state.admin);

    const handleView = async (id: string) => {
        try {
            const response = await dispatch(getLawyer(id)).unwrap();
            setSelectedLawyer(response.result);
            setViewModalOpen(true);
        } catch (error) {
            setViewModalOpen(false);
            console.error("Failed to fetch lawyer details", error);
        }
    };
    const handilclose = () => {
        setShowReasonInput(false)
        setUnverifyReason("")
    }

    const handleVerify = async () => {
        if (selectedLawyer) {
            try {

                const response = await dispatch(verifyLawyer(selectedLawyer._id)).unwrap();
                if (response.status) {
                    onRefresh()
                    toast(<CustomToast message={response.message} type="success" />);
                }
                setViewModalOpen(false);

            } catch (error: any) {
                console.error("Verification failed:", error);
                toast(<CustomToast message={error || error.message} type="error" />)
            }
        }
    };

    const handleUnverify = async () => {

        if (selectedLawyer) {
            try {
                const response = await dispatch(undVerifyLawyer({ id: selectedLawyer._id, reason: unverifyReason })).unwrap();
                if (response.status) {
                    onRefresh()
                }
                setViewModalOpen(false);

            } catch (error: any) {
                console.error("Verification failed:", error);
                toast(<CustomToast message={error} type="error" />)
            }
        }

    };

    return (
        <div className="overflow-x-auto mx-auto sm:max-w-6xl shadow-md rounded-lg ">
            <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-400 border-gray-300 text-white text-center">
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index} scope="col" className="px-6 py-3 text-left text-sm font-semibold tracking-wider uppercase">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading && (
                        <div>
                            <CustomSkelton />
                            <CustomSkelton />
                            <CustomSkelton />
                        </div>
                    )}
                    {data.length > 0 ? (
                        data.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100 transition duration-300 ease-in-out even:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10">
                                            {user?.profile_picture ? (
                                                <img
                                                    className="h-10 w-10 rounded-full border-2 border-blue-500"
                                                    src={user.profile_picture}
                                                    alt={user.userName || 'Profile Picture'}
                                                />
                                            ) : (
                                                <CgProfile className="h-10 w-10 text-black" />
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-800">{user?.userName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{user?.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{user?.designation || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{user?.years_of_experience + " years" || 'N/A'}</div>
                                </td>
                                <td>
                                    <Button onClick={() => handleView(user._id)} color='primary'>VERIFY</Button>
                                </td>
                                <td>
                                    <Button onClick={() => handleView(user._id)} color='primary'>VIEW</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4">No Pending Lawyers</td>
                        </tr>
                    )}
                </tbody>
            </table>



            <Modal isOpen={isViewModalOpen} onOpenChange={setViewModalOpen} placement="center" className="container mt-5">
                <ModalContent className="max-w-xl p-6 bg-white shadow-lg rounded-lg">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center text-xl font-semibold text-gray-800 ">
                                Lawyer Profile
                            </ModalHeader>
                            <ModalBody className="flex flex-col items-center">
                                {selectedLawyer ? (
                                    <div className="w-full">
                                        <div className="flex justify-center mb-4">
                                            <img
                                                className="rounded-full border-4 border-blue-500 shadow-lg"
                                                src={selectedLawyer.profile_picture}
                                                alt={selectedLawyer.userName}
                                                style={{ width: '120px', height: '120px' }}
                                            />
                                        </div>
                                        <div className="text-left space-y-2">
                                            <h3 className="text-lg font-semibold">Name: <span className="font-normal">{selectedLawyer.userName}</span></h3>
                                            <p className="text-gray-600">Email: <span className="font-normal">{selectedLawyer.email}</span></p>
                                            <p className="text-gray-600">Phone Number: <span className="font-normal">{selectedLawyer.phoneNumber || 'N/A'}</span></p>
                                            <p className="text-gray-600">City: <span className="font-normal">{selectedLawyer.city || 'N/A'}</span></p>
                                            <p className="text-gray-600">State: <span className="font-normal">{selectedLawyer.state || 'N/A'}</span></p>
                                            <p className="text-gray-600">Years of Experience: <span className=" font-semibold text-black">{selectedLawyer.years_of_experience}</span></p>
                                            <p className="text-gray-600">Designation: <span className="font-semibold text-black">{selectedLawyer.designation}</span></p>
                                            <p className="text-gray-600">Practice Areas: <span className="font-semibold text-black">{selectedLawyer.practice_area.join(', ') || 'N/A'}</span></p>
                                            <p className="text-gray-600">Languages Spoken: <span className="font-normal">{selectedLawyer.languages_spoken.join(', ') || 'N/A'}</span></p>

                                            <div className="mt-4">
                                                <strong>Certifications:</strong>
                                                {selectedLawyer.certifications && selectedLawyer.certifications.length > 0 ? (
                                                    <ul className="space-y-3">
                                                        {selectedLawyer.certifications.map((cert, index) => (
                                                            <li key={index} className="bg-gray-50 p-3 rounded-lg border shadow-sm">
                                                                <p className="text-gray-800">Type: <span className="font-normal">{cert.certificateType}</span></p>
                                                                <p className="text-gray-800">Enrolment Number: <span className="font-normal">{cert.enrolmentNumber}</span></p>
                                                                {cert.certificate && (
                                                                    <a href={cert.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-1 block">
                                                                        View Certificate
                                                                    </a>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-600">N/A</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </ModalBody>

                            <ModalFooter className="flex justify-between w-full mt-6 gap-3">
                                <Button id="close-btn" color="danger" variant="flat" onPress={onClose} onClick={handilclose} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                    Close
                                </Button>
                                {!showReasonInput && (
                                    <Button
                                        id="verify-btn"
                                        color="success"
                                        variant="flat"
                                        onPress={handleVerify}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        VERIFY
                                    </Button>
                                )}
                                <Button
                                    id="unverify-btn"
                                    color="danger"
                                    variant="flat"
                                    onPress={() => setShowReasonInput(true)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                >
                                    UNVERIFY
                                </Button>

                                {showReasonInput && (
                                    <div className="flex flex-col items-center space-y-3 w-full mt-4">
                                        <Input
                                            type="text"
                                            placeholder="Enter reason"
                                            value={unverifyReason}
                                            onChange={(e) => setUnverifyReason(e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
                                        />
                                        <Button
                                            onPress={handleUnverify}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    );
};

export default LawyerTable;
