import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Send, PhoneIncoming } from 'lucide-react';
import { useSocket } from "../../contextAPI/useSocket";
import RingTone from "../../assets/RingTone.mp3"
import { toast } from "sonner";
import CustomToast from "../../components/userComponents/CustomToast";

interface VideoCallPageProps {
    appointmentId: string | undefined;
    userId: string | undefined;
}

const VideoCallPage: React.FC<VideoCallPageProps> = ({ appointmentId, userId }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [isCameraOff, setIsCameraOff] = useState(false);
    const [socketId, setSocketId] = useState("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [mySocketId, setMySocketId] = useState<string | undefined>("");
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [isCallStarted, setIsCallStarted] = useState(false);
    const [incomingCall, setIncomingCall] = useState(false);


    const myVideo = useRef<HTMLVideoElement>(null);
    const userVideo = useRef<HTMLVideoElement>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const socket = useSocket();



    useEffect(() => {
        if (!socket) return;

        const initializeSocketEvents = () => {


            socket?.on("userJoined", (socketId) => {
                console.log("another user joined")
                toast(<CustomToast message={"New contact online! You Can Call."} type="success" />, {
                    duration: 3000
                });
                alert(socketId)
                setSocketId(socketId)
            })

            // socket.on("userJoined", (newUserId: string) => {
            //     alert("hi")
            //     console.log(`User joined: ${newUserId}`);
            // });

            socket.on("offer", async ({ offer, userId }) => {

                setIncomingCall(true);
                console.log('Incoming call', offer, userId);

                if (!peerConnection.current) {
                    await initializePeerConnection();
                }

                try {
                    await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));
                    if (audioRef.current) {
                        audioRef.current.play();
                    }
                } catch (error) {
                    console.error("Error handling offer:", error);
                }
            });

            socket.on("answer", async ({ answer }) => {
                try {
                    await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
                    console.log("call accepted")
                } catch (error) {
                    console.error("Error handling answer:", error);
                }
            });

            socket.on("candidate", async ({ candidate }) => {
                // alert("in candidate")
                try {
                    if (peerConnection.current?.remoteDescription) {
                        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                    }
                } catch (error) {
                    console.error("Error adding ICE candidate:", error);
                }
            });

            socket.on("message", (message: any) => {
                setMessages(prev => [...prev, message]);
            });
            socket.on("isTyping", () => {
                console.log("is Typing working...")
            });
        };

        initializeSocketEvents();


        return () => {
            socket.off("connect");
            socket.off("userJoined");
            socket.off("offer");
            socket.off("answer");
            socket.off("candidate");
            socket.off("message");
            setIsCallStarted(false);
        };
    }, [socket,]);

    const initializePeerConnection = async () => {
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            setStream(localStream);
            if (myVideo.current) {
                myVideo.current.srcObject = localStream;
            }

            peerConnection.current = new RTCPeerConnection({
                iceServers: [
                    { urls: "stun:stun.l.google.com:19302" },
                    { urls: "stun:stun1.l.google.com:19302" }
                ]
            });

            localStream.getTracks().forEach(track => {
                peerConnection.current?.addTrack(track, localStream);
            });

            peerConnection.current.onicecandidate = (event) => {
                if (event.candidate) {
                    socket?.emit("candidate", {
                        roomId: appointmentId,
                        candidate: event.candidate,
                        userId: socketId
                    });
                }
            };

            peerConnection.current.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
                if (userVideo.current) {
                    userVideo.current.srcObject = event.streams[0];
                }
            };

        } catch (error) {
            console.error("Error initializing peer connection:", error);
        }
    };

    const startCall = async () => {
        try {
            await initializePeerConnection();
            const offer = await peerConnection.current?.createOffer();
            await peerConnection.current?.setLocalDescription(offer);

            socket?.emit("offer", {
                roomId: appointmentId,
                offer,
                userId: socketId
            });

            setIsCallStarted(true);
        } catch (error) {
            console.error("Error starting call:", error);
        }
    };
    const answerCall = async () => {
        try {
            if (!peerConnection.current) {
                await initializePeerConnection();
            }
            const answer = await peerConnection.current?.createAnswer();

            await peerConnection.current?.setLocalDescription(answer);
            console.log("in the answerCall fn")
            console.log(answer, "is the answer in the fn")
            console.log(userId, "is the userId in the fn")
            socket?.emit("answer", { roomId: appointmentId, answer, userId: socketId }); //userId: userId 
            setIncomingCall(false);
            setIsCallStarted(true);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        } catch (error) {
            console.error("Error answering call:", error);
        }
    };
    const handileEnd = () => {
        toast(
            <div >
                <p>Are you sure you want  Hang out the  Call?</p>
                <div className="flex space-x-2 mt-3 ">
                    <button
                        className=" bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        onClick={async () => {

                            // const endCall = async () => {
                            try {
                                stream?.getTracks().forEach(track => track.stop());
                                peerConnection.current?.close();
                                setStream(null);
                                setRemoteStream(null);
                                setIsCallStarted(false);
                                await navigator.mediaDevices.getUserMedia({
                                    video: false,
                                    audio: false
                                });

                            } catch (error: any) {
                                toast(<CustomToast message={error.message} type="error" />);
                            }
                            // };

                        }}

                    >
                        Hang out
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md"
                        onClick={() => toast.dismiss()}
                    >
                        Cancel
                    </button>
                </div>
            </div>,

        );

    }




    const toggleMute = () => {
        if (stream) {
            const audioTrack = stream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setIsMuted(!audioTrack.enabled);
        }
    };

    const toggleCamera = () => {
        if (stream) {
            const videoTrack = stream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setIsCameraOff(!videoTrack.enabled);
        }
    };

    useEffect(() => {
        if (newMessage.trim() == "") {
            setIsTyping(false)
        } else {
            setIsTyping(true)
        }
        if (isTyping) {
            socket?.emit("isTyping", {
                roomId: appointmentId,
            })
        }
    }, [newMessage]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            socket?.emit("message", {
                roomId: appointmentId,
                message: newMessage,
                userId: mySocketId
            });
            setNewMessage("");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        <video
                            ref={userVideo}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover aspect-video"
                        />
                        <div className="absolute top-4 right-4 w-1/4 aspect-video">
                            <video
                                ref={myVideo}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>


                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={toggleMute}
                            className={`p-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-blue-500'}`}
                        >
                            {isMuted ? <MicOff /> : <Mic />}
                        </Button>
                        <Button
                            onClick={toggleCamera}
                            className={`p-2 rounded-full ${isCameraOff ? 'bg-red-500' : 'bg-blue-500'}`}
                        >
                            {isCameraOff ? <VideoOff /> : <Video />}
                        </Button>
                        {incomingCall ? (
                            <Button
                                onClick={answerCall}
                                className="p-2 rounded-full bg-green-500"
                            > you have a Incoming Call
                                <PhoneIncoming />
                            </Button>
                        ) : (
                            <Button
                                onClick={isCallStarted ? handileEnd : startCall}
                                className={`p-2 rounded-full ${isCallStarted ? 'bg-red-500' : 'bg-green-500'}`}
                            >
                                {isCallStarted ? <PhoneOff /> : 'Start Call'}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-[600px]">
                    <h2 className="text-xl font-semibold mb-4">Chat</h2>
                    <div className="flex-1 overflow-y-auto mb-4 space-y-2">
                        {messages.map((message, index) => (
                            <div key={index} className={`p-2 rounded-lg ${message.sender != mySocketId ? "bg-gray-100" : "bg-gray-500"}`}>
                                {message.message}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage}>
                            <Send />
                        </Button>
                    </div>
                </div>
            </div>
            {incomingCall && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Card className="w-96">
                        <CardBody className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Incoming Call</h2>
                            <p className="mb-4">you have a Incoming  calling you...</p>
                            <div className="flex justify-center space-x-4">
                                <Button onClick={answerCall} className="bg-green-500 hover:bg-green-600">
                                    <PhoneIncoming className="mr-2" />
                                    Answer
                                </Button>
                                <Button onClick={handileEnd} className="bg-red-500 hover:bg-red-600">
                                    <PhoneOff className="mr-2" />
                                    Decline
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}

            <audio ref={audioRef} loop>
                <source src={RingTone} type="audio/mpeg" />

            </audio>
        </div>
    );
};

export default VideoCallPage;