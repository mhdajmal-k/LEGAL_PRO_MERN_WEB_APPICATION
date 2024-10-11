import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../services/store/store';
import { forgotpassword } from "../services/store/features/userServices";
import CustomToast from "./userComponents/CustomToast";
import { toast } from "sonner";
import { lawyerForgotpassword } from "../services/store/features/lawyerServices";

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    role: string;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, role }) => {
    const dispatch: AppDispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>('');
    const { loading, error: reduxError } = useSelector((state: RootState) =>
        role === "user" ? state.user : state.lawyer
    );

    useEffect(() => {
        if (reduxError) {
            setError(reduxError);
            setTimeout(() => {
                setError("");
            }, 3000);
        }
    }, [reduxError]);


    async function handleSendEmail(): Promise<void> {
        if (!email) {
            setError("Email is required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format");
            return;
        }
        if (role == "user") {
            try {

                const response = await dispatch(forgotpassword(email)).unwrap();
                if (response.status) {
                    setEmail('');
                    setError("")
                    onClose();
                    toast(<CustomToast message={response.message || 'An error occurred during login'} type="success" />);

                }

            } catch (error: any) {
                toast(<CustomToast message={error || 'An error occurred during login'} type="success" />);

                console.error("Error sending email:", error);
            }
        } else if (role == "lawyer") {

            try {

                const response = await dispatch(lawyerForgotpassword(email)).unwrap();
                if (response) {
                    setEmail('');
                    setError("")
                    onClose();
                    toast(<CustomToast message={response.message || 'An error occurred during login'} type="success" />);

                }

            } catch (error: any) {
                toast(<CustomToast message={error || 'An error occurred during login'} type="success" />);

                console.error("Error sending email:", error);
            }
        }

    }

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            placement="top-center"
            className="bg-white container"
            size="xl"

        >
            <ModalContent className="my-5">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex w-full flex-col gap-3">Forgot Password</ModalHeader>
                        <ModalBody>
                            <Input
                                autoFocus
                                size="sm"
                                type="email"
                                label="Email"
                                placeholder="Enter your Registered Email "
                                variant="bordered"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <span className="text-red-500">{error}</span>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={handleSendEmail} disabled={loading}>
                                {loading ? "Sending Reset Link..." : "Send Reset Link"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ResetPasswordModal;
