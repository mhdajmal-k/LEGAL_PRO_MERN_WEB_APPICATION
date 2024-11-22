import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { blockandUnblock, getUsers } from '../../services/store/features/adminServices';
import CommonTable from '../../components/CommonTable';
import { userColumns } from '../../utils/constants/Colums';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';
import CommonPagination from '../../components/Pagination';
import { userLogout } from '../../services/store/features/userSlice';

const UsersList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [TotalUsers, setTotalUsers] = useState<number>(1);
    const [usersPerPage] = useState<number>(5);
    const [users, setUsers] = useState<any[]>([]);
    // const { userInfo } = useSelector((state: RootState) => state.user)

    const fetchUsers = async (page: number) => {
        try {
            const response = await dispatch(getUsers({ page, limit: usersPerPage })).unwrap();
            setUsers(response.result.users);
            setTotalPages(response.result.totalPages);
            setTotalUsers(response.result.totalUsers)
        } catch (error: any) {
            console.error(error);
            toast(<CustomToast message={error.toString() || error.message} type="error" />);

        }
    }

    useEffect(() => {
        fetchUsers(currentPage);
    }, [dispatch, currentPage, usersPerPage]);

    // const refreshUsers = () => {
    //     fetchUsers(currentPage);
    // };

    const { loading, } = useSelector((state: RootState) => state.admin);


    const handleBlockOrUnblock = async (id: string, isCurrentlyBlocked: boolean): Promise<void> => {
        const action = isCurrentlyBlocked ? 'Unblock' : 'Block';

        toast(
            <div>
                <p>Are you sure you want to {action.toLowerCase()} this user?</p>
                <div className="flex space-x-2 mt-3">
                    <button
                        className={`${isCurrentlyBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white px-3 py-1 rounded-md`}
                        onClick={async () => {

                            try {

                                const response = await dispatch(blockandUnblock({ id, state: !isCurrentlyBlocked, action: "user" })).unwrap();

                                if (response.status) {

                                    if (response.message == "user blocked successFully") {

                                        dispatch(userLogout());
                                    }

                                    toast(<CustomToast message={response.message} type="success" />);

                                    fetchUsers(currentPage);
                                }


                            } catch (error: any) {
                                console.error("Verification failed:", error);
                                toast(<CustomToast message={error || error.message} type="error" />)
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
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className='w-auto mt-16 bg-white'>
            <h1 className='text-center mb-5 font-semibold'>User List</h1>
            <div className='text-end m-8 pr-6'>
                <h5 className='text-end  inline-block bg-gray-300 p-1 rounded-lg'>TotalUsers:</h5>
                <span className='text-xl font-semibold '> {TotalUsers}</span>
            </div>

            <CommonTable columns={userColumns} data={users} onAction={handleBlockOrUnblock} loading={loading} Who='user' />

            {users.length > 0 && (
                <div className='text-center mx-auto flex justify-center mt-7'>
                    <CommonPagination
                        totalPage={totalPages}
                        initialPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default UsersList;