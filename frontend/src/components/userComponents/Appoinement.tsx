import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import CustomToast from './CustomToast';
import CommonPagination from '../Pagination';
import { toast } from 'sonner';
import { AppDispatch } from '../../services/store/store';
import { useDispatch } from 'react-redux';
import { Appointment } from '../../utils/type/Appointment';
import { fetchAllAppointment } from '../../services/store/features/userServices';
import { AppointmentColumns } from '../../utils/constants/Colums';
import { useNavigate } from 'react-router-dom';

interface AppointmentListProps {
    userType: 'lawyer' | 'user'; // Use props to define user type and render appropriate columns
}

const AppointmentList: React.FC<AppointmentListProps> = ({ userType }) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [appointmentsPerPage] = useState<number>(4);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [status, setStatus] = useState<string>("Confirmed");
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAppointments = async (page: number) => {
        try {
            const response = await dispatch(fetchAllAppointment({ page, limit: appointmentsPerPage, status })).unwrap();
            setAppointments(response.result.appointment);
            setTotalPages(response.result.totalPages);
        } catch (error: any) {
            toast(<CustomToast message={error.message || "Error fetching appointments"} type="error" />);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        fetchAppointments(currentPage);
    }, [dispatch, currentPage, appointmentsPerPage, status]);

    const columns = AppointmentColumns[userType];

    return (
        <div>
            <h2 className="text-center font-semibold text-lg my-4">Appointments</h2>
            <div className="flex justify-center gap-1 my-4">
                <Button
                    size='sm'
                    className={`px-5 rounded-md font-semibold ${status === 'Confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    onClick={() => {
                        setStatus('Confirmed');
                        setCurrentPage(1);
                    }}
                >
                    Upcoming
                </Button>
                <Button
                    size='sm'
                    className={`px-5 rounded-md font-semibold ${status === 'Completed' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    onClick={() => {
                        setStatus('Completed');
                        setCurrentPage(1);
                    }}
                >
                    Completed
                </Button>
                <Button
                    size='sm'
                    className={`px-5 rounded-md font-semibold ${status === 'Cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                    onClick={() => {
                        setStatus('Cancelled');
                        setCurrentPage(1);
                    }}
                >
                    Canceled
                </Button>
            </div>

            {appointments.length === 0 ? (
                <p className="text-center text-gray-600">No Appointments Found.</p>
            ) : (
                // Wrapper to enable horizontal scrolling on smaller screens
                <div className="overflow-x-auto">
                    <table className="sm:min-w-full border border-gray-200 rounded-md shadow-md bg-white">
                        <thead className="bg-gray-400">
                            <tr className="text-center text-gray-700">
                                {columns.map((value: any, index) => (
                                    <th key={index} className="px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase">
                                        {value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {appointments.map((appointment: Appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-100 transition duration-300 ease-in-out even:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {appointment?.appointmentDate
                                            ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'Date not available'}
                                    </td>
                                    <td className="px-6 py-4">{appointment?.appointmentTime}</td>
                                    <td className="px-6 py-4">{appointment.lawyerId.userName}</td>
                                    <td className="px-6 py-4">{appointment.consultationFee}</td>
                                    <td className="px-6 py-4">{appointment.paymentStatus}</td>
                                    <td className="px-6 py-4">
                                        <Button className="bg-blue-500 text-white" onClick={() => navigate(`/viewAppointment/${appointment._id}`)}>View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {appointments.length > 0 && (
                <div className="text-center mx-auto flex justify-center mt-7">
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

export default AppointmentList;
