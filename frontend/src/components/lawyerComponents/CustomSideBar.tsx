import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SidebarItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => {
    const location = useLocation()
    const isActive = location.pathname === `/admin/${label.toLocaleLowerCase()}`
    return (
        <Link
            to={`/admin/${label.toLowerCase()}`}
            className={`flex items-center p-4 text-gray-700 hover:bg-gray-100 ${isActive ? "bg-gray-200 font-bold" : ""
                }`}
        >
            <span className="mr-4 text-xl">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}
