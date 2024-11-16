import { Avatar, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactStars from "react-stars";
import { AppDispatch } from "../../services/store/store";
import { Review } from "../../utils/type/userType";
import { getReviews } from "../../services/store/features/userServices";
import CustomToast from "./CustomToast";
import { toast } from "sonner";

export function ReviewCard({ appointmentId }: { appointmentId: string | undefined }) {
    const dispatch: AppDispatch = useDispatch();
    const [review, setReview] = useState<Review[] | null>([]);
    useEffect(() => {
        const fetchLawyerData = async () => {
            if (appointmentId) {
                try {
                    const response = await dispatch(getReviews(appointmentId)).unwrap();
                    setReview(response.result);
                    console.log(response, "is the response");
                } catch (error: any) {
                    toast(<CustomToast message={error || error.message} type="error" />);
                    console.error('Error fetching lawyer data:', error);
                }
            }
        };
        fetchLawyerData();
    }, [appointmentId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-3  items-center justify-center">

            {review?.length == 0 ? (<p>No reviews available.</p>) : review?.map((value, key) => {
                return (<div className="flex flex-row">
                    <Card key={key} className=" p-3 shadow-lg ">
                        <CardHeader className="flex items-center gap-3 pb-4">
                            <Avatar
                            // size="lg"
                            // src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            // alt="Tania Andrew"
                            />
                            <div className="flex flex-col">
                                <div className="flex justify-between items-center my-2">
                                    <h5 className="text-lg font-semibold text-blue-gray-800 pr-2">
                                        {value?.userId?.userName || "User"}
                                    </h5>
                                    <span className="text-sm text-gray-600 m-1 text-end ">
                                        {new Date(value?.createdAt || "").toLocaleString("en-US", {
                                            year: "2-digit",
                                            month: "short",
                                            day: "2-digit",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>
                                <ReactStars
                                    edit={false}
                                    count={5}
                                    value={value?.rating || 0}
                                    size={24}
                                    color2="#ffd700"
                                />
                            </div>

                        </CardHeader>
                        <CardBody className="text-gray-700">
                            <p className="text-sm">
                                {value?.review || "No review provided."}
                            </p>
                        </CardBody>
                    </Card>
                </div>)

            })}


        </div>
    );
}