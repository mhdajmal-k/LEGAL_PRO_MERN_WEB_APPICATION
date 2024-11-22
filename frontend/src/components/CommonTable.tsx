import React from 'react';
// import { AppDispatch, } from '../services/store/store';
// import { useDispatch } from 'react-redux';
import CustomSkelton from './skeltton';
import { CgProfile } from "react-icons/cg";
import { Button } from '@nextui-org/react';



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
    onAction: (id: string, block: boolean) => Promise<void>;
    loading: boolean;
    Who: 'user' | 'lawyer';
}

const CommonTable: React.FC<CommonTableProps> = ({ columns, data, onAction, loading, }) => {


    // const dispatch: AppDispatch = useDispatch();


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
                            <Button
                                className='mt-3'
                                onClick={() => onAction(user._id, user.block)}
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
