import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { SlCalender } from "react-icons/sl";
import timeSlots from '../../utils/constants/Time';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { createSlot, deleteSlot, fetchLawyerSlots, updateSlot } from '../../services/store/features/lawyerServices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { SlotData } from '../../utils/type/lawyerType';
import moment from "moment";

const SlotComponents: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { lawyerInfo } = useSelector((state: RootState) => state.lawyer);
    const [fetchedSlots, setFetchedSlots] = useState<SlotData[]>([]);
    const [DefaultAmount, setDefaultFeeAmount] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTimes] = useState<string[]>([]);
    const [existingTime, setExistingTime] = useState<string[]>([]);
    const [editingSlot, setEditingSlot] = useState<SlotData | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [customizingFee, setCustomizingFee] = useState<string | null>(null);
    const [slotFees, setSlotFees] = useState<{ [key: string]: number }>({});
    const [bookedSlots, setBookedSlots] = useState<string[]>([])

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await dispatch(fetchLawyerSlots(lawyerInfo?._id)).unwrap();
            if (response.status) {
                setFetchedSlots(response.result);
            }
        } catch (error: any) {
            toast(<CustomToast message={error} type="error" />);
        }
    };

    const getSlotForDate = (date: Date) => {
        return fetchedSlots.find(slot =>
            moment(slot.date).format('YYYY-MM-DD') === moment(date).format('YYYY-MM-DD')
        );
    };


    const handleDate = (DateForSlotCreation: Date) => {
        setSelectedDate(DateForSlotCreation);
        // fetchedSlots.find(slot => new Date(slot.date).toDateString() === DateForSlotCreation.toDateString())
        const existingSlot = getSlotForDate(DateForSlotCreation);
        if (existingSlot) {
            setEditingSlot(existingSlot);
            setDefaultFeeAmount(existingSlot.fees);
            const availableTimes = existingSlot.availability.map(slot => slot.timeSlot);
            setSelectedTimes(availableTimes);
            setExistingTime(availableTimes);


            const bookedSlotsForDate = existingSlot.availability
                .filter(slot => slot.status)
                .map(slot => slot.timeSlot);
            setBookedSlots(bookedSlotsForDate);


            const fees: Record<string, number> = {};
            existingSlot.availability.forEach(slot => {
                fees[slot.timeSlot] = slot.fee || DefaultAmount;
            });
            setSlotFees(fees);

            setEditMode(true);
        } else {
            setEditingSlot(null);
            setDefaultFeeAmount(0);
            setSelectedTimes([]);
            setExistingTime([]);
            setBookedSlots([]);
            setSlotFees({});
            setEditMode(false);
        }
        // setCustomizingFee(null);
    };

    const handleTime = (time: string) => {
        if (isTimeInPast(time)) {
            toast(<CustomToast message="Cannot select a past time slot." type="error" />);
            return;
        }

        setSelectedTimes(prevTimes => {
            if (prevTimes.includes(time)) {
                return prevTimes.filter(t => t !== time);
            } else {
                return [...prevTimes, time];
            }
        });

        setSlotFees(prevFees => ({
            ...prevFees,
            [time]: prevFees[time] || DefaultAmount
        }));
    };

    const handleFeeChange = (time: string, fee: number) => {
        setSlotFees(prevFees => ({
            ...prevFees,
            [time]: fee
        }));
    };

    const handleSave = async () => {
        if (selectedDate && selectedTime.length > 0 && DefaultAmount) {
            const invalidFees = Object.values(slotFees).some(fee => fee < 0 || fee > 4000)
            if (invalidFees) {
                toast(<CustomToast message={"Invalid fee amount. Fees must be between 0 and 4000"} type="error" />);
                return;
            }
            const availability = selectedTime.map(time => ({
                timeSlot: time,
                fee: slotFees[time] || DefaultAmount
            }));
            let data = { id: lawyerInfo?._id, date: selectedDate, time: availability, feeAmount: DefaultAmount, slotId: editingSlot?._id };
            try {
                let response;
                if (editMode) {
                    response = await dispatch(updateSlot(data)).unwrap();
                } else {
                    response = await dispatch(createSlot(data)).unwrap();
                }
                if (response.status) {
                    fetchSlots();
                    handleReset();
                    toast(<CustomToast message={response.message} type="success" />);
                }
            } catch (error: any) {
                toast(<CustomToast message={error} type="error" />);
            }
        } else {
            toast(<CustomToast message={"Missing required data"} type="error" />);
        }
    };
    const isTimeInPast = (time: string) => {
        if (!selectedDate) return false;
        const now = moment();
        const slotDateTime = moment(selectedDate)
            .hour(moment(time, 'hh:mm A').hour())
            .minute(moment(time, 'hh:mm A').minute());

        return slotDateTime.isBefore(now);
    };
    const handleDelete = async () => {
        console.log(editingSlot?._id)
        try {
            const response = await dispatch(deleteSlot(editingSlot?._id)).unwrap();
            if (response.status) {
                handleReset()
                fetchSlots();
                toast(<CustomToast message={response.message} type="success" />);
            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }
    }

    const handleReset = () => {
        setSelectedDate(null);
        setSelectedTimes([]);
        setExistingTime([]);
        setDefaultFeeAmount(0);
        setEditMode(false);
        setEditingSlot(null);
        setSlotFees({});
        setCustomizingFee(null);
    };

    return (
        <div className="container sm:my-10 bg-gray-300 sm:min-h-screen shadow-xl rounded-lg w-auto sm:max-w-2xl md:max-w-4xl sm:max-auto sm:p-5">
            <h3 className="text-2xl font-semibold">Slot Allocation</h3>

            <div className="mb-6 my-4 bg-gray-50 rounded-lg shadow-md h-auto">
                <h3 className="text-lg font-medium mb-2 text-center">Select Date</h3>
                <div className="flex items-center justify-between w-full bg-white p-5 gap-3 cursor-pointer rounded-lg">
                    {[...Array(7)].map((_, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() + index);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const hasSlot = fetchedSlots.some(slot => new Date(slot.date).toDateString() === date.toDateString());

                        return (
                            <div
                                key={index}
                                className={`text-center rounded-lg shadow-xl border border-black py-5 w-1/6 
                            ${isSelected ? 'bg-primary-500 text-white' : hasSlot ? 'bg-green-200' : 'bg-gray-100'}
                            cursor-pointer`}
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
            </div>
            {!editMode &&
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Set Default Fee Amount</h3>
                    <input
                        min={0}
                        max={4000}
                        type="number"
                        value={DefaultAmount}
                        onChange={(e) => setDefaultFeeAmount(parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                    />
                </div>
            }


            {selectedDate && (
                <div className="my-5">
                    <h3 className="text-lg font-medium mb-3">Select Time</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map(time => {
                            const isSelected = selectedTime.includes(time);
                            const isExisting = existingTime.includes(time);

                            const isBooked = bookedSlots.includes(time);
                            const isPast = isTimeInPast(time);
                            return (
                                <div key={time} className="flex flex-col items-center">
                                    <Button
                                        onClick={() => !isBooked && !isPast && handleTime(time)}
                                        className={`
                                            ${isBooked ? 'bg-green-700 text-black cursor-not-allowed' :
                                                isPast ? 'bg-gray-200 text-gray-400 cursor-not-allowed' :
                                                    isSelected && isExisting ? 'bg-gray-500 text-white' :
                                                        isSelected ? 'bg-primary-500 text-white' :
                                                            'bg-gray-100'}
                                            transition-colors duration-200
                                        `}
                                    >
                                        <div>
                                            <p>{time}
                                            </p>

                                            {isBooked && (
                                                <p className="text-xs font-medium">Booked</p>
                                            )}

                                            {isPast && !isBooked && <p className="text-xs font-medium">No Available</p>}
                                        </div>

                                    </Button>
                                    {!isBooked && isSelected && !isPast && (
                                        <div className="my-1 text-center">

                                            {customizingFee === time ? (

                                                <input
                                                    type="number"
                                                    min={0}
                                                    max={4000}
                                                    value={slotFees[time] || ''}
                                                    onChange={(e) => handleFeeChange(time, parseInt(e.target.value))}
                                                    className="mt-1 w-full text-sm p-1 border rounded"
                                                    placeholder="Fee"
                                                    onBlur={() => setCustomizingFee(null)}
                                                />
                                            ) : (
                                                <button
                                                    onClick={() => setCustomizingFee(time)}
                                                    className="mt-1 text-xs text-blue-500 underline cursor-pointer"
                                                >
                                                    {!editMode ? "Customize Fee" : "Update Fee"}

                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                    </div>
                </div>
            )}



            <div className='flex justify-start gap-4 max-w-[50%] items-center mb-4'>
                <span className='w-3 h-3 bg-green-600'></span><p>Booked</p>
                <span className='w-3 h-3 bg-gray-500'></span><p>Selected</p>
                <span className='w-3 h-3 bg-white'></span><p>Unselected</p>
            </div>

            <div className="flex justify-end space-x-4">
                <Button className="px-4 py-2 bg-yellow-400 rounded" onClick={handleSave}>
                    {editMode ? 'Update' : 'Save'}
                </Button>
                {selectedDate && editMode &&
                    <Button className="px-4 py-2 bg-red-600" onClick={handleDelete}>
                        Delete All Slot
                    </Button>
                }
                {editMode && (
                    <Button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
                        Cancel Edit
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SlotComponents;