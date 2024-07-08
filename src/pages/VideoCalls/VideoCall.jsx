// import React, { useState, useRef, useEffect } from "react";
// import {
//     Button,
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     useDisclosure,
//     Text,
//     Input,
// } from "@chakra-ui/react";
// import {
//     doc,
//     setDoc,
//     getDoc,
//     onSnapshot,
//     updateDoc,
//     deleteDoc,
// } from "firebase/firestore";
// import { firestore } from "../../firebase/firebase";
// import useAuthStore from "../../store/authStore";

// const VideoCall = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     const [callStatus, setCallStatus] = useState("idle"); // 'calling', 'ringing', 'accepted', 'ended'
//     const [callerStream, setCallerStream] = useState(null);
//     const [receiverStream, setReceiverStream] = useState(null);
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const peerConnection = useRef(null);
//     const authUser = useAuthStore((state) => state.user);
//     const receiverUID = "DzMImEj7BgNvRlgSH5A6UhrcT7J3"; // replace with actual receiver UID

//     useEffect(() => {
//         if (callerStream && localVideoRef.current) {
//             localVideoRef.current.srcObject = callerStream;
//         }
//         if (receiverStream && remoteVideoRef.current) {
//             remoteVideoRef.current.srcObject = receiverStream;
//         }
//     }, [callerStream, receiverStream]);

//     const setupWebRTC = async (isCaller) => {
//         const servers = {
//             iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
//         };
//         peerConnection.current = new RTCPeerConnection(servers);

//         peerConnection.current.onicecandidate = (event) => {
//             if (event.candidate) {
//                 sendSignalMessage(
//                     "candidate",
//                     serializeCandidate(event.candidate)
//                 );
//             }
//         };

//         peerConnection.current.ontrack = (event) => {
//             setReceiverStream(event.streams[0]);
//         };

//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: true,
//         });
//         setCallerStream(stream);
//         stream
//             .getTracks()
//             .forEach((track) => peerConnection.current.addTrack(track, stream));

//         if (isCaller) {
//             const offer = await peerConnection.current.createOffer();
//             await peerConnection.current.setLocalDescription(offer);
//             sendSignalMessage("offer", serializeSessionDescription(offer));
//         } else {
//             const callDoc = doc(firestore, "calls", receiverUID);
//             onSnapshot(callDoc, (snapshot) => {
//                 const data = snapshot.data();
//                 if (data) {
//                     if (data.type === "offer" && callStatus === "idle") {
//                         receiveCall();
//                     } else if (data.type === "answer") {
//                         handleAnswer(data);
//                     } else if (data.type === "candidate") {
//                         handleCandidate(data);
//                     } else if (
//                         data.status === "ended" ||
//                         data.status === "declined"
//                     ) {
//                         handleCallEnd();
//                     }
//                 }
//             });
//         }
//     };

//     const handleOffer = async (offer) => {
//         const deserializedOffer = deserializeSessionDescription(offer.data);
//         await peerConnection.current.setRemoteDescription(deserializedOffer);
//         const answer = await peerConnection.current.createAnswer();
//         await peerConnection.current.setLocalDescription(answer);
//         sendSignalMessage("answer", serializeSessionDescription(answer));
//     };

//     const handleAnswer = async (answer) => {
//         const deserializedAnswer = deserializeSessionDescription(answer.data);
//         await peerConnection.current.setRemoteDescription(deserializedAnswer);
//     };

//     const handleCandidate = async (candidate) => {
//         const deserializedCandidate = deserializeCandidate(candidate.data);
//         try {
//             await peerConnection.current.addIceCandidate(deserializedCandidate);
//         } catch (error) {
//             console.error("Error adding received ice candidate", error);
//         }
//     };

//     const sendSignalMessage = async (type, data) => {
//         const callDoc = doc(firestore, "calls", receiverUID);
//         await updateDoc(callDoc, {
//             type,
//             data,
//             timestamp: new Date(),
//         });
//     };

