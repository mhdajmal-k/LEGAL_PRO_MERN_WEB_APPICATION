import React from 'react';
import { RootState } from '../../services/store/store';
import { useSelector } from 'react-redux';
import CustomSkelton from '../skeltton';
import { CgProfile } from "react-icons/cg";
import { Button } from '@nextui-org/react';

interface Lawyer {
    _id: string;
    userName: string;
    email: string;
    phoneNumber?: string;
    block: boolean;
    profile_picture: string
    designation: string,
    years_of_experience: string,
    verified: string
}

interface CommonTableProps {
    columns: string[];
    data: Lawyer[];
}

const LawyerTable: React.FC<CommonTableProps> = ({ columns, data }) => {
    const handleBlock = (id: string) => {
        alert(id)
    }
    const { loading, } = useSelector((state: RootState) => state.admin);
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
                                        {user?.profile_picture ? (
                                            <img
                                                className="h-10 w-10 rounded-full border-2 border-blue-500"
                                                src={"https://leagalpro.s3.eu-north-1.amazonaws.com/lawyer-barCouncilIndia/1727805216269-download.jpeg"}
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
                            <td className="px-6 py-4">
                                <Button className='' onClick={() => handleBlock(user._id)}
                                    color='primary'
                                >
                                    VERIFY
                                </Button>

                            </td>
                            <td>
                                <Button className='' onClick={() => handleBlock(user._id)}
                                    color='primary'
                                >
                                    view
                                </Button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LawyerTable;
