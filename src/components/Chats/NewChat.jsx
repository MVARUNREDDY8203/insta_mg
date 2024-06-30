import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedPosts/SuggestedUser";
import { RxCross2 } from "react-icons/rx";
import useSendMessage from "../../hooks/useSendMessage";
import useAuthStore from "../../store/authStore";

const NewChat = () => {
    const { user, isLoading, setUser, getUserProfile } = useSearchUser();
    const searchRef = useRef(null);
    const { loading: sendingMessage, sendMessage } = useSendMessage();
    const handleSearchUser = (e) => {
        e.preventDefault();
        getUserProfile(searchRef.current.value);
    };
    const authUser = useAuthStore((state) => state.user);
    const handleNewChat = () => {
        sendMessage(
            {
                msg_value: "Hii !",
                sender_id: authUser.uid,
                receiver_id: user.uid,
                time: new Date(),
            },
            user.uid
        );
    };
    return (
        <>
            <Flex>
                <Flex direction={"column"}>
                    <InputGroup>
                        <Input placeholder='username' ref={searchRef}></Input>
                        <InputRightElement
                            _hover={{ bg: "gray.100" }}
                            borderRadius={6}
                            onClick={() => {
                                setUser(null);
                                searchRef.current.value = "";
                            }}
                        >
                            <RxCross2></RxCross2>
                        </InputRightElement>
                    </InputGroup>
                    {!user && (
                        <Button
                            mt={"1"}
                            isLoading={isLoading}
                            onClick={handleSearchUser}
                        >
                            Search
                        </Button>
                    )}
                    {user && <SuggestedUser user={user} setUser={setUser} />}
                    {user && (
                        <Button
                            onClick={handleNewChat}
                            isLoading={sendingMessage}
                        >
                            Start Chat
                        </Button>
                    )}
                </Flex>
            </Flex>
        </>
    );
};

export default NewChat;
