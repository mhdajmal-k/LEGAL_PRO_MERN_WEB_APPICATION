import React from 'react';
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import CustomSkelton from '../skeltton';
import { CgProfile } from "react-icons/cg";
import { Button } from '@nextui-org/react';
import { blockandUnblock } from '../../services/store/features/adminServices';
import { toast } from 'sonner';
import CustomToast from '../userComponents/CustomToast';

interface User {
    _id: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    block: boolean;
    profilePic: string
}

interface CommonTableProps {
    columns: string[];
    data: User[];
    onRefresh: () => void
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, onRefresh }) => {
    const dispatch: AppDispatch = useDispatch();
    const { loading, } = useSelector((state: RootState) => state.admin);
    async function handleBlockorUBlock(id: string, block: boolean): Promise<void> {
        try {

            const response = await dispatch(blockandUnblock({ id, state: !block, action: "user" })).unwrap();
            // const response = await dispatch(blockandUnblock({ id, state: !block })).unwrap();
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
                            <th
                                key={index}
                                scope="col"
                                className="px-6 py-3 text-left text-sm font-semibold tracking-wider uppercase"
                            >
                                {column}
                            </th>
                        ))}
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {loading &&
                        <div className=''>
                            <CustomSkelton />
                            <CustomSkelton />
                            <CustomSkelton />
                        </div>
                    }

                    {data.map((user) => (
                        <tr
                            key={user._id}
                            className="hover:bg-gray-100 transition duration-300 ease-in-out even:bg-gray-50"
                        >
                            {/* Profile Image */}
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="h-10 w-10">
                                        {user?.profilePic ? (
                                            <img
                                                className="h-10 w-10 rounded-full border-2 border-blue-500"
                                                src={user.profilePic}
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
                                <div className="text-sm text-gray-800">{user?.phoneNumber || 'N/A'}</div>
                            </td>
                            <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${user?.block ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                        }`}
                                >
                                    {user.block ? 'Blocked' : 'Active'}
                                </span>
                            </td>
                            <Button className='mt-3' onClick={() => handleBlockorUBlock(user._id, user.block)}
                                color={user?.block ? 'danger' : "success"}
                            >
                                {user?.block ? 'UnBlock' : "Block"}
                            </Button>

                        </tr >
                    ))}
                </tbody >
            </table >
        </div >
    );
};

export default CommonTable;
