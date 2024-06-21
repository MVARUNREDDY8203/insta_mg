import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleAuth from "./GoogleAuth";

const AuthForm = () => {
    const [login, setLogin] = useState(true);

    return (
        <>
            <Box border={"1px solid gray"} padding={5}>
                <VStack spacing={4}>
                    {/* Instagram text Img */}
                    <Image
                        width={"300px"}
                        src='./instagram_text.png'
                        alt='Instagram logo'
                    />
                    {/* login / signup */}

                    {login ? (
                        <>
                            <Login></Login>
                            <Flex>
                                <Text>Don't have an account ? </Text>
                                <Text
                                    onClick={() => setLogin(false)}
                                    color={"blue.400"}
                                    cursor={"pointer"}
                                    ml={3}
                                >
                                    Sign Up
                                </Text>
                            </Flex>
                        </>
                    ) : (
                        <>
                            <SignUp></SignUp>
                            <Flex>
                                <Text>Already have an account ? </Text>
                                <Text
                                    onClick={() => setLogin(true)}
                                    color={"blue.400"}
                                    cursor={"pointer"}
                                    ml={3}
                                >
                                    Log in
                                </Text>
                            </Flex>
                        </>
                    )}
                </VStack>
                {/* or line */}
                <Flex alignItems={"center"} mt={5}>
                    <Box h={"1px"} flex={2} bg={"gray.400"}></Box>
                    <Text mx={2}>OR</Text>
                    <Box h={"1px"} flex={2} bg={"gray.400"}></Box>
                </Flex>
                {/* google auth component */}
                <GoogleAuth></GoogleAuth>
            </Box>
        </>
    );
};

export default AuthForm;
