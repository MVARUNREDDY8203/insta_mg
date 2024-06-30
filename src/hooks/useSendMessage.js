import { useEffect, useState } from "react";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import useShowToast from "./useShowToast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    useEffect(() => {
        // Ensure authUser is authenticated and setup
        if (!authUser || !authUser.uid) {
            console.log("user not auth");
            return;
        }
    }, [authUser]);

    const sendMessage = async (message, receiver_uid) => {
        setLoading(true);
        if (!authUser.following.includes(receiver_uid)) {
            showToast(
                "Error",
                "You must follow the recipient to send a message.",
                "error"
            );
            console.error("You must follow the recipient to send a message.");
            setLoading(false);
            return;
        }

        // Determine the smaller and larger uids to create a consistent chatId
        const smallerUid =
            authUser.uid < receiver_uid ? authUser.uid : receiver_uid;
        const largerUid =
            authUser.uid >= receiver_uid ? authUser.uid : receiver_uid;
        const chatId = `${smallerUid}_${largerUid}`;

        try {
            let chat;

            // Check if the chat already exists in Firestore
            const chatDocRef = doc(firestore, "chats", chatId);
            const chatDoc = await getDoc(chatDocRef);

            if (chatDoc.exists()) {
                chat = chatDoc.data();
                // Update last_msg_time and last_msg in existing chat document in Firestore
                await updateDoc(chatDocRef, {
                    last_msg: message.msg_value,
                    last_msg_time: message.time,
                });
            } else {
                // Create a new chat if it doesn't exist
                chat = {
                    id: chatId,
                    participants: [authUser.uid, receiver_uid],
                    last_msg_time: message.time,
                    last_msg: message.msg_value,
                };

                // Create the chat document in Firestore
                await setDoc(chatDocRef, chat);
            }

            // Add the message to the messages subcollection in Firestore
            const messagesCollectionRef = collection(
                firestore,
                "chats",
                chatId,
                "messages"
            );
            await addDoc(messagesCollectionRef, message);
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
