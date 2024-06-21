// import { Avatar, Flex, Link, Text } from "@chakra-ui/react";
// import React from "react";
// import { Link as RouterLink } from "react-router-dom";

// const SuggestedHeader = ({ username, avatar }) => {
//     return (
//         <>
//             <Flex
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//                 w={"100%"}
//             >
//                 <Flex gap={"10px"} alignItems={"center"}>
//                     <Avatar src={avatar} size='md' name={username}></Avatar>
//                     <Text fontWeight={"bold"} alignItems={"center"}>
//                         {"username"}
//                     </Text>
//                 </Flex>
//                 <Link
//                     to={"/auth"}
//                     as={RouterLink}
//                     _hover={{ textDecoration: "none" }}
//                 >
//                     <Text
//                         fontWeight={"600"}
//                         color={"blue.400"}
//                         transition={"0.2s ease-in-out"}
//                         _hover={{ color: "darkblue" }}
//                         cursor={"pointer"}
//                     >
//                         Logout
//                     </Text>
//                 </Link>
//             </Flex>
//         </>
//     );
// };

// export default SuggestedHeader;
import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import { Link } from "react-router-dom";
import useLogOut from "../../hooks/useLogOut";

const SuggestedHeader = () => {
    const { handleLogOut, loading } = useLogOut();
    const authUser = useAuthStore((state) => state.user);

    if (!authUser) return null;

    return (
        <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
            <Flex alignItems={"center"} gap={2}>
                <Link to={`${authUser.username}`}>
                    <Avatar size={"md"} src={authUser.profilePicURL} />
                </Link>
                <Link to={`${authUser.username}`}>
                    <Text fontSize={12} fontWeight={"bold"}>
                        {authUser.username}
                    </Text>
                </Link>
            </Flex>
            <Button
                size={"xs"}
                background={"transparent"}
                _hover={{ background: "transparent" }}
                fontSize={14}
                fontWeight={"medium"}
                color={"blue.400"}
                onClick={handleLogOut}
                isLoading={loading}
                cursor={"pointer"}
            >
                Log out
            </Button>
        </Flex>
    );
};

export default SuggestedHeader;
