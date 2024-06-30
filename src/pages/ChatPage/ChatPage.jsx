import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import useAuthStore from "../../store/authStore";
import useSendMessage from "../../hooks/useSendMessage";
import useFetchChats from "../../hooks/useFetchChats";
import ChatHeader from "../../components/Chats/ChatHeader";
import ChatMessage from "../../components/Chats/ChatMessage";
import NewChat from "../../components/Chats/NewChat";
import { IoSend } from "react-icons/io5";
import CurrentChatHeader from "../../components/Chats/CurrentChatHeader";

const ChatPage = () => {
    const messagesEndRef = useRef(null);
    const authUser = useAuthStore((state) => state.user);
    const [inputMessage, setInputMessage] = useState("");
    const [selectedChatId, setSelectedChatId] = useState(null); // State to keep track of the selected chat
    const { loading: sending_message, sendMessage } = useSendMessage();

    const { chats, loading: loading_chats } = useFetchChats();
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputMessage.trim()) {
            handleSendMessage();
            setInputMessage(""); // Clear input after sending
        }
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim()) {
            return;
        }
        const recipent_id = chats
            .find((chat) => chat.chatId == selectedChatId)
            .participants.find((uid) => uid != authUser.uid);

        sendMessage(
            {
                msg_value: inputMessage,
                sender_id: authUser.uid,
                receiver_id: recipent_id,
                time: new Date(),
            },
            recipent_id
        );
        console.log(recipent_id);
        setInputMessage("");
    };

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId); // Toggle selected chat
    };

    const timeout = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 450);
    // useEffect(() => {
    //     // Initial scroll to bottom on component mount
    //     if (messagesEndRef.current) {
    //         messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    //     }
    // }, []);

    return (
        <Flex h={"100%"}>
            <Flex
                w={"300px"}
                direction={"column"}
                p={4}
                maxH={"100vh"}
                borderRight={"1px solid black"}
                gap={5}
                overflowY='auto'
            >
                <NewChat></NewChat>
                <Text fontSize={20} fontWeight={"500"}>
                    {authUser.username}'s Chats
                </Text>

                {chats.map((chat) => (
                    <Flex
                        key={chat.chatId}
                        cursor={"pointer"}
                        onClick={() => handleChatClick(chat.chatId)}
                        _hover={{ bg: "gray.100" }}
                        w={"full"}
                        borderRadius={6}
                    >
                        <ChatHeader
                            uid={chat.participants.find(
                                (uid) => uid !== authUser.uid
                            )}
                            last_msg={chat.last_msg}
                            isActive={chat.chatId === selectedChatId} // Highlight active chat
                        />
                    </Flex>
                ))}
            </Flex>
            <Flex
                w={"full"}
                direction={"column"}
                maxH={"97vh"}
                mt={"auto"}
                mb={5}
                id='test'
                h={"100%"}
            >
                {!loading_chats && selectedChatId && (
                    <CurrentChatHeader
                        uid={chats
                            .find((chat) => chat.chatId == selectedChatId)
                            .participants.find((uid) => uid != authUser.uid)}
                    ></CurrentChatHeader>
                )}
                {loading_chats && (
                    <>
                        <Flex
                            direction={"column"}
                            alignItems={"center"}
                            h={"100%"}
                        >
                            <Spinner my={"auto"} size={"xl"}></Spinner>
                        </Flex>
                    </>
                )}
                {!loading_chats && selectedChatId && (
                    <>
                        <Flex direction={"column"} overflow={"auto"}>
                            {chats
                                .find((chat) => chat.chatId === selectedChatId)
                                .messages.map((message, index) => (
                                    <ChatMessage
                                        message={message}
                                        index={index}
                                        key={index}
                                    ></ChatMessage>
                                ))}
                            <div id='scroller' ref={messagesEndRef} />
                        </Flex>
                        <Flex direction={"column"} alignItems={"center"}>
                            <InputGroup alignItems={"center"} mt={5} w={"97%"}>
                                <Input
                                    placeholder='Message...'
                                    value={inputMessage}
                                    onChange={(e) =>
                                        setInputMessage(e.target.value)
                                    }
                                    borderRadius={17}
                                    onKeyDown={handleKeyDown}
                                />
                                <InputRightElement>
                                    {sending_message && <Spinner></Spinner>}
                                    {!sending_message && (
                                        <IoSend
                                            onClick={handleSendMessage}
                                            isLoading={sending_message}
                                        ></IoSend>
                                    )}
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </>
                )}
            </Flex>
        </Flex>
    );
};

export default ChatPage;
