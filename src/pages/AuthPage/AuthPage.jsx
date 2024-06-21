import React from "react";
import { Flex, Container, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";
const AuthPage = () => {
    return (
        <Flex
            minH={"100vh"}
            justifyContent={"center"}
            alignItems={"center"}
            px={4}
        >
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"}>
                    {/* INSTAGRAM PHONE IMAGE */}
                    <Box display={{ base: "none", md: "block" }}>
                        <Image
                            src='./auth.png'
                            height={600}
                            alt='phone_with_instagram_screen'
                        />
                    </Box>
                    {/* THE LOGIN/SIGNUP FORM */}
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    );
};

export default AuthPage;
