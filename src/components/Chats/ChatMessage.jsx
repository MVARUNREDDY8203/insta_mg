import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import useAuthStore from "../../store/authStore";

const ChatMessage = ({ message }) => {
    const authUser = useAuthStore((state) => state.user);
    const { isLoading, userProfile } = useGetUserProfileById(message.sender_id);

    // Determine if the message is sent by the authenticated user
    const isSentByAuthUser = message.sender_id === authUser.uid;

    return (
        <Flex
            mt={1}
            mr={isSentByAuthUser ? 5 : 0}
            justifyContent={isSentByAuthUser ? "flex-end" : "flex-start"}
            alignItems={"center"}
        >
            {!isLoading && (
                <>
                    {!isSentByAuthUser && (
                        <Avatar
                            name={userProfile.username}
                            size={"xs"}
                            src={userProfile.profilePicURL}
                            mr={2}
                            ml={5}
                        />
                    )}
                    {/* <Flex
                        maxW='70%'
                        p={2}
                        borderRadius={15}
                        bg={isSentByAuthUser ? "purple.500" : "gray.200"}
                        color={isSentByAuthUser ? "white" : "black"}
                        alignSelf='flex-start'
                    >
                        <Text
                            whiteSpace='pre-wrap'
                            textOverflow={"ellipsis"}
                            maxWidth={{ base: "150px", md: "500px" }}
                        >
                            {message.msg_value}
                        </Text>
                    </Flex> */}
                    <Flex
                        maxW='70%'
                        p={2}
                        borderRadius={15}
                        bg={isSentByAuthUser ? "purple.500" : "gray.200"}
                        color={isSentByAuthUser ? "white" : "black"}
                        alignSelf='flex-start'
                    >
                        <Text
                            whiteSpace='pre-wrap'
                            wordBreak='break-word'
                            overflowWrap='break-word'
                            flex='1'
                            maxWidth={{ base: "150px", md: "500px" }}
                        >
                            {message.msg_value}
                        </Text>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

export default ChatMessage;
