
import { Lawyer } from "../../utils/type/lawyerType";
import CustomSkelton from "../skeltton";
import { CgProfile } from "react-icons/cg";
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { blockandUnblock, getLawyer } from "../../services/store/features/adminServices";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input } from '@nextui-org/react';
import CustomToast from "../userComponents/CustomToast";
import { toast } from 'sonner';
interface LawyerTableListProps {
    columns: string[];
    data: Lawyer[];
    onRefresh: () => void
}


const LawyerTableList: React.FC<LawyerTableListProps> = ({ columns, data, onRefresh }) => {
    const { loading } = useSelector((state: RootState) => state.admin);
    const dispatch: AppDispatch = useDispatch();
    const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | undefined>();
    const [isViewModalOpen, setViewModalOpen] = useState(false);

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
    async function handleBlockorUBlock(id: string, block: boolean): Promise<void> {
        try {
            const response = await dispatch(blockandUnblock({ id, state: !block, action: "lawyer" })).unwrap();
            if (response.status) {
                toast(<CustomToast message={response.message} type="success" />);
                onRefresh()
            }
            // setViewModalOpen(false);

        } catch (error: any) {
            console.error("Verification failed:", error);
            toast(<CustomToast message={error} type="error" />)
        }


    }
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
                        data.map((lawyer) => (
                            <tr key={lawyer._id} className="hover:bg-gray-100 transition duration-300 ease-in-out even:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10">
                                            {lawyer?.profile_picture ? (
                                                <img
                                                    className="h-10 w-10 rounded-full border-2 border-blue-500"
                                                    src={lawyer.profile_picture}
                                                    alt={lawyer.userName || 'Profile Picture'}
                                                />
                                            ) : (
                                                <CgProfile className="h-10 w-10 text-black" />
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-gray-800">{lawyer?.userName}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{lawyer?.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{lawyer?.designation || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-800">{lawyer?.years_of_experience + " years" || 'N/A'}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${lawyer?.block ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                            }`}
                                    >
                                        {lawyer.block ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <Button className='mt-3' onClick={() => handleBlockorUBlock(lawyer._id, lawyer.block)}
                                    color={lawyer?.block ? 'danger' : "success"}
                                >
                                    {lawyer?.block ? 'UnBlock' : "Block"}
                                </Button>
                                <td>
                                    <Button onClick={() => handleView(lawyer._id)} color='primary'>VIEW</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-4">No  Lawyers Found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal for Viewing Lawyer Details */}
            <Modal isOpen={isViewModalOpen} onOpenChange={setViewModalOpen} placement="top-center" className='container'>
                <ModalContent className='max-w-xl flex items-center justify-center gap-2'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Lawyer Profile</ModalHeader>
                            <ModalBody>
                                {selectedLawyer ? (
                                    <div>
                                        <img
                                            className="rounded-full border-2 border-blue-500 mx-auto"
                                            src={selectedLawyer.profile_picture}
                                            alt={selectedLawyer.userName}
                                            style={{ width: '100px', height: '100px' }}
                                        />
                                        <div className='my-3'>
                                            <h3>Name: {selectedLawyer.userName}</h3>
                                            <p>Email: {selectedLawyer.email}</p>
                                            <p>Phone Number: {selectedLawyer.phoneNumber || 'N/A'}</p>
                                            <p>City: {selectedLawyer.city || 'N/A'}</p>
                                            <p>State: {selectedLawyer.state || 'N/A'}</p>
                                            <p>Years of Experience: {selectedLawyer.years_of_experience}</p>
                                            <p>Designation: {selectedLawyer.designation}</p>
                                            <p>Verified: {selectedLawyer.verified ? 'Yes' : 'No'}</p>
                                            <p>Practice Areas: {selectedLawyer.practice_area.join(', ') || 'N/A'}</p>
                                            <p>Languages Spoken: {selectedLawyer.languages_spoken.join(', ') || 'N/A'}</p>

                                            <div>
                                                <strong>Certifications:</strong>
                                                {selectedLawyer.certifications && selectedLawyer.certifications.length > 0 ? (
                                                    <ul>
                                                        {selectedLawyer.certifications.map((cert, index) => (
                                                            <li key={index} className="mb-2">
                                                                <p>Type: {cert.certificateType}</p>
                                                                <p>Enrolment Number: {cert.enrolmentNumber}</p>
                                                                {cert.certificate && (
                                                                    <a href={cert.certificate} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                                        View Certificate
                                                                    </a>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p>N/A</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </ModalBody>

                            <ModalFooter className="flex justify-between gap-3">
                                <Button id="close-btn" color="danger" variant="flat" onPress={onClose}>Close</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default LawyerTableList