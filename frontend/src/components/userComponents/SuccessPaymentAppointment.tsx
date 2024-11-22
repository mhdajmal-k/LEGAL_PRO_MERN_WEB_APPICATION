import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Appointment } from '../../utils/type/Appointment';
import { fetchAppointmentDataById } from '../../services/store/features/userServices';
import { AppDispatch } from '../../services/store/store';
import CustomToast from './CustomToast';
import { Calendar, Clock, IndianRupee, CheckCircle, MapPin } from 'lucide-react';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';

interface SuccessPaymentAppointmentProps {
    AppointmentId: string | undefined;
}

const SuccessPaymentAppointment: React.FC<SuccessPaymentAppointmentProps> = ({ AppointmentId }) => {
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAppointmentData = async (appointmentId: string | undefined) => {
        if (appointmentId) {
            try {
                const response = await dispatch(fetchAppointmentDataById(appointmentId)).unwrap();
                setAppointment(response.result);
            } catch (error: any) {
                toast(<CustomToast message={error?.message || 'Error fetching data'} type="error" />);
                console.error('Error fetching lawyer data:', error);
            }
        }
    };

    useEffect(() => {
        fetchAppointmentData(AppointmentId);
    }, [dispatch, AppointmentId]);

    return (
        <div className="sm:min-h-screen bg-gradient-to-b  from-primary/10 to-background">
            <div className="container mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center my-12"
                >
                    <CheckCircle className="w-20 h-20 text-primary mx-auto mb-4" />
                    <h1 className="text-4xl font-bold text-primary">Appointment Successful</h1>
                    <p className="text-xl text-muted-foreground mt-2">Your appointment has been confirmed and booked successfully.</p>
                </motion.div>

                <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-lg">
                    <CardHeader className="bg-primary text-primary-foreground p-6">
                        <h1 className="text-2xl">Appointment Details</h1>
                    </CardHeader>
                    <CardBody className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Calendar className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Appointment Date</p>
                                    <p className="font-semibold">
                                        {appointment?.appointmentDate
                                            ? new Date(appointment.appointmentDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })
                                            : 'Date not available'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Clock className="w-6 h-6 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Appointment Time</p>
                                    <p className="font-semibold">{appointment?.appointmentTime || 'Time not available'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 bg-secondary/20 p-4 rounded-lg">

                            <img src={appointment?.lawyerId.profile_picture} alt={appointment?.lawyerId.userName} className='w-28 sm:w-52 rounded-full object-contain' />
                            {/* <AvatarFallb>{appointment?.lawyerId.userName?.charAt(0)}</AvatarFallb> */}

                            <div>
                                <h3 className="font-semibold text-lg">Advocate: {appointment?.lawyerId.userName}</h3>
                                <p className="text-muted-foreground">{appointment?.lawyerId.designation}</p>
                                <p className="text-sm text-muted-foreground flex items-center mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {appointment?.lawyerId.city}, {appointment?.lawyerId.state}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-primary/5 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">Consultation Fee</p>
                                <p className="text-lg font-semibold flex items-center">
                                    <IndianRupee className="w-4 h-4 mr-1" />
                                    {appointment?.consultationFee}
                                </p>
                            </div>
                            <div className="bg-primary/5 p-4 rounded-lg">
                                <p className="text-sm text-muted-foreground">Convenience Fee</p>
                                <p className="text-lg font-semibold flex items-center">
                                    <IndianRupee className="w-4 h-4 mr-1" />
                                    {appointment?.convenienceFee}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center">
                                <span className="text-lg">Subtotal</span>
                                <span className="text-2xl font-bold flex items-center">
                                    <IndianRupee className="w-5 h-5 mr-1" />
                                    {appointment?.subTotal}
                                </span>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            <div className="text-right text-sm text-gray-500">
                                Created on: {new Date(appointment?.createdAt || '').toLocaleString()}
                            </div>
                            <p>Payment Status: <span className="font-semibold text-primary">{appointment?.paymentStatus || 'Status not available'}</span></p>
                        </div>
                    </CardBody>
                    <CardFooter className="bg-secondary/10 p-6">

                        <button className="w-full" onClick={() => navigate("/profile")}>
                            View Appointment
                        </button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SuccessPaymentAppointment;