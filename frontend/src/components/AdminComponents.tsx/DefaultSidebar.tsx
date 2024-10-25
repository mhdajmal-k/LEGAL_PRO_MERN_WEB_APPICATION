import React from 'react';
import { SidebarItem } from '../lawyerComponents/CustomSideBar';
import { MdDashboard, MdPeople, MdGavel, MdCalendarToday, MdArticle, MdPendingActions, MdExitToApp } from "react-icons/md";
import { Button } from '@nextui-org/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { adminLogout, } from '../../services/store/features/adminSlice';
import { adminLogOut } from '../../services/store/features/adminServices';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';


export const DefaultSidebar: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            dispatch(adminLogout())
            const response = await dispatch(adminLogOut()).unwrap();
            if (response.status) {
                toast(<CustomToast message={response.message} type="success" />);
                navigate("/admin/login")


            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }
    }
    return (
        <div className="flex flex-col h-screen w-64 bg-white shadow-lg">
            <div className="p-4 bg-primary text-white">
                <h5 className="text-xl font-bold">LEGAL_PRO</h5>
                <p className="text-sm">Admin</p>
            </div>
            <nav className="flex-grow">
                <SidebarItem icon={<MdDashboard size={24} color='black' />} label="Dashboard" />
                <SidebarItem icon={<MdPeople size={24} color='black' />} label="users" />
                <SidebarItem icon={<MdGavel size={24} color='black' />} label="Lawyers" />
                <SidebarItem icon={<MdCalendarToday size={24} color='black' />} label="Appointments" />
                <SidebarItem icon={<MdArticle size={24} color='black' />} label="Blog" />
                <SidebarItem icon={<MdPendingActions size={24} color='black' />} label="PendingApproval" />
            </nav>
            <div className="p-4">
                <Button className="w-full mx-auto mt-11   text-black" color="danger" onClick={handleLogout}>
                    <MdExitToApp className="mr-2 text-base" /> Log Out
                </Button>

            </div>
        </div>
    );
};

export default DefaultSidebar;