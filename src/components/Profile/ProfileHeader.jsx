import {
    Avatar,
    Button,
    Flex,
    Text,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import EditProfile from "./EditProfile";
import useFollowUser from "../../hooks/useFollowUser";
import useGetFollowers from "../../hooks/useGetFollowers";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";

const ProfileHeader = () => {
    const { userProfile } = useUserProfileStore();
    const {
        isOpen: isEditProfileOpen,
        onOpen: onOpenEditProfile,
        onClose: onCloseEditProfile,
    } = useDisclosure();
    const {
        isOpen: isFollowerModalOpen,
        onOpen: onOpenFollowerModal,
        onClose: onCloseFollowerModal,
    } = useDisclosure();
    const {
        isOpen: isFollowingModalOpen,
        onOpen: onOpenFollowingModal,
        onClose: onCloseFollowingModal,
    } = useDisclosure();
    const authUser = useAuthStore((state) => state.user);
    const { isUpdating, isFollowing, handleFollowUser } = useFollowUser(
        userProfile?.uid
    );

    const visitingOwnProfileAndAuth =
        authUser && authUser.username === userProfile.username;
    const visitingAnotherProfileAndAuth =
        authUser && authUser.username !== userProfile.username;

    return (
        <>
            <Flex w={"full"} mt={5} mb={"40px"}>
                <Avatar
                    name={userProfile.username}
                    src={userProfile.profilePicURL || null}
                    size={{ base: "xl", md: "2xl" }}
                    mx={{ base: "20px", md: "70px" }}
                    mt={"20px"}
                ></Avatar>
                <VStack
                    w={"full"}
                    id='vstack'
                    alignItems={"flex-start"}
                    mt={"15px"}
                    ml={"10px"}
                >
                    {visitingOwnProfileAndAuth && (
                        <Flex direction={{ base: "column", sm: "row" }}>
                            <Text fontSize={23}>{userProfile.username}</Text>
                            <Button
                                size={{ base: "sm", md: "md" }}
                                ml={{ base: "0px", sm: "10px", md: "40px" }}
                                onClick={onOpenEditProfile}
                            >
                                Edit Profile
                            </Button>
                        </Flex>
                    )}
                    {!visitingOwnProfileAndAuth && (
                        <Flex direction={{ base: "column", sm: "row" }}>
                            <Text fontSize={23}>{userProfile.username}</Text>
                            <Button
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{ bg: "darkblue" }}
                                size={{ base: "sm", md: "md" }}
                                ml={{ base: "0px", sm: "10px", md: "40px" }}
                                onClick={handleFollowUser}
                                isLoading={isUpdating}
                            >
                                {isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        </Flex>
                    )}
                    <Flex
                        gap={{ base: "5px", sm: "10px", md: "25px" }}
                        direction={{ base: "column", sm: "row" }}
                    >
                        <Text>
                            <Text as={"span"} fontWeight={"bold"} mr={"5px"}>
                                {userProfile.posts.length}
                            </Text>
                            Posts
                        </Text>
                        <Text
                            _hover={{ color: "gray", cursor: "pointer" }}
                            onClick={onOpenFollowerModal}
                        >
                            <Text as={"span"} fontWeight={"bold"} mr={"5px"}>
                                {userProfile.followers.length}
                            </Text>
                            Followers
                        </Text>
                        <Text
                            onClick={onOpenFollowingModal}
                            _hover={{ color: "gray", cursor: "pointer" }}
                        >
                            <Text as={"span"} fontWeight={"bold"} mr={"5px"}>
                                {userProfile.following.length}
                            </Text>
                            Following
                        </Text>
                    </Flex>
                    <Text>{userProfile.fullname}</Text>
                    <Text>{userProfile.bio}</Text>
                </VStack>
                {isEditProfileOpen && (
                    <EditProfile
                        isOpen={isEditProfileOpen}
                        onClose={onCloseEditProfile}
                    ></EditProfile>
                )}
                {isFollowerModalOpen && (
                    <FollowersModal
                        isOpen={isFollowerModalOpen}
                        onClose={onCloseFollowerModal}
                    ></FollowersModal>
                )}
                {isFollowingModalOpen && (
                    <FollowingModal
                        isOpen={isFollowingModalOpen}
                        onClose={onCloseFollowingModal}
                    ></FollowingModal>
                )}
            </Flex>
        </>
    );
};

export default ProfileHeader;
