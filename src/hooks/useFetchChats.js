import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const useFetchChats = () => {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!authUser || !authUser.uid) {
            console.log("user not auth");
            return;
        }

        setLoading(true);

        const chatsQuery = query(
            collection(firestore, "chats"),
            orderBy("last_msg_time", "desc")
        );

        const unsubscribe = onSnapshot(chatsQuery, async (querySnapshot) => {
            const fetchedChats = [];

            for (const docSnapshot of querySnapshot.docs) {
                const chatData = docSnapshot.data();
                const participants = chatData.participants;
                const last_msg = chatData.last_msg;
                if (participants.includes(authUser.uid)) {
                    const messagesQuery = query(
                        collection(
                            firestore,
                            "chats",
                            docSnapshot.id,
                            "messages"
                        ),
                        orderBy("time", "asc")
                    );

                    const messagesSnapshot = await getDocs(messagesQuery);

                    const messages = messagesSnapshot.docs.map((doc) =>
                        doc.data()
                    );

                    fetchedChats.push({
                        chatId: docSnapshot.id,
                        last_msg,
                        participants,
                        messages,
                    });
                }
            }

            setChats(fetchedChats);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [authUser]);

    return { chats, loading };
};

export default useFetchChats;
