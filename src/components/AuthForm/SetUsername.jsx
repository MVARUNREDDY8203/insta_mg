import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Container,
    Flex,
    Image,
    Input,
    VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";
import useShowToast from "../../hooks/useShowToast";

const SetUsername = () => {
    const [inputs, setInputs] = useState({ fullname: "", username: "" });
    const { loading, error, setProfile } = useSignUpWithEmailAndPassword();
    const navigate = useNavigate();
    const showToast = useShowToast();

    const handleSetProfile = async () => {
        try {
            await setProfile(inputs);
            navigate("/");
        } catch (err) {
            // console.error("Error setting profile:", err);
            showToast("Error", error.message, "error");
        }
    };

    return (
        <>
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
                            <Box border={"1px solid gray"} padding={5}>
                                <VStack spacing={4}>
                                    {/* Instagram text Img */}
                                    <Image
                                        width={"300px"}
                                        src='./instagram_text.png'
                                        alt='Instagram logo'
                                    />
                                    {/* login / signup */}

                                    <>
                                        <Input
                                            placeholder='Full name'
                                            fontSize={14}
                                            type='text'
                                            value={inputs.fullname}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    fullname: e.target.value,
                                                })
                                            }
                                        />
                                        <Input
                                            placeholder='Username'
                                            fontSize={14}
                                            type='text'
                                            value={inputs.username}
                                            onChange={(e) =>
                                                setInputs({
                                                    ...inputs,
                                                    username: e.target.value,
                                                })
                                            }
                                        />
                                        {error && (
                                            <Alert status='error'>
                                                <AlertIcon />
                                                {error.message}
                                            </Alert>
                                        )}
                                        <Button
                                            mt={10}
                                            colorScheme='blue'
                                            fontSize={14}
                                            width={"full"}
                                            size={"sm"}
                                            isLoading={loading}
                                            onClick={handleSetProfile}
                                        >
                                            Set Username
                                        </Button>
                                    </>
                                </VStack>
                            </Box>
                        </VStack>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default SetUsername;
