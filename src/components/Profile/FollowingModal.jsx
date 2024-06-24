import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Spinner,
} from "@chakra-ui/react";
import SuggestedUser from "../SuggestedPosts/SuggestedUser";
import useGetFollowers from "../../hooks/useGetFollowers";
import useGetFollowing from "../../hooks/useGetFollowing";

const FollowingModal = ({ isOpen, onClose }) => {
    const { following, isLoadingFollowing } = useGetFollowing();
    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"white"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Following</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex
                        mb={4}
                        gap={4}
                        flexDir={"column"}
                        maxH={"250px"}
                        overflowY={"auto"}
                    >
                        {isLoadingFollowing && (
                            <>
                                <Flex justifyContent={"center"}>
                                    <Spinner></Spinner>
                                </Flex>
                            </>
                        )}
                        {!isLoadingFollowing &&
                            following.map((followee) => (
                                <SuggestedUser
                                    user={followee}
                                    key={followee.id}
                                />
                            ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FollowingModal;
