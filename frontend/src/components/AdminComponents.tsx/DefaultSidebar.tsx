import React from 'react';
import { SidebarItem } from '../lawyerComponents/CustomSideBar';
import { MdDashboard, MdPeople, MdGavel, MdCalendarToday, MdArticle, MdPendingActions, MdExitToApp } from "react-icons/md";

export const DefaultSidebar: React.FC = () => {
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
                <SidebarItem icon={<MdPendingActions size={24} color='black' />} label="Pending Approval" />
            </nav>
            <div className="p-4">
                <SidebarItem icon={<MdExitToApp size={24} color='red' />} label="Logout" />
            </div>
        </div>
    );
};

export default DefaultSidebar;