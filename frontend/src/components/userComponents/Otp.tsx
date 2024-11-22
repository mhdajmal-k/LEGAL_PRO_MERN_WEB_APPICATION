import React, { useEffect, useState } from 'react';
import { IoCheckmarkCircle } from "react-icons/io5";
import CustomButton from '../CustomButton';
import { AppDispatch, RootState } from '../../services/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resendOtp, verifyOtp } from '../../services/store/features/userServices';
import CustomToast from './CustomToast';
import { toast } from 'sonner';
import { clearError } from '../../services/store/features/userSlice';


const OtpFrom: React.FC = () => {

    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timer, setTimer] = useState<number>(60);
    const [otpError, setOtpError] = useState<string>("");
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

        if (error) {
            setTimeout(() => {
                dispatch(clearError())
            }, 2000);
        }

        return () => clearInterval(Timer);
    }, [timer, error]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setOtpError("");

            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                (nextInput as HTMLInputElement).focus();
            }
        }
    };
    const OtpResend = async () => {

        try {
            const response = await dispatch(resendOtp()).unwrap()
            if (response) {
                toast(<CustomToast message={response.message} type="success" />);
            }
        } catch (error: any) {
            toast(<CustomToast message={error || error.message} type="error" />);
        }

    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otp.join('');
        if (otpCode == "") toast(<CustomToast message="otp is required" type="error" />);
        try {
            const response = await dispatch(verifyOtp(otpCode)).unwrap()
            navigate("/")
            toast(<CustomToast message={response.message} type="success" />);
        } catch (error: any) {
            setOtp(Array(6).fill(""));
            console.log(error, "dddddddddddddddddddddddddd")
            toast(<CustomToast message={error} type="error" />);
        }

    };




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
                        isLoading={loading}
                        disabled={!isOtpComplete || loading}
                    />
                </form>

                <div className='flex justify-between items-center mt-4'>
                    <span>{timer > 0 ? `Resend OTP in ${timer}` : "Didn't Receive OTP?"}</span>

                    {timer === 0 && (
                        <button
                            onClick={() => {
                                setTimer(60);
                                setResendEnabled(false);
                                OtpResend()
                            }}
                            className={`text-blue-500 ${resendEnabled ? '' : 'disabled:text-gray-400'}`}
                            disabled={!resendEnabled}
                        >
                            Resend
                        </button>
                    )}
                </div>
                {error && <span className='mt-3 text-red-500'>{error || otpError}</span>}
            </div>
        </div>
    );
};

export default OtpFrom;