//     const startCall = async () => {
//         const callerDocRef = doc(firestore, "calls", authUser.uid);
//         const callerDocSnap = await getDoc(callerDocRef);

//         if (callerDocSnap.exists() && callerDocSnap.data().onCall) {
//             alert("You are already on another call");
//             return;
//         }

//         const receiverDocRef = doc(firestore, "calls", receiverUID);
//         const receiverDocSnap = await getDoc(receiverDocRef);

//         if (receiverDocSnap.exists() && receiverDocSnap.data().onCall) {
//             alert("User is on another call");
//             return;
//         }

//         await setDoc(callerDocRef, {
//             onCall: true,
//             caller: {
//                 uid: authUser.uid,
//                 username: authUser.username,
//                 profilePicURL: authUser.profilePicURL,
//             },
//         });

//         await setDoc(receiverDocRef, {
//             onCall: true,
//             caller: {
//                 uid: authUser.uid,
//                 username: authUser.username,
//                 profilePicURL: authUser.profilePicURL,
//             },
//         });

//         setCallStatus("calling");
//         setupWebRTC(true);
//         onOpen();
//     };

//     const receiveCall = () => {
//         setCallStatus("ringing");
//         setupWebRTC(false);
//         onOpen();
//     };

//     const acceptCall = () => {
//         setCallStatus("accepted");
//         updateCallStatus("accepted");
//     };

//     const endCall = async () => {
//         peerConnection.current.close();
//         setCallStatus("ended");
//         const callDoc = doc(firestore, "calls", receiverUID);
//         await updateDoc(callDoc, { status: "ended", onCall: false });
//         await deleteDoc(callDoc);
//     };

//     const updateCallStatus = async (status) => {
//         const callDoc = doc(firestore, "calls", receiverUID);
//         await updateDoc(callDoc, { status });
//     };

//     const handleCallEnd = async () => {
//         peerConnection.current.close();
//         setCallStatus("ended");
//         const callDoc = doc(firestore, "calls", receiverUID);
//         await updateDoc(callDoc, { status: "ended", onCall: false });
//     };

//     useEffect(() => {
//         const callDoc = doc(firestore, "calls", receiverUID);
//         const unsubscribe = onSnapshot(callDoc, (snapshot) => {
//             const data = snapshot.data();
//             if (data && data.type === "offer" && callStatus === "idle") {
//                 receiveCall();
//             } else if (
//                 (data.status === "ended" || data.status === "declined") &&
//                 callStatus !== "idle"
//             ) {
//                 handleCallEnd();
//             }
//         });
//         return () => unsubscribe();
//     }, [callStatus, onOpen]);

//     return (
//         <div>
//             <Input
//                 placeholder='Enter receiver UID'
//                 onChange={(e) => setReceiverUID(e.target.value)}
//             />
//             <Button onClick={startCall}>Start Video Call</Button>
//             <Modal isOpen={isOpen} onClose={onClose} size='xl'>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>
//                         {callStatus === "calling"
//                             ? "Calling..."
//                             : callStatus === "ringing"
//                             ? "Incoming Call..."
//                             : "In Call"}
//                     </ModalHeader>
//                     <ModalBody>
//                         <video
//                             ref={localVideoRef}
//                             autoPlay
//                             playsInline
//                             muted
//                             style={{ width: "100%", height: "auto" }}
//                         />
//                         {callStatus === "accepted" && (
//                             <video
//                                 ref={remoteVideoRef}
//                                 autoPlay
//                                 playsInline
//                                 style={{ width: "100%", height: "auto" }}
//                             />
//                         )}
//                         {callStatus === "ringing" && (
//                             <Button onClick={acceptCall}>Accept</Button>
//                         )}
//                     </ModalBody>
//                     <ModalFooter>
//                         {(callStatus === "accepted" ||
//                             callStatus === "ringing") && (
//                             <Button colorScheme='red' onClick={endCall}>
//                                 End Call
//                             </Button>
//                         )}
//                         <Button onClick={onClose}>Close</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </div>
//     );
// };

// export default VideoCall;

