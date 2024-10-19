import { Button } from '@nextui-org/react';
import { SlCalender } from "react-icons/sl";
import React, { useEffect, useState } from 'react';
import timeSlots from '../../utils/constants/Time';
import CustomToast from '../userComponents/CustomToast';
import { toast } from 'sonner';
import { createSlot, fetchLawyerSlots, updateSlot } from '../../services/store/features/lawyerServices';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { SlotData } from '../../utils/type/lawyerType';

const SlotComponents: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { lawyerInfo } = useSelector((state: RootState) => state.lawyer);
    const [slots, setSlots] = useState<SlotData[]>([]);
    const [feeAmount, setFeeAmount] = useState<number>(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTimes] = useState<string[]>([]);
    const [existingTime, setExistingTime] = useState<string[]>([]);
    const [editingSlot, setEditingSlot] = useState<SlotData | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await dispatch(fetchLawyerSlots(lawyerInfo?._id)).unwrap();
            if (response.status) {
                //setting to my slot all the slot
                setSlots(response.result);
            }
        } catch (error: any) {
            toast(<CustomToast message={error} type="error" />);
        }
    };

    const handleDate = (date: Date) => {
        setSelectedDate(date);
        const existingSlot = slots.find(slot => new Date(slot.date).toDateString() === date.toDateString());
        if (existingSlot) {
            setEditingSlot(existingSlot);
            // console.log(editingSlot)
            setFeeAmount(existingSlot.fees);
            const availableTimes = existingSlot.availability.map(slot => slot.timeSlot);
            setSelectedTimes(availableTimes);
            setExistingTime(availableTimes);
            setEditMode(true);
        } else {
            setEditingSlot(null);
            setFeeAmount(0);
            setSelectedTimes([]);
            setExistingTime([]);
            setEditMode(false);
        }
    };

    const handleTime = (time: string) => {
        setSelectedTimes(prevTimes => {
            if (prevTimes.includes(time)) {
                return prevTimes.filter(t => t !== time);
            } else {
                return [...prevTimes, time];
            }
        });
    };

    const handleSave = async () => {
        if (selectedDate && selectedTime.length > 0 && feeAmount) {
            if (feeAmount > 4000) {
                toast(<CustomToast message={"Fee amount is huge. Maximum you can add is 4000"} type="error" />);
                return;
            }
            if (feeAmount < 0) {
                toast(<CustomToast message={"Invalid fee amount"} type="error" />);
                return;
            }
            let data = { id: lawyerInfo?._id, date: selectedDate, time: selectedTime, feeAmount: feeAmount, slotId: editingSlot?._id };
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

    const handleReset = () => {
        setSelectedDate(null);
        setSelectedTimes([]);
        setExistingTime([]);
        setFeeAmount(0);
        setEditMode(false);
        setEditingSlot(null);
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
                        const hasSlot = slots.some(slot => new Date(slot.date).toDateString() === date.toDateString());

                        return (
                            <div
                                key={index}
                                className={`text-center rounded-lg shadow-xl border border-black py-5 w-1/6 
                            ${isSelected ? 'bg-gray-500 text-white' : hasSlot ? 'bg-green-200' : 'bg-gray-100'}
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

            {selectedDate && (
                <div className="my-5">
                    <h3 className="text-lg font-medium mb-3">Select Time</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map(time => {
                            const isSelected = selectedTime.includes(time);
                            const isExisting = existingTime.includes(time);
                            return (
                                <Button
                                    key={time}
                                    onClick={() => handleTime(time)}
                                    className={`
                                        ${isSelected && isExisting ? 'bg-gray-500 text-white' :
                                            isSelected ? 'bg-blue-500 text-white' :
                                                'bg-gray-100'}
                                    `}
                                >
                                    {time}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            )}

            {(
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Set Fee Amount for selected Date</h3>
                    <input
                        min={0}
                        max={4000}
                        type="number"
                        value={feeAmount}
                        onChange={(e) => setFeeAmount(parseInt(e.target.value))}
                        className="w-full p-2 border rounded"
                    />
                </div>
            )}
            <div className='flex  justify-start gap-4 max-w-[50%] items-center '>
                <span className='w-3 h-3 bg-green-600'></span><p>Booked</p>
                <span className='w-3 h-3 bg-gray-500'></span><p>selected</p>
                <span className='w-3 h-3 bg-white'></span><p>UnSelected</p>
            </div>
            {(
                <div className="flex justify-end space-x-4">
                    <Button className="px-4 py-2 bg-yellow-400 rounded" onClick={handleSave}>
                        {editMode ? 'Update' : 'Save'}
                    </Button>
                    {editMode && (
                        <Button className="px-4 py-2 bg-red-500 text-white rounded" onClick={handleReset}>
                            Cancel Edit
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SlotComponents;