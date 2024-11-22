import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
// import CustomToast from './CustomToast';
import CommonPagination from '../Pagination';
import { toast } from 'sonner';
import { AppDispatch } from '../../services/store/store';
import { useDispatch } from 'react-redux';
import { Appointment } from '../../utils/type/Appointment';
import { AppointmentColumns } from '../../utils/constants/Colums';
import { useNavigate } from 'react-router-dom';
import CustomToast from '../userComponents/CustomToast';
import { fetchAllAppointmentAdminSide } from '../../services/store/features/adminServices';

const AppointmentListAdminSide: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [appointmentsPerPage] = useState<number>(8);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [status, setStatus] = useState<string>("Pending");
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const fetchAppointments = async (page: number) => {
        try {
            const response = await dispatch(fetchAllAppointmentAdminSide({ page, limit: appointmentsPerPage, status })).unwrap();

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
    const columns = AppointmentColumns["admin"];

    return (
        <div className=' mx-auto sm:max-w-6xl  rounded-lg'>


            <div className='mx-auto sm:max-w-6xl  rounded-lg'>
                <h2 className="text-center font-semibold text-lg my-4 "> Appointments</h2>
                <div className="flex justify-center   gap-1 my-4">
                    <Button size='sm'
                        className={` px-5 rounded-md font-semibold   ${status === 'Pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                        onClick={() => {
                            setStatus('Confirmed');
                            setCurrentPage(1);
                        }}
                    >
                        Upcoming
                    </Button>
                    <Button size='sm'
                        className={`px-5 rounded-md font-semibold ${status === 'Success' ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                        onClick={() => {
                            setStatus('Completed');
                            setCurrentPage(1);
                        }}
                    >
                        Completed
                    </Button>
                    <Button size='sm'
                        className={`px-5 rounded-md font-semibold  ${status === 'Cancelled' ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
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
                    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-400 border-gray-300 text-white text-center">
                            <tr className="text-center text-gray-700">
                                {columns.map((value: any, index) => (
                                    <th key={index} className="px-6 py-3 text-center text-sm font-semibold uppercase">
                                        {value}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y text-center divide-gray-100">
                            {appointments.map((appointment: Appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-100 transition duration-300 ease-in-out even:bg-gray-50">
                                    <td className="px-6 py-4">{appointment?.appointmentDate
                                        ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })
                                        : 'Date not available'}
                                    </td>
                                    <td className="px-6 py-4">{appointment?.appointmentTime}</td>
                                    <td className="px-6 py-4">{appointment.userId?.userName}</td>
                                    <td className="px-6 py-4">{appointment.lawyerId.userName}</td>
                                    <td className="px-6 py-4">{appointment.consultationFee}</td>
                                    <td className="px-6 py-4">{appointment.convenienceFee}</td>
                                    <td className="px-6 py-4">{appointment.paymentStatus}</td>
                                    <td className="px-6 py-4">
                                        <Button className="bg-blue-500 text-white" onClick={() => navigate(`/admin/view/${appointment._id}`)}>View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}


                {appointments.length > 0 && totalPages > 1 && (
                    <div className="text-center mx-auto flex justify-center mt-7">
                        <CommonPagination
                            totalPage={totalPages}
                            initialPage={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentListAdminSide;
