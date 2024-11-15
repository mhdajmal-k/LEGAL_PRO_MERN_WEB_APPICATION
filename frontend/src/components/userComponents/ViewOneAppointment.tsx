import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../services/store/store';
import { Appointment } from '../../utils/type/Appointment';
import CustomToast from '../../components/userComponents/CustomToast';
import { toast } from 'sonner';
import { cancelAppointmentDataById, fetchAppointmentDataById, fetchRefundStatus } from '../../services/store/features/userServices';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import { Clock, IndianRupee, User, X, Video, CheckCircle, AlertCircle } from 'lucide-react';
import { SlCalender } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import VideoCallPage from '../../pages/userPages/UserVideoCall';
import { useSocket } from '../../contextAPI/useSocket';

interface ViewOneAppointmentProps {
    AppointmentId: string | undefined;

}

const ViewOneAppointment: React.FC<ViewOneAppointmentProps> = ({ AppointmentId }) => {
    const [appointment, setAppointments] = useState<Appointment>();
    const [refundStatus, setRefundStatus] = useState<any>();
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [showVideoCall, setShowVideoCall] = useState(false);
    const socket = useSocket();

    const handleVideoCallClick = () => {
        // socket?.emit("joinChatRoom", appointment?._id);

        socket?.emit("joinRoom", AppointmentId);
        setShowVideoCall(true)
    };
    const fetchAppointment = async (appointmentId: string | undefined) => {
        try {
            const response = await dispatch(fetchAppointmentDataById(appointmentId)).unwrap();
            setAppointments(response.result);
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Error fetching appointments'} type="error" />);
        }
    };

    useEffect(() => {
        fetchAppointment(AppointmentId);
    }, [dispatch, AppointmentId]);

    const handileCancel = (appointmentId: string | undefined) => {
        const today = new Date(appointment?.appointmentDate!);
        const todayString = today.toISOString().split("T")[0];


        const fullDateTimeString = `${todayString} ${appointment?.appointmentTime}`;
        const appointmentTime = new Date(fullDateTimeString).getTime();
        const currentTime = Date.now();
        const oneHourInMs = 60 * 60 * 1000;
        if (appointmentTime - currentTime <= oneHourInMs) {
            toast(
                <span className="text-yellow-700">
                    <strong>Reminder:</strong> Cancellations are not allowed within 1 hour of the consultation time.
                </span>,
                { duration: 3000 }
            );
            return;
        }
        toast(
            <div >
                <p>Are you sure you want  Cancel this Appointment?</p>
                <div className="flex space-x-2 mt-3 ">
                    <button
                        className=" bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        onClick={async () => {

                            const response = await dispatch(cancelAppointmentDataById(appointmentId)).unwrap();
                            if (response.status) {
                                toast(<CustomToast message={response.message || 'Error fetching appointments'} type="success" />);
                                fetchAppointment(AppointmentId);


                            } else {
                                toast(<CustomToast message={response.message || 'Error fetching appointments'} type="error" />);

                            }
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                duration: 2000,
            }
        );

    }
    async function handileRefundStatus(appointmentId: string | undefined) {

        try {

            const response = await dispatch(fetchRefundStatus(appointmentId)).unwrap();
            if (response.status) {
                console.log(response.result, "is the result")
                setRefundStatus(response.result);
                // toast(<CustomToast message={response.message || 'Error fetching appointments'} type="success" />);

            }
        } catch (error: any) {
            toast(<CustomToast message={error.message || 'Error fetching appointments'} type="error" />);
        }
    }

    return (
        <div className="container sm:min-h-screen p-6 md:p-8 lg:p-8 bg-gray-50">
            {showVideoCall ? (
                <VideoCallPage
                    appointmentId={appointment?._id}
                    // lawyerId={appointment?.lawyerId?._id}
                    userId={appointment?.userId?._id?.toString()}

                />
            ) : (

                <div> <h1 className="text-3xl font-bold text-center mb-5">Appointment Details</h1>


                    <div className="flex flex-col md:flex-row gap-5 items-start">
                        <div className="w-full md:w-2/3 mx-auto">
                            <Card className="w-full shadow-lg rounded-lg overflow-hidden">
                                <CardHeader className="bg-primary p-4">
                                    <h2 className="text-xl font-semibold text-white">Appointment Overview</h2>
                                </CardHeader>
                                <CardBody className="p-6">
                                    <div className="grid gap-2 sm:gap-4">

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
                                            <span><strong>Time:</strong> <mark>{appointment?.appointmentTime || 'N/A'}
                                            </mark></span>
                                        </div>
                                        <div className="flex items-center text-lg">
                                            <IndianRupee className="mr-2 h-5 w-5 text-green-500" />
                                            <span><strong>Consultation Fee:</strong> ₹{appointment?.subTotal || 'N/A'}
                                                <br />
                                                <span className='font-light text-xs text-center ml-5'> (Rs {appointment?.convenienceFee} convenienceFee ) </span></span>
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

                                                    <div className="w-1/3 ">
                                                        <img
                                                            src={appointment?.lawyerId?.profile_picture || '/placeholder.png'}
                                                            alt="Lawyer profile"
                                                            className="rounded-lg  object-cover h-[80%]"
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                        </div>

                                        <div className='w-1/2'>
                                            <p className=" border-gray-300 w-full rounded font-semibold ">  Case Description:</p>
                                            <h6>         {appointment?.description || ''}</h6>
                                        </div>

                                        <div className=" items-center sm:flex-row sm:flex justify-between">
                                            <div className='m-6'>
                                                <span className="text-lg font-semibold">Total:</span>
                                                <span className="text-2xl font-bold text-gray-800">   ₹{appointment?.subTotal || 'N/A'}</span>
                                            </div>


                                            {appointment?.status !== "Cancelled" ? (<div className=' flex flex-col sm:flex sm:flex-row gap-3 sm:gap-6' >
                                                <Button className='bg-red-700 text-white rounded-md' onClick={() => handileCancel(appointment?._id)}>     <X className="h-4 w-4" />Cancel Appointment
                                                </Button>
                                                <div className=' flex flex-col gap-3 sm:flex sm:flex-row sm:gap-6'>

                                                    <Button className='bg-green-700 px-10 rounded-md' onClick={handleVideoCallClick}>
                                                        <Video className="h-4 w-4" />Make Call
                                                    </Button>                                        </div>
                                            </div>) :
                                                (<div>
                                                    {refundStatus ?
                                                        (
                                                            <div className="space-y-4">



                                                                <div className="flex items-center gap-2">
                                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                                    <span className="font-semibold">RefundStatus:</span> {refundStatus.status}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                                                                    <span className="font-semibold">Processing Speed:</span> {refundStatus.speed_processed}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <IndianRupee className="h-5 w-5 text-green-500" />
                                                                    <span className="font-semibold">Refund Amount:</span> {refundStatus.amount / 100}
                                                                </div>
                                                                <Button onClick={() => setRefundStatus("")} className='mx-auto bg-blue-gray-600'>hide</Button>
                                                            </div>

                                                        ) :
                                                        <div className='space-y-4'>
                                                            <h6>Appointment :<strong className='text-red-600'> {appointment?.status}</strong></h6>
                                                            <Button onClick={() => handileRefundStatus(appointment?._id)} className='bg-blue-700 text-white'>Check Refund Status</Button>
                                                        </div>



                                                    }
                                                </div>

                                                )}




                                        </div>
                                        {/* {appointment?.status != "Cancelled" && <div className="bg-yellow-100 w-2/3 text-sm rounded-md ml-1 ">
                                <span className="text-yellow-700">
                                    <strong>Reminder:</strong> Cancellations are not allowed within 1 hour of the consultation time.
                                </span>
                            </div>} */}


                                        <div className="text-right text-sm text-gray-500">
                                            Created on: {new Date(appointment?.createdAt || '').toLocaleString()}
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </div >
                </div>)}

        </div>
    );
};

export default ViewOneAppointment;
