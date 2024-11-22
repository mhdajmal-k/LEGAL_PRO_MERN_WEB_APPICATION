import { Button, Spinner } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { SlCalender } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { toast } from 'sonner';
import CustomToast from './CustomToast';
import { createAppointment, getLawyerSlot } from '../../services/store/features/userServices';
import { useNavigate, useParams } from 'react-router-dom';
import { FetchedSlotData, Lawyer } from '../../utils/type/lawyerType';
import { IoMdClose } from 'react-icons/io';
import moment from 'moment';



interface LawyerSlotProps {
    lawyerId: string | undefined;
    lawyer: Lawyer | null;
}

const LawyerSlot: React.FC<LawyerSlotProps> = ({ lawyerId, lawyer }) => {
    const { userInfo, loading } = useSelector((state: RootState) => state.user)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedSpecificSlot, setSelectedSpecificSlot] = useState<string | undefined>();
    const [description, setDescription] = useState<string>("");
    const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();
    const [fetchedSlots, setFetchedSlots] = useState<FetchedSlotData | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    // const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [availableSlots, setAvailableSlots] = useState<Array<{ timeSlot: string; status: boolean; fee: number }>>([]);

    const [fee, setFee] = useState<number | null>(null);
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    const handleDate = (dateForBooking: Date) => {
        setSelectedDate(dateForBooking);
        setSelectedTime(null);
        setSelectedSpecificSlot("")
        setSelectedSlotId("")

        const slotsForSelectedDate = fetchedSlots?.slots.find(
            (slot) => new Date(slot.date).toDateString() === dateForBooking.toDateString()
        );
        setSelectedSlotId(slotsForSelectedDate?._id)
        setAvailableSlots(slotsForSelectedDate?.availability || []);
    };

    const fetchLawyerSlot = async () => {
        try {
            const response = await dispatch(getLawyerSlot(lawyerId ?? id)).unwrap();

            setFetchedSlots(response.result);

        } catch (error: any) {
            console.log(error, "is the error in slot compo")
            toast(<CustomToast message={error.message} type="error" />);
        }
    };

    useEffect(() => {
        fetchLawyerSlot();
    }, [dispatch]);

    const handleTime = (time: string) => {
        setSelectedTime(time);

        const slotsForSelectedDate = fetchedSlots?.slots.find(
            (slot) => new Date(slot.date).toDateString() === selectedDate?.toDateString()
        );
        console.log(slotsForSelectedDate, "is the specific Slot Id")
        const selectedSlot = slotsForSelectedDate?.availability.find((slot) => slot.timeSlot === time);
        if (selectedSlot) {
            setFee(selectedSlot?.fee || null);
            setSelectedSpecificSlot(selectedSlot?._id)
            console.log(selectedSpecificSlot)

        }


    };
    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };
    const handleRemoveImage = () => {
        if (previewImage) {
            if (previewImage) URL.revokeObjectURL(previewImage);
        }
        setImage(null);
        setPreviewImage(null);
    };

    const handleSubmit = async () => {
        try {

            if (!selectedDate || !selectedTime || !selectedSlotId || !fee || !description) {
                toast(<CustomToast message="Please select date and time and description slot" type="error" />);
                return;
            }

            // Create form data
            const formData = new FormData();
            formData.append('lawyerId', lawyerId || id || '');
            formData.append('slotId', selectedSlotId);
            formData.append('specificSlotId', selectedSpecificSlot || "");
            formData.append('appointmentDate', selectedDate.toISOString());
            formData.append('appointmentTime', selectedTime);
            formData.append('consultationFee', fee.toString());
            formData.append('description', description);
            formData.append('userId', userInfo?._id as string);

            if (image) {
                formData.append('image', image);
            }
            try {

                const response = await dispatch(createAppointment(formData)).unwrap();

                if (response.status) {
                    const AppointmentId = response.result._id as string
                    // toast(<CustomToast message={response.message} type="success" />);
                    navigate(`/payment/${AppointmentId}`)
                }
            } catch (error: any) {
                setSelectedDate(null)
                setSelectedTime(null)
                fetchLawyerSlot();
                toast(<CustomToast message={error.message || error || "server Error"} type="error" />);

            }
        } catch (error: any) {
            toast(<CustomToast message={error.message || "An error occurred while booking"} type="error" />);
        }
    }

    const isTimeInPast = (time: string) => {
        if (!selectedDate) return false;
        const now = moment();
        const slotDateTime = moment(selectedDate)
            .hour(moment(time, 'hh:mm A').hour())
            .minute(moment(time, 'hh:mm A').minute());

        return slotDateTime.isBefore(now);
    };
    return (
        <div className='container min-h-screen'>
            <div className='max-w-4xl mx-auto my-10 p-5 rounded-md shadow-md h-[80%]'>
                <div className='flex items-start gap-5 my-10'>
                    <div className="mb-4">
                        <div className="w-30 h-28 rounded-full border-1 border-black overflow-hidden">
                            <img
                                src={fetchedSlots?.lawyerDetails?.profile_picture || lawyer?.profile_picture}
                                alt="User Avatar"
                                className="w-full h-full object-contain rounded-full"
                            />
                        </div>
                    </div>

                    <div>
                        <h1 className='text-l font-medium text-black uppercase'>{fetchedSlots?.lawyerDetails?.userName || lawyer?.userName}</h1>
                        <h2 className='text-base font-medium'>{fetchedSlots?.lawyerDetails?.designation || lawyer?.designation}</h2>
                        <h3 className='text-gray-700 text-sm font-light'>
                            {fetchedSlots?.lawyerDetails?.city || lawyer?.city}, {fetchedSlots?.lawyerDetails?.state || lawyer?.state}
                        </h3>
                    </div>
                </div>


                <div className='my-6 bg-gray-50 rounded-lg shadow-lg h-auto'>
                    <h3 className="text-lg font-medium mb-2 text-center">Select Date</h3>
                    <div className=" grid grid-cols-2 sm:flex sm:flex-row items-center justify-between w-full bg-white p-5 gap-3 cursor-pointer rounded-lg">
                        {[...Array(7)].map((_, index) => {
                            const date = new Date();
                            date.setDate(date.getDate() + index);
                            const isSelected = selectedDate?.toDateString() === date.toDateString();

                            return (
                                <div
                                    key={index}
                                    className={`text-center rounded-lg shadow-xl border border-black py-5 sm:w-1/6 ${isSelected ? 'bg-primary text-white' : 'bg-gray-100'}`}
                                    onClick={() => handleDate(date)}
                                >
                                    <SlCalender className="mx-auto" />
                                    <p>
                                        {date.toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            day: '2-digit',
                                            month: 'short',
                                        })}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    <div className='my-6 p-3'>
                        {selectedDate && (
                            <div className="my-5">
                                <h3 className="text-lg font-medium mb-3">Select Time</h3>
                                {availableSlots.filter(slot => !isTimeInPast(slot.timeSlot)).length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                                        {availableSlots
                                            .filter((slot) => !isTimeInPast(slot.timeSlot))
                                            .map((slot) => (
                                                <Button
                                                    key={slot.timeSlot}
                                                    className={`
                                ${slot.status
                                                            ? 'bg-red-100 text-red-600 cursor-not-allowed'
                                                            : selectedTime === slot.timeSlot
                                                                ? 'bg-primary text-white'
                                                                : 'bg-gray-100'
                                                        }
                            `}
                                                    onClick={() => !slot.status && handleTime(slot.timeSlot)}
                                                    disabled={slot.status}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <span>{slot.timeSlot}</span>
                                                        {slot.status && (
                                                            <span className="text-xs font-medium">Booked</span>
                                                        )}
                                                    </div>
                                                </Button>
                                            ))}
                                    </div>
                                ) : (
                                    <p>No available time slots for this date.</p>
                                )}
                            </div>
                        )}

                    </div>

                    {selectedTime && (
                        <div className="mt-4 text-center">
                            {fee !== null && (
                                <p className="font-medium">Consultation Fee: ${fee}</p>
                            )}
                        </div>
                    )}

                </div>

                {selectedTime && (
                    <div className=''>
                        <h3>Consultation Subject</h3>
                        <div className="m-4 text-center sm:w-full gap-3 flex flex-col flex-grow sm:flex sm:flex-row  ">

                            <textarea
                                name="Description"
                                placeholder="Description of Your Legal Concern"
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                                value={description}
                                className=" p-2 h-40 border  sm:w-1/2  rounded bg-gray-300"
                            />




                            <div className='sm:ml-5'>
                                <input
                                    type='file'
                                    onChange={handleImage}
                                    accept='image/*'

                                    id="indiaImageUpload"
                                />
                                {previewImage && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={previewImage} alt='Selected' className='w-24 h-24 object-contain border' />
                                        <button onClick={handleRemoveImage} className="mt-2 text-red-500 text-sm flex items-center space-x-1">
                                            <IoMdClose /> <span>Remove</span>
                                        </button>
                                    </div>
                                )}
                            </div>


                        </div>


                    </div>
                )}

                {selectedTime && (
                    <Button
                        className='flex items-center my-5 bg-primary text-white font-semibold text-base mx-auto'
                        onClick={handleSubmit}
                        disabled={!selectedDate || !selectedTime || !fee}
                    >
                        {!loading ? `MAKE PAYMENT RS ${fee}` : <div><Spinner size="sm" color="success" /><span className='mx-3 text-center'>Loading</span>
                        </div>}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default LawyerSlot;


