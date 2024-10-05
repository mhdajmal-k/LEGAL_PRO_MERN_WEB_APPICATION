import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { getUsers } from '../../services/store/features/adminServices';
import CommonTable from '../../components/AdminComponents.tsx/UserTable';
import { userColumns } from '../../utils/constants/Colums';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';

const UsersList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const [users, setUsers] = useState<[] | any>([]);



    const fetchUsers = async () => {
        try {
            const response = await dispatch(getUsers()).unwrap();
            setUsers(response.result);

        } catch (error: any) {
            console.log(error)
            toast(<CustomToast message={error} type="error" />);
        }


    }

    const refreshUsers = () => {
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch]);
    console.log(users)
    return (
        <div className='w-auto mt-16 bg-white'>
            <h1 className='text-center mb-5 font-semibold'>User List</h1>

            <CommonTable columns={userColumns} data={users} onRefresh={refreshUsers} />
        </div>
    );
};

export default UsersList;