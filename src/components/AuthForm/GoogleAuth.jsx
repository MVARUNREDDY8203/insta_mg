import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import useGoogleAuth from "../../hooks/useGoogleAuth";

const GoogleAuth = () => {
    const { googleSignIn, loading } = useGoogleAuth();
    return (
        <>
            <Flex
                alignItems={"center"}
                justifyContent={"center"}
                cursor={"pointer"}
                my={5}
            >
                <Image src='./google.png' w={5} alt='google logo'></Image>
                <Text mx={2} color={"blue.500"} onClick={googleSignIn}>
                    Log in with Google
                </Text>
            </Flex>
        </>
    );
};

export default GoogleAuth;
