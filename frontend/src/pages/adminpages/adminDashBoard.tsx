import React, { useEffect, useState } from "react";
import { MdPeople, MdGavel, MdCalendarToday } from "react-icons/md";
import DashboardCard from "../../components/userComponents/StatsCard";
import { getStaticData } from "../../services/store/features/adminServices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store/store";
import CustomToast from "../../components/userComponents/CustomToast";
import { toast } from "sonner";
import CardSkelton from "../../components/CardSkeltton";
type StatsType = {
    totalUsers: number;
    totalLawyers: number;
    countDocuments: number; // Represents total appointments
};


export const AdminDashBoard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const [stats, setStats] = useState<StatsType | null>(null);
    const fetchStatics = async () => {
        try {
            const response = await dispatch(getStaticData()).unwrap()
            setStats({
                totalUsers: response.result.totalUsers,
                totalLawyers: response.result.totalLawyers,
                countDocuments: response.result.countDocuments,
            });


        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);

        }
    }
    useEffect(() => {
        fetchStatics()
    }, [])
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <div className="flex flex-wrap gap-4">

                {stats ? (
                    <div className="flex justify-between gap-3">
                        <DashboardCard
                            title="Total Users"
                            value={stats.totalUsers}
                            description="Number of registered users"
                            icon={<MdPeople />}
                        />
                        <DashboardCard
                            title="Total Lawyers"
                            value={stats.totalLawyers}
                            description="Number of registered lawyers"
                            icon={<MdGavel />}
                        />
                        <DashboardCard
                            title="Total Appointments"
                            value={stats.countDocuments}
                            description="Total appointments booked and completed"
                            icon={<MdCalendarToday />}
                        />
                    </div>
                ) : (
                    Array.from({ length: 3 }).map((_, index) => <CardSkelton key={index} />)
                )}

            </div>
        </div>
    );
}