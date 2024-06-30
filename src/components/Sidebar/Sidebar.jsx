import { Avatar, Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import React from "react";
import { Router, Link as RouterLink } from "react-router-dom";
import {
    CreatePostLogo,
    InstagramLogo,
    InstagramMobileLogo,
    NotificationsLogo,
    SearchLogo,
} from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import useLogOut from "../../hooks/useLogOut";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
    const { handleLogOut, loading, error } = useLogOut();

    return (
        <>
            <Box
                height={"100vh"}
                borderRight={"1px solid"}
                borderColor={"gray"}
                py={8}
                position={"sticky"}
                top={0}
                left={0}
                px={{ base: 2, md: 4 }}
                w={"100%"}
            >
                <Flex
                    direction={"column"}
                    gap={10}
                    w={"100%"}
                    height={"full"}
                    id='test'
                    alignItems={"center"}
                >
                    <Link
                        to={"/"}
                        as={RouterLink}
                        pl={2}
                        display={{ base: "none", md: "block" }}
                        cursor={"pointer"}
                    >
                        <InstagramLogo />
                    </Link>
                    <Link
                        to={"/"}
                        as={RouterLink}
                        p={2}
                        display={{ base: "block", md: "none" }}
                        cursor={"pointer"}
                        borderRadius={6}
                        _hover={{
                            bg: "whiteAlpha.200",
                        }}
                        w={10}
                    >
                        <InstagramMobileLogo />
                    </Link>
                    <Flex
                        direction={"column"}
                        gap={5}
                        cursor={"pointer"}
                        w={"100%"}
                    >
                        <SidebarItems />
                    </Flex>
                    <Flex
                        onClick={handleLogOut}
                        direction={"column"}
                        gap={"5"}
                        cursor={"pointer"}
                        alignItems={{ base: "center", md: "start" }}
                        justifyContent={"left"}
                        w={"100%"}
                        mt={"auto"}
                        borderRadius={6}
                        _hover={{ bg: "gray.100" }}
                    >
                        <Tooltip
                            hasArrow
                            label={"Logout"}
                            placement='right'
                            ml={30}
                            openDelay={500} // ms
                            display={{ base: "block", md: "none" }}
                        >
                            <Flex
                                alignItems={"center"}
                                justifyContent={"center"}
                                gap={4}
                                borderRadius={6}
                                p={2}
                                w={10}
                                _hover={{
                                    textDecoration: "none",
                                    bg: "gray.100",
                                }}
                                style={{
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <Flex
                                    w={"100%"}
                                    alignItems={"center"}
                                    justifyContent={"left"}
                                    gap={10}
                                >
                                    <Box>
                                        <BiLogOut></BiLogOut>
                                    </Box>

                                    <Box
                                        display={{
                                            base: "none",
                                            md: "block",
                                        }}
                                    >
                                        {"Logout"}
                                    </Box>
                                </Flex>
                            </Flex>
                        </Tooltip>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};

export default Sidebar;
