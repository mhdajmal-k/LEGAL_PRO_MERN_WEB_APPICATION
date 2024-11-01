import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { Appointment } from '../../utils/type/Appointment';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Clock, IndianRupee, User, } from 'lucide-react';
import { SlCalender } from "react-icons/sl";
import { useParams } from 'react-router-dom';
import { adminFetchAppointmentDataById } from '../../services/store/features/adminServices';


const ViewAppointmentDetails: React.FC = () => {
    const { appointmentId } = useParams()
    const [appointment, setAppointments] = useState<Appointment>();
    const dispatch: AppDispatch = useDispatch();

    const fetchAppointment = async (appointmentId: string | undefined) => {
        try {
            const response = await dispatch(adminFetchAppointmentDataById(appointmentId)).unwrap();
            console.log(response, 'in the view Appointment');
            setAppointments(response.result);
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Error fetching appointments'} type="error" />);
        }
    };
    useEffect(() => {
        fetchAppointment(appointmentId);
    }, [dispatch, appointmentId]);

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
                                <div className="flex items-center text-lg">
                                    <IndianRupee className="mr-2 h-5 w-5 text-green-500" />
                                    <span><strong>convince Fee:</strong> ₹{appointment?.convenienceFee || 'N/A'}</span>
                                </div>
                                <div className=" items-center flex justify-between">
                                    <div>
                                        <span className="text-lg font-semibold">Total:</span>
                                        <span className="text-2xl font-bold text-gray-800">   ₹{appointment?.subTotal || 'N/A'}</span>
                                        <p className='my-3 text-lg font-semibold'>Payment:    <span className="text-xl font-bold text-gray-800"> {appointment?.paymentStatus}</span> </p>
                                    </div>


                                </div>

                                <div className="flex justify-between w-full">
                                    <div className="w-1/2  mx-4 px-3">
                                        <div className="mb-2">
                                            <User className="inline-block mr-2 h-5 w-5 text-gray-600" />
                                            <h4>User:</h4>
                                            <p className="text-lg font-semibold"> {appointment?.userId?.userName || 'N/A'}</p>
                                            <p className="text-lg font-semibold"> {appointment?.userId?.email || 'N/A'}</p>
                                        </div>
                                        {appointment?.userId?.profilePicture &&
                                            <div className="w-1/3 ">
                                                <img
                                                    src={appointment?.userId?.profilePicture || '/placeholder.png'}
                                                    alt="image"
                                                    className="rounded-lg  object-cover h-[80%]"
                                                />
                                            </div>}

                                    </div>
                                    <div className="w-1/2">
                                        <div className="mb-2">
                                            <User className="inline-block mr-2 h-5 w-5 text-gray-600" />
                                            <h4>Lawyer</h4>
                                            <span className="text-lg font-semibold">{appointment?.lawyerId?.userName || 'N/A'}</span>
                                            <p className="text-gray-600">Email: <span className="font-normal">{appointment?.lawyerId.email}</span></p>
                                            <p className="text-gray-600">City: <span className="font-normal">{appointment?.lawyerId?.city || 'N/A'}</span></p>
                                            <p className="text-gray-600">State: <span className="font-normal">{appointment?.lawyerId?.state || 'N/A'}</span></p>
                                            <p className="text-gray-600">Years of Experience: <span className=" font-semibold text-black">{appointment?.lawyerId?.years_of_experience}</span></p>
                                            <p className="text-gray-600">Designation: <span className="font-semibold text-black">{appointment?.lawyerId?.designation}</span></p>

                                        </div>
                                        {appointment?.lawyerId?.profile_picture &&
                                            <div className="w-1/3 ">
                                                <img
                                                    src={appointment?.lawyerId?.profile_picture || '/placeholder.png'}
                                                    alt="image"
                                                    className="rounded-lg  object-cover h-[80%]"
                                                />
                                            </div>}

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

export default ViewAppointmentDetails;
