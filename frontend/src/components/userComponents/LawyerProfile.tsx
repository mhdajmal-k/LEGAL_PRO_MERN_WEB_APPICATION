import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store/store';
import { Lawyer } from '../../utils/type/lawyerType';
import CustomToast from './CustomToast';
import { toast } from 'sonner';
import { fetchLawyerById } from '../../services/store/features/userServices';
import { FaLocationDot } from "react-icons/fa6";
import { Button, Image, Skeleton } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { ReviewCard } from './ReveiwsList';


interface LawyerProfile {
    id: string | undefined;
}

const ViewLawyerProfile: React.FC<LawyerProfile> = ({ id }) => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const [showReview, setShowReview] = useState<boolean>(false)
    const [lawyer, setLawyer] = useState<Lawyer | null>(null);
    const { loading } = useSelector((state: RootState) => state.user)

    useEffect(() => {

        const fetchLawyerData = async () => {
            if (id) {
                try {
                    const response = await dispatch(fetchLawyerById(id)).unwrap();
                    setLawyer(response.result);
                    console.log(response, "is the response");
                } catch (error: any) {
                    toast(<CustomToast message={error || error.message} type="error" />);
                    console.error('Error fetching lawyer data:', error);
                }
            }
        };
        fetchLawyerData();
    }, [dispatch, id]);



    return (
        <div className="sm:max-w-md max-w-sm  md:max-w-3xl lg:max-w-5xl my-16 container h-auto mx-auto sm:p-6 md:p-8 bg-white shadow-lg rounded-lg overflow-hidden ">
            <div className="flex flex-col sm:flex-row items-center justify-center">

                <div className="w-full sm:w-1/3 p-4">

                    {loading ? (
                        <Skeleton className="rounded-lg h-60 w-full mb-4" />
                    ) : (
                        <Image
                            src={lawyer?.profile_picture || "/api/placeholder/395/429"}
                            alt={lawyer?.userName}
                            className="w-full h-full object-cover rounded"
                        />
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-16 w-full" />
                    ) : (
                        <p className="mt-5">{lawyer?.about}</p>
                    )}
                </div>

                <div className="w-full sm:w-2/3 p-4">

                    {loading ? (
                        <Skeleton className="rounded-lg h-8 w-2/3 mb-4" />
                    ) : (
                        <h2 className="text-xl md:text-2xl font-semibold mb-2 uppercase">{lawyer?.userName}</h2>
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-6 w-1/2 mb-4" />
                    ) : (
                        <div className="flex items-center mb-2">
                            <span>{lawyer?.designation}</span>
                        </div>
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-6 w-1/3 mb-4" />
                    ) : (
                        <div className="my-2 text-sm font-light">
                            <FaLocationDot className="inline-block mr-2" />
                            <span>{lawyer?.city},</span> <span>{lawyer?.state}</span>
                        </div>
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-8 w-full mb-4" />
                    ) : (
                        <div className="mb-4">
                            <p className="font-semibold">Practice Area:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {lawyer?.practice_area.map((area, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                        {area}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}


                    {loading ? (
                        <>
                            <Skeleton className="rounded-lg h-6 w-full mb-2" />
                            <Skeleton className="rounded-lg h-6 w-1/2 mb-4" />
                        </>
                    ) : (
                        <>
                            <p className="mb-2">
                                <span className="font-semibold">Court Practice Area:</span> {lawyer?.courtPracticeArea}
                            </p>

                            <p className="mb-2">
                                <span className="font-semibold">Experience:</span> {lawyer?.years_of_experience} years
                            </p>
                        </>
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-8 w-full mb-4" />
                    ) : (
                        <div className="mb-4">
                            <p className="font-semibold">Languages:</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {lawyer?.languages_spoken.map((lang, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                        {lang}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}


                    {loading ? (
                        <Skeleton className="rounded-lg h-12 w-full" />
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <Button className="bg-primary text-white px-4 py-2 rounded transition" onClick={() => navigate(`/slots/${id}`)}>
                                Book a Consultant
                            </Button>
                            <Button className="bg-primary text-white px-4 py-2 rounded" onClick={() => setShowReview((show) => !show)}>
                                Review
                            </Button>
                        </div>
                    )}
                </div>


            </div>
            {showReview && <div className="  my-8">
                <ReviewCard appointmentId={id} />

            </div>}

            {/* grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 */}
        </div>
    );
};

export default ViewLawyerProfile;
