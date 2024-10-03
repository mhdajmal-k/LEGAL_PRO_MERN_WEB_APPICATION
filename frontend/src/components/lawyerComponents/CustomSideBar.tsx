import { Link } from "react-router-dom";

export const SidebarItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
    <Link to={`/admin/${label.toLowerCase()}`} className="flex items-center p-4 text-gray-700 hover:bg-gray-100">
        <span className="mr-4 text-xl">{icon}</span>
        <span>{label}</span>
    </Link>
);
