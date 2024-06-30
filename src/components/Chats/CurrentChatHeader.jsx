import React from "react";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";
import { Avatar, Flex, Spinner, Text } from "@chakra-ui/react";

const CurrentChatHeader = ({ uid }) => {
    const { isLoading, userProfile } = useGetUserProfileById(uid);
    const truncateMessage = (message, maxLength) => {
        if (message.length > maxLength) {
            return message.substring(0, maxLength) + "...";
        }
        return message;
    };
    return (
        <>
            <Flex
                alignItems={"center"}
                mt={2}
                pb={2}
                borderBottom={"1px solid"}
                mb={"auto"}
            >
                {!isLoading && (
                    <Flex alignItems={"center"}>
                        <Avatar
                            size={"md"}
                            src={userProfile?.profilePicURL}
                            name={userProfile?.username}
                            ml={5}
                        ></Avatar>
                        <Text ml={3} fontWeight={"600"}>
                            {userProfile?.username}
                        </Text>
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

export default CurrentChatHeader;
