import { Card, CardBody, CardHeader, Button, CardFooter } from "@nextui-org/react";
import { CircleFadingPlus, Clock, IndianRupee, User } from "lucide-react";
import { useDispatch, } from "react-redux";
import { AppDispatch, } from "../../services/store/store";
import { useEffect, useState } from "react";
import { Appointment } from "../../utils/type/Appointment";
import CustomToast from "./CustomToast";
import { toast } from "sonner";
import { createPayment, fetchAppointmentDataById, filedPayment, verifyPayment } from "../../services/store/features/userServices";
import { useNavigate } from "react-router-dom";


interface AppointmentReviewProps {
    appointmentId: string | undefined
}


export const AppointmentDetails: React.FC<AppointmentReviewProps> = ({ appointmentId }) => {

    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [showDetails, setShowDetails] = useState<boolean>(false)
    const [isAccepted, setIsAccepted] = useState<boolean>(false)
    const handileShowClick = () => {
        setShowDetails(prevShowDetails => !prevShowDetails);
    }
    const handleAccept = (e: React.ChangeEvent<HTMLInputElement>) => {

        setIsAccepted(e.target.checked)
    }
    const [appointment, setAppointment] = useState<Appointment | null>(null);
    // const { loading } = useSelector((state: RootState) => state.user)
    const fetchAppointmentData = async (appointmentId: string | undefined) => {

        if (appointmentId) {
            try {
                const response = await dispatch(fetchAppointmentDataById(appointmentId)).unwrap();
                setAppointment(response.result);

            } catch (error: any) {

                toast(<CustomToast message={error || error.message} type="error" />);

                console.error('Error fetching lawyer data:', error);
            }
        }
    };
    useEffect(() => {
        fetchAppointmentData(appointmentId);
    }, [dispatch]);

    const handilePayment = async (appointmentId: string | undefined) => {
        try {
            let response = await dispatch(createPayment(appointmentId)).unwrap()
            if (response.status) {
                const options = {
                    key: response.result.key,
                    amount: response.result.amount,
                    currency: response.result.currency,
                    order_id: response.result.orderId,
                    name: 'Legal Service Payment',
                    description: 'Appointment Payment',
                    handler: async function (response: any) {
                        // Send the payment verification to the server
                        const verifyData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            appointmentId: appointmentId

                        };

                        response = await dispatch(verifyPayment(verifyData)).unwrap()
                        console.log(response, "is the iam looking the result")
                        if (response.status) {
                            const AppointmentId = response.result._id as string

                            navigate(`/paymentSuccess/${AppointmentId}`)
                        }

                    },
                    // prefill: {
                    //     name: 'Customer Name',
                    //     email: 'customer@example.com',
                    //     contact: '9999999999'
                    // },
                    theme: {
                        color: '#003F62'
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on('payment.failed', async function (response: any) {
                    // Handle payment failure
                    // toast(<CustomToast message={response.error.description} type="error" />);
                    console.log(response, "is the payment failed response");

                    response = await dispatch(filedPayment(appointmentId as string)).unwrap();
                    if (response.status) {
                        // const AppointmentId = response.result._id as string;
                        // navigate(`/paymentSuccess/${AppointmentId}`);
                        toast(<CustomToast message={response.error.description} type="error" />);
                    }
                });
                rzp1.open();

            }
        } catch (error: any) {
            console.log(error, "is the error")


            toast(<CustomToast message={error || error.message} type="error" />);
            if (error == "Consultation fee has increased. Please confirm the new fee.") {

                fetchAppointmentData(appointmentId)
            }



            console.error('Error fetching lawyers:', error);
        }

    }

    return (

        <div className="container mx-auto my-6 sm:min-h-screen max-w-sm p-4 md:p-6 lg:p-8 sm:max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Appointment Details</h1>
            <div className="flex flex-col md:flex-row gap-4">

                <Card className="w-full md:w-1/2 h-full">
                    <CardHeader>
                        <h1>Review Appointment</h1>
                    </CardHeader>
                    <CardBody className="grid gap-4">
                        <span>
                            Appointment Date:
                            {appointment?.appointmentDate
                                ? new Date(appointment?.appointmentDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                                : 'Date not available'}
                        </span>
                        <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>Appointment Time: {appointment?.appointmentTime}</span>
                        </div>
                        <div className="flex items-center">
                            <IndianRupee className="mr-2 h-4 w-4" />
                            <span>Consultation Fee: {appointment?.consultationFee}</span>
                        </div>
                        <div className="flex ">
                            <div className="grid ">
                                <User className="mr-2 h-4 w-4" />
                            </div>
                            <div className="grid">
                                <span>Advocate: {appointment?.lawyerId.userName}</span>
                                <h5>{appointment?.lawyerId.designation}</h5>
                                <h6>{appointment?.lawyerId.city},{appointment?.lawyerId.state}</h6>
                            </div>
                        </div>
                        <div className="flex gap-3 my-4" onClick={handileShowClick}>
                            <CircleFadingPlus className=" cursor-pointer" />
                            <h5 className="text-blue-700 underline cursor-pointer">See the Details</h5>
                        </div>
                        {showDetails && <div className="">
                            <textarea
                                name="Description"
                                placeholder="Description of Your Legal Concern"
                                readOnly
                                value={appointment?.description}
                                className=" p-2 h-40 border  w-full  rounded bg-gray-300"
                            />
                        </div>}

                        <div className="flex justify-between mt-4">
                            <span>Total</span>
                            <span className="font-bold">{appointment?.consultationFee}</span>
                        </div>
                        <div>
                            <span>{appointment?.createdAt}</span>
                        </div>
                    </CardBody>
                </Card>
                <Card className="w-full md:w-1/2 h-full">
                    <CardHeader>
                        <h3>Payment Method</h3>
                    </CardHeader>
                    <CardBody className="grid">
                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IndianRupee className="h-4 w-4" />
                                    <span>Consultation Fee</span>
                                </div>
                                <span>{appointment?.consultationFee}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <IndianRupee className="h-4 w-4" />
                                    <div>


                                    </div>
                                    <span>Convenience Fee </span>

                                </div>
                                <span className="text-xs">(3% convenience fee applies)</span>
                                <span>{appointment?.convenienceFee}</span>
                            </div>
                            <hr />
                            <div className="flex justify-between">
                                <span className="font-bold">Sub Total</span>
                                <span className="font-bold">{appointment?.subTotal}</span>
                            </div>

                            <div className="bg-yellow-100 p-4 text-sm rounded-md">
                                <p className="text-yellow-700">
                                    <strong>Reminder:</strong> Cancellations are not allowed within 1 hour of the consultation time.
                                </p>
                            </div>
                            <div className="bg-red-100 p-4 text-sm rounded-md mt-2">
                                <p className="text-red-700">
                                    <strong>Note:</strong> The convenience fee is non-refundable.
                                </p>
                            </div>
                            <div className="my-4">
                                <input type="checkbox" id="terms" onChange={handleAccept} />
                                <label htmlFor="terms" className="ml-2">I accept the terms and conditions</label>
                            </div>
                            {/* <div>
                                <h6
                                    className=" text-center">
                                    Select Payment Option
                                </h6>
                                <input type="checkbox" className="m-4" />
                                <label className="m-5">RazorPay</label>

                            </div> */}
                        </div>
                    </CardBody>
                    <CardFooter>
                        <Button
                            className={`w-full ${isAccepted ? 'bg-primary text-white' : 'bg-gray-400 cursor-not-allowed'}`}
                            disabled={!isAccepted} onClick={() => handilePayment(appointmentId)}
                        >
                            Confirm Payment
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
