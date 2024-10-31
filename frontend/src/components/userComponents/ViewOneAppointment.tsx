import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { Appointment } from '../../utils/type/Appointment';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';
import { fetchAppointmentDataById } from '../../services/store/features/userServices';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { Clock, IndianRupee, User, X, Video } from 'lucide-react';
import { SlCalender } from "react-icons/sl";

interface ViewOneAppointmentProps {
    AppointmentId: string | undefined;
}

const ViewOneAppointment: React.FC<ViewOneAppointmentProps> = ({ AppointmentId }) => {
    const [appointment, setAppointments] = useState<Appointment>();
    const dispatch: AppDispatch = useDispatch();

    const fetchAppointment = async (appointmentId: string | undefined) => {
        try {
            const response = await dispatch(fetchAppointmentDataById(appointmentId)).unwrap();
            console.log(response, 'in the view Appointment');
            setAppointments(response.result);
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Error fetching appointments'} type="error" />);
        }
    };

    useEffect(() => {
        fetchAppointment(AppointmentId);
    }, [dispatch, AppointmentId]);

    return (
        <div className="container sm:min-h-screen p-6 md:p-8 lg:p-8 bg-gray-50">
            <h1 className="text-3xl font-bold text-center mb-5">Appointment Details</h1>

            <div className="flex flex-col md:flex-row gap-5 items-start">
                <div className="w-full md:w-2/3 mx-auto">
                    <Card className="w-full shadow-lg rounded-lg overflow-hidden">
                        <CardHeader className="bg-primary p-4">
                            <h2 className="text-xl font-semibold text-white">Appointment Overview</h2>
                        </CardHeader>
                        <CardBody className="p-6">
                            <div className=" grid gap-4">

                                <div className="flex items-center text-lg">
                                    <SlCalender className="mr-2 h-5 w-5 text-blue-500" />
                                    <strong> Date: </strong>
                                    {appointment?.appointmentDate
                                        ? new Date(appointment?.appointmentDate).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                        : 'Date not available'}
                                </div>
                                <div className="flex items-center text-lg">
                                    <Clock className="mr-2 h-5 w-5 text-blue-500" />
                                    <span><strong>Time:</strong> {appointment?.appointmentTime || 'N/A'}</span>
                                </div>
                                <div className="flex items-center text-lg">
                                    <IndianRupee className="mr-2 h-5 w-5 text-green-500" />
                                    <span><strong>Consultation Fee:</strong> ₹{appointment?.consultationFee || 'N/A'}</span>
                                </div>

                                <div className="flex items-start w-3/5 ">
                                    <div className="w-2/3">
                                        <div className="mb-2">
                                            <User className="inline-block mr-2 h-5 w-5 text-gray-600" />
                                            <span className="text-lg font-semibold">Advocate: {appointment?.lawyerId?.userName || 'N/A'}</span>
                                        </div>
                                        <div className='mb-4 ml-6'>
                                            <h5 className="text-gray-500">{appointment?.lawyerId?.designation || 'Designation not available'}</h5>
                                            <p className="text-gray-500">{appointment?.lawyerId?.city}, {appointment?.lawyerId?.state}</p>

                                        </div>
                                    </div>
                                    <div className="w-1/3 ">
                                        <img
                                            src={appointment?.lawyerId?.profile_picture || '/placeholder.png'}
                                            alt="Lawyer profile"
                                            className="rounded-lg  object-cover h-[80%]"
                                        />
                                    </div>
                                </div>

                                <div className='w-1/2'>
                                    <p className=" border-gray-300 w-full rounded font-semibold ">  Case Description:</p>
                                    <h6>         {appointment?.description || ''}</h6>
                                </div>

                                <div className=" items-center flex justify-between">
                                    <div>
                                        <span className="text-lg font-semibold">Total:</span>
                                        <span className="text-2xl font-bold text-gray-800">   ₹{appointment?.consultationFee || 'N/A'}</span>
                                    </div>
                                    <div className='flex gap-6'>
                                        <Button className='bg-red-700 text-white rounded-md'>     <X className="h-4 w-4" />Cancel Appointment</Button>
                                        <Button className='bg-green-700 cursor-not-allowed px-10 rounded-md'>  <Video className="h-4 w-4" />Make Call</Button>
                                    </div>

                                </div>

                                <div className="text-right text-sm text-gray-500">
                                    Created on: {new Date(appointment?.createdAt || '').toLocaleString()}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ViewOneAppointment;