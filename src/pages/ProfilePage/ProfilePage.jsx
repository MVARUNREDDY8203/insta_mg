import {
    Container,
    Flex,
    Link,
    Skeleton,
    SkeletonCircle,
    Text,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";
import ProfilePosts from "../../components/Profile/ProfilePosts";
import { useParams } from "react-router-dom";
import useUserProfileStore from "../../store/userProfileStore";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { Link as RouterLink } from "react-router-dom";
const ProfilePage = () => {
    const { username } = useParams();
    const { loading, userProfile } = useGetUserProfileByUsername(username);

    const userNotFound = !loading && !userProfile;
    if (userNotFound) return <UserNotFound></UserNotFound>;
    return (
        <>
            <Container maxW={"container.lg"} py={5}>
                <Flex w={"100%"}>
                    {!loading && userProfile && <ProfileHeader></ProfileHeader>}
                    {loading && <ProfileHeaderSkeleton></ProfileHeaderSkeleton>}
                </Flex>
                <Flex direction={"column"}>
                    <ProfileTabs></ProfileTabs>
                    <ProfilePosts></ProfilePosts>
                </Flex>
            </Container>
        </>
    );
};

export default ProfilePage;

const ProfileHeaderSkeleton = () => {
    return (
        <Flex
            alignItems={"center"}
            justifyContent={"center"}
            mb={10}
            ml={10}
            mt={10}
        >
            <SkeletonCircle size={20}></SkeletonCircle>

            <VStack mx={"auto"} ml={10}>
                <Skeleton height={"12px"} w={"250px"}></Skeleton>
                <Skeleton height={"12px"} w={"250px"}></Skeleton>
                <Skeleton height={"12px"} w={"250px"}></Skeleton>
            </VStack>
        </Flex>
    );
};

const UserNotFound = () => {
    return (
        <>
            <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
                <Text fontSize={"2xl"}>User Not Found</Text>
                <Link
                    as={RouterLink}
                    to={"/"}
                    color={"blue.500"}
                    mx={"auto"}
                    w={"max-content"}
                >
                    Go Home
                </Link>
            </Flex>
        </>
    );
};
