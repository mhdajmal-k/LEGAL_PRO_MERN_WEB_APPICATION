import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import CustomButton from '../CustomButton';
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { verifyOtp } from '../../services/store/features/userServices';

const OtpFrom: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timer, setTimer] = useState<number>(60);
    const [resendEnabled, setResendEnabled] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const Timer = setInterval(() => {
            if (timer > 0) {
                setTimer((prev) => prev - 1);
            } else {
                setResendEnabled(true);
                clearInterval(Timer);
            }
        }, 1000);
        return () => clearInterval(Timer);
    }, [timer]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        const response = await dispatch(verifyOtp(otpCode)).unwrap()
        console.log(response)
    };

    // Check if all OTP fields are filled
    const isOtpComplete = otp.every((digit) => digit !== "");

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-100 p-4'>
            <div className='w-full max-w-md bg-white rounded-lg shadow-custom p-7'>
                <div className='flex justify-center mb-4'>
                    <IoCheckmarkCircle className='text-5xl text-green-500' />
                </div>
                <h2 className="text-xl font-bold text-center mb-2">Verify OTP</h2>
                <h2 className="text-sm font-light text-center mb-8">Your code was sent to your email</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4 grid grid-cols-6 gap-2 sm:gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(e, index)}
                                className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
                                required
                            />
                        ))}
                    </div>
                    <CustomButton
                        text='Verify'
                        isLoading={loading} // Pass loading state to CustomButton
                        disabled={!isOtpComplete || loading} // Disable button if OTP is incomplete or loading
                    />
                </form>

                <div className='flex justify-between items-center mt-4'>
                    <span>{timer > 0 ? `Resend OTP in ${timer}` : "Didn't Receive OTP?"}</span>
                    {error && <span>{error}</span>}
                    {timer === 0 && (
                        <button
                            onClick={() => {
                                setTimer(60);
                                setResendEnabled(false);
                            }}
                            className={`text-blue-500 ${resendEnabled ? '' : 'disabled:text-gray-400'}`}
                            disabled={!resendEnabled}
                        >
                            Resend
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpFrom;
