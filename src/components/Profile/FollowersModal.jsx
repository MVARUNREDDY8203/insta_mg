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

const FollowersModal = ({ isOpen, onClose }) => {
    const { isLoadingFollowers, followers } = useGetFollowers();
    return (
        <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
            <ModalOverlay />
            <ModalContent bg={"white"} border={"1px solid gray"} maxW={"400px"}>
                <ModalHeader>Followers</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex
                        mb={4}
                        gap={4}
                        flexDir={"column"}
                        maxH={"250px"}
                        overflowY={"auto"}
                    >
                        {isLoadingFollowers && (
                            <>
                                <Flex justifyContent={"center"}>
                                    <Spinner></Spinner>
                                </Flex>
                            </>
                        )}
                        {!isLoadingFollowers &&
                            followers.map((follower) => (
                                <SuggestedUser
                                    user={follower}
                                    key={follower.id}
                                />
                            ))}
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FollowersModal;
