
import { Lawyer } from "../../utils/type/lawyerType";
import CustomSkelton from "../skeltton";
import { CgProfile } from "react-icons/cg";
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { blockandUnblock, getLawyer } from "../../services/store/features/adminServices";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, } from '@nextui-org/react';
import CustomToast from "../userComponents/CustomToast";
import { toast } from 'sonner';
import { logout } from "../../services/store/features/lawyerSlilce";
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


    async function handleBlockorUBlock(id: string, isCurrentlyBlocked: boolean): Promise<void> {
        const action = isCurrentlyBlocked ? 'Unblock' : 'Block';
        toast(
            <div >
                <p>Are you sure you want to {action.toLowerCase()} this lawyer?</p>
                <div className="flex space-x-2 mt-3 ">
                    <button
                        className={`${isCurrentlyBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600 '}text-white px-3 py-1 rounded-md`}
                        onClick={async () => {
                            try {
                                const response = await dispatch(blockandUnblock({ id, state: !isCurrentlyBlocked, action: "lawyer" })).unwrap();
                                if (response.status) {

                                    if (response.message == "user blocked successFully") {

                                        dispatch(logout());
                                    }
                                    toast(<CustomToast message={response.message} type="success" />);
                                    onRefresh();  // Refresh the data
                                }
                            } catch (error: any) {
                                console.error("Block/Unblock action failed:", error);
                                toast(<CustomToast message={error?.message || 'Action failed'} type="error" />);
                            }
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                duration: 2000,
            }
        );
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

            <Modal isOpen={isViewModalOpen} onOpenChange={setViewModalOpen} placement="top-center" className="container">
                <ModalContent className="max-w-xl p-6 bg-white shadow-lg rounded-lg">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-center text-xl font-semibold text-gray-800 mb-4">
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
                                            <p className="text-gray-600">Years of Experience: <span className="font-normal">{selectedLawyer.years_of_experience}</span></p>
                                            <p className="text-gray-600">Designation: <span className="font-normal">{selectedLawyer.designation}</span></p>
                                            <p className="text-gray-600">Verified: <span className="font-normal">{selectedLawyer.verified ? 'Yes' : 'No'}</span></p>
                                            <p className="text-gray-600">Practice Areas: <span className="font-normal">{selectedLawyer.practice_area.join(', ') || 'N/A'}</span></p>
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

                            <ModalFooter className="flex justify-center mt-6">
                                <Button
                                    id="close-btn"
                                    color="danger"
                                    variant="flat"
                                    onPress={onClose}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default LawyerTableList