import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiFillHome, AiOutlineMessage } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Chats = () => {
    return (
        <Tooltip
            hasArrow
            label={"Chats"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/chats"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                _hover={{ bg: "gray.100" }}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <AiOutlineMessage size={25}></AiOutlineMessage>
                <Box display={{ base: "none", md: "block" }}>Chats</Box>
            </Link>
        </Tooltip>
    );
};

export default Chats;
