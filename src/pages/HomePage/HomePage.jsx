import { Box, Container, Flex } from "@chakra-ui/react";
import React from "react";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import SuggestedUsers from "../../components/SuggestedPosts/SuggestedUsers";

const HomePage = () => {
    return (
        <>
            <Container maxW='container.lg'>
                <Flex gap={30}>
                    <Box flex={2} py={10} px={2}>
                        <FeedPosts />
                    </Box>
                    <Box
                        flex={3}
                        display={{ base: "none", md: "block" }}
                        mr={"20px"}
                        maxW={"300px"}
                    >
                        <SuggestedUsers></SuggestedUsers>
                    </Box>
                </Flex>
            </Container>
        </>
    );
};

export default HomePage;