// const serializeCandidate = (candidate) => {
//     return {
//         candidate: candidate.candidate,
//         sdpMid: candidate.sdpMid,
//         sdpMLineIndex: candidate.sdpMLineIndex,
//     };
// };

// const deserializeCandidate = (data) => {
//     return new RTCIceCandidate(data);
// };

// const serializeSessionDescription = (description) => {
//     return {
//         type: description.type,
//         sdp: description.sdp,
//     };
// };

// const deserializeSessionDescription = (data) => {
//     return new RTCSessionDescription(data);
// };

import React, { useState, useRef, useEffect } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Text,
    Input,
} from "@chakra-ui/react";
import {
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import useAuthStore from "../../store/authStore";

const VideoCall = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [callStatus, setCallStatus] = useState("idle"); // 'calling', 'ringing', 'accepted', 'ended'
    const [callerStream, setCallerStream] = useState(null);
    const [receiverStream, setReceiverStream] = useState(null);
    const [receiverUID, setReceiverUID] = useState(
        "DzMImEj7BgNvRlgSH5A6UhrcT7J3"
    ); // replace with actual receiver UID
    const [callerUsername, setCallerUsername] = useState("");
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);
    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        if (callerStream && localVideoRef.current) {
            localVideoRef.current.srcObject = callerStream;
        }
        if (receiverStream && remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = receiverStream;
        }
    }, [callerStream, receiverStream]);

    const setupWebRTC = async (isCaller) => {
        const servers = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        };
        peerConnection.current = new RTCPeerConnection(servers);

        peerConnection.current.onicecandidate = (event) => {
            if (event.candidate) {
                sendSignalMessage(
                    "candidate",
                    serializeCandidate(event.candidate)
                );
            }
        };

        peerConnection.current.ontrack = (event) => {
            setReceiverStream(event.streams[0]);
            console.log("Received remote stream");
        };

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        setCallerStream(stream);
        stream
            .getTracks()
            .forEach((track) => peerConnection.current.addTrack(track, stream));
        console.log("Added local stream");

        if (isCaller) {
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            sendSignalMessage("offer", serializeSessionDescription(offer));
        } else {
            const callDoc = doc(firestore, "calls", authUser.uid);
            onSnapshot(callDoc, (snapshot) => {
                const data = snapshot.data();
                if (data) {
                    if (data.type === "offer" && callStatus === "idle") {
                        console.log(data);
                        setCallerUsername(data.caller.username);
                        receiveCall();
                    } else if (data.type === "answer") {
                        handleAnswer(data);
                    } else if (data.type === "candidate") {
                        handleCandidate(data);
                    } else if (
                        data.status === "ended" ||
                        data.status === "declined"
                    ) {
                        handleCallEnd();
                    }
                }
            });
        }
    };

    const handleOffer = async (offer) => {
        const deserializedOffer = deserializeSessionDescription(offer.data);
        await peerConnection.current.setRemoteDescription(deserializedOffer);
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        sendSignalMessage("answer", serializeSessionDescription(answer));
    };

    const handleAnswer = async (answer) => {
        const deserializedAnswer = deserializeSessionDescription(answer.data);
        await peerConnection.current.setRemoteDescription(deserializedAnswer);
    };

    const handleCandidate = async (candidate) => {
        const deserializedCandidate = deserializeCandidate(candidate.data);
        try {
            await peerConnection.current.addIceCandidate(deserializedCandidate);
        } catch (error) {
            console.error("Error adding received ice candidate", error);
        }
    };

    const sendSignalMessage = async (type, data) => {
        const callDoc = doc(firestore, "calls", receiverUID);
        await updateDoc(callDoc, {
            type,
            data,
            timestamp: new Date(),
        });
    };

    const startCall = async () => {
        const callerDocRef = doc(firestore, "calls", authUser.uid);
        const receiverDocRef = doc(firestore, "calls", receiverUID);

        const callerDocSnap = await getDoc(callerDocRef);
        if (callerDocSnap.exists() && callerDocSnap.data().status !== "idle") {
            alert("You are already on another call");
            return;
        }

        const receiverDocSnap = await getDoc(receiverDocRef);
        if (
            receiverDocSnap.exists() &&
            receiverDocSnap.data().status !== "idle"
        ) {
            alert("User is on another call");
            return;
        }

        await setDoc(callerDocRef, {
            status: "calling",
            onCall: true,
            caller: {
                uid: authUser.uid,
                username: authUser.username,
                profilePicURL: authUser.profilePicURL,
            },
        });

        await setDoc(receiverDocRef, {
            status: "ringing",
            onCall: true,
            caller: {
                uid: authUser.uid,
                username: authUser.username,
                profilePicURL: authUser.profilePicURL,
            },
        });

        setCallStatus("calling");
        setupWebRTC(true);
        onOpen();
    };

    const receiveCall = () => {
        setCallStatus("ringing");
        setupWebRTC(false);
        onOpen();
    };

    const acceptCall = async () => {
        setCallStatus("accepted");
        updateCallStatus("accepted");
        await setDoc(
            doc(firestore, "calls", authUser.uid),
            { status: "accepted" },
            { merge: true }
        );
    };

    const endCall = async () => {
        peerConnection.current.close();
        setCallStatus("ended");
        const callDoc = doc(firestore, "calls", receiverUID);
        await updateDoc(callDoc, { status: "ended", onCall: false });
        await updateDoc(doc(firestore, "calls", authUser.uid), {
            status: "idle",
            onCall: false,
        });
    };

    const updateCallStatus = async (status) => {
        const callDoc = doc(firestore, "calls", receiverUID);
        await updateDoc(callDoc, { status });
    };

    const handleCallEnd = async () => {
        peerConnection.current.close();
        setCallStatus("ended");
        const callDoc = doc(firestore, "calls", receiverUID);
        await updateDoc(callDoc, { status: "idle", onCall: false });
    };

    useEffect(() => {
        const callDoc = doc(firestore, "calls", receiverUID);
        const unsubscribe = onSnapshot(callDoc, (snapshot) => {
            const data = snapshot.data();
            if (data && data.type === "offer" && callStatus === "idle") {
                receiveCall();
            } else if (
                (data.status === "ended" || data.status === "declined") &&
                callStatus !== "idle"
            ) {
                handleCallEnd();
            }
        });
        return () => unsubscribe();
    }, [callStatus, onOpen]);

    return (
        <div>
            <Input
                placeholder='Enter receiver UID'
                onChange={(e) => setReceiverUID(e.target.value)}
            />
            <Button onClick={startCall}>Start Video Call</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {callStatus === "calling"
                            ? "Calling..."
                            : callStatus === "ringing"
                            ? `Incoming Call from ${callerUsername}...`
                            : "In Call"}
                    </ModalHeader>
                    <ModalBody>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ width: "48%" }}>
                                <Text>Caller Video</Text>
                                <video
                                    ref={localVideoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    style={{ width: "100%", height: "auto" }}
                                />
                            </div>
                            {callStatus === "accepted" && (
                                <div style={{ width: "48%" }}>
                                    <Text>Receiver Video</Text>
                                    <video
                                        ref={remoteVideoRef}
                                        autoPlay
                                        playsInline
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        {callStatus === "ringing" && (
                            <Button onClick={acceptCall}>Accept</Button>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {(callStatus === "accepted" ||
                            callStatus === "ringing") && (
                            <Button colorScheme='red' onClick={endCall}>
                                End Call
                            </Button>
                        )}
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default VideoCall;

const serializeCandidate = (candidate) => {
    return {
        candidate: candidate.candidate,
        sdpMid: candidate.sdpMid,
        sdpMLineIndex: candidate.sdpMLineIndex,
    };
};

const deserializeCandidate = (data) => {
    return new RTCIceCandidate(data);
};

const serializeSessionDescription = (description) => {
    return {
        type: description.type,
        sdp: description.sdp,
    };
};

const deserializeSessionDescription = (data) => {
    return new RTCSessionDescription(data);
};
