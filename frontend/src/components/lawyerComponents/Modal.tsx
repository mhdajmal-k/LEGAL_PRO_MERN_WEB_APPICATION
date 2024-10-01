import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

export default function App() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="secondary">Open Modal</Button>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                    body: "py-6",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    footer: "border-t-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Submitted Successfully</ModalHeader>
                            <ModalBody>
                                <h1>Submitted Successfully</h1>
                                <p>
                                    Thank you for registering with LegalPro. We have received your details and documents.
                                </p>
                                <p>
                                    Our team will review your submission to verify your credentials, which usually takes 24 to 48 hours. Once approved, you’ll receive a confirmation email, and your profile will be activated. You can then access the lawyer dashboard, manage your profile, and start receiving client inquiries.
                                </p>

                            </ModalBody>
                            <ModalFooter>
                                <Button className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}