import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";

const ChatHeader = ({ uid, last_msg }) => {
    const { isLoading, userProfile } = useGetUserProfileById(uid);
    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return message.substring(0, maxLength) + "...";
        }
        return message;
    };
    return (
        <>
            <Flex alignItems={"center"}>
                {!isLoading && (
                    <Flex>
                        <Avatar
                            size={"md"}
                            src={userProfile?.profilePicURL}
                            name={userProfile?.username}
                        ></Avatar>
                        <Flex direction={"column"} alignItems={"flex-start"}>
                            <Text ml={5}>{userProfile?.username}</Text>
                            <Text ml={5}>{truncateMessage(last_msg, 15)}</Text>
                        </Flex>
                    </Flex>
                )}
                {isLoading && (
                    <Flex>
                        <Spinner></Spinner>
                    </Flex>
                )}
            </Flex>
        </>
    );
};

export default ChatHeader;
