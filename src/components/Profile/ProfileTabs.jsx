import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {
    BsBookmark,
    BsBookmarks,
    BsGrid3X3,
    BsSuitHeart,
} from "react-icons/bs";

const ProfileTabs = () => {
    return (
        <>
            <Flex
                justifyContent={"center"}
                gap={{ base: 5, sm: 30, md: 70 }}
                borderTop={"1px solid"}
                borderTopColor={"gray.300"}
                height={"50px"}
                alignItems={"center"}
                overflow={"auto"}
            >
                <Flex
                    gap={"5px"}
                    height={"100%"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    borderTop={"1px solid transparent"}
                    _hover={{ borderTopColor: "black" }}
                    // _active={{ borderTopColor: "black" }}
                >
                    <Box fontSize={20}>
                        <BsGrid3X3></BsGrid3X3>
                    </Box>
                    <Text>POSTS</Text>
                </Flex>
                <Flex
                    gap={"5px"}
                    height={"100%"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    borderTop={"1px solid transparent"}
                    _hover={{ borderTopColor: "black" }}
                    // _active={{ borderTopColor: "black" }} // make changes here later for selected section
                >
                    <Box fontSize={20}>
                        <BsBookmark></BsBookmark>
                    </Box>
                    <Text>SAVED</Text>
                </Flex>
                <Flex
                    gap={"5px"}
                    height={"100%"}
                    alignItems={"center"}
                    cursor={"pointer"}
                    borderTop={"1px solid transparent"}
                    _hover={{ borderTopColor: "black" }}
                    // _active={{ borderTopColor: "black" }}
                >
                    <Box fontSize={20}>
                        <BsSuitHeart></BsSuitHeart>
                    </Box>
                    <Text>LIKES</Text>
                </Flex>
            </Flex>
        </>
    );
};

export default ProfileTabs;
