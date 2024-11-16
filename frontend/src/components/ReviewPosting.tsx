import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import ReactStars from 'react-stars';
import CustomToast from "./userComponents/CustomToast";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/store/store";
import { PostReviewAndRating } from "../services/store/features/userServices";
import { useNavigate } from "react-router-dom";

interface AddReviewProps {
    isOpen: boolean;
    appointmentId: string,
    onClose: () => void;
}

export default function AddReview({ isOpen, onClose, appointmentId }: AddReviewProps) {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    const [review, setReview] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const ratingChanged = (newRating: any) => {
        setRating(newRating)
    }

    const handleSubmit = async () => {
        if (!rating || review.trim().length < 10) {
            toast(<CustomToast message={"Please provide a rating and at least 10 characters of feedback."} type="error" />);
            return;
        }
        try {
            const data = {
                appointmentId,
                rating,
                review
            }
            const response = await dispatch(PostReviewAndRating(data)).unwrap()
            if (response) {
                toast(<CustomToast message={response.message} type="success" />);
                navigate("/")
            }
        } catch (error: any) {

            toast(<CustomToast message={error || error.message} type="error" />);
        }



        onClose();
    };
    return (
        <Modal
            // backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onClose}
            classNames={{
                backdrop: ""
            }}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1 text-center text-black text-sm">Rate Your Consultation Experience</ModalHeader>
                    <ModalBody>

                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            value={rating}
                            size={40}
                            color2={'#ffd700'}
                        />


                        <h6>Leave Your Feedback</h6>
                        <textarea
                            placeholder="Write your feedback here..."
                            minLength={10}
                            maxLength={400}
                            className="w-full p-2 border rounded bg-gray-300"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleSubmit}>
                            Submit
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
