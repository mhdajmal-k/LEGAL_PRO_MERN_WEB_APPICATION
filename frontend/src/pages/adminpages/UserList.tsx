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
    const { userInfo } = useSelector((state: RootState) => state.user)

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

    const refreshUsers = () => {
        fetchUsers(currentPage);
    };

    const { loading, } = useSelector((state: RootState) => state.admin);
    const handleBlockorUBlock = async (id: string, block: boolean): Promise<void> => {
        try {

            const response = await dispatch(blockandUnblock({ id, state: !block, action: "user" })).unwrap();
            // const response = await dispatch(blockandUnblock({ id, state: !block })).unwrap();
            if (response.status) {
                console.log(response.message, "is am looking ")
                if (response.message == "user blocked successFully") {
                    alert("working")
                    dispatch(userLogout());
                }
                alert("hihdfdfd")
                toast(<CustomToast message={response.message} type="success" />);

                fetchUsers(currentPage);
            }
            // setViewModalOpen(false);

        } catch (error: any) {
            console.error("Verification failed:", error);
            toast(<CustomToast message={error || error.message} type="error" />)
        }


    }

    const handlePageChange = (page: number) => {

        // alert(page)
        setCurrentPage(page);
    };

    return (
        <div className='w-auto mt-16 bg-white'>
            <h1 className='text-center mb-5 font-semibold'>User List</h1>
            <div className='text-end m-8 pr-6'>
                <h5 className='text-end  inline-block bg-gray-300 p-1 rounded-lg'>TotalUsers:</h5>
                <span className='text-xl font-semibold '> {TotalUsers}</span>
            </div>

            <CommonTable columns={userColumns} data={users} onAction={handleBlockorUBlock} loading={loading} Who='user' />

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