import { Box, Link, Tooltip } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
    return (
        <Tooltip
            hasArrow
            label={"Home"}
            placement='right'
            ml={1}
            openDelay={500}
            display={{ base: "block", md: "none" }}
        >
            <Link
                display={"flex"}
                to={"/"}
                as={RouterLink}
                alignItems={"center"}
                gap={4}
                borderRadius={6}
                p={2}
                w={{ base: 10, md: "full" }}
                _hover={{ bg: "gray.100" }}
                justifyContent={{ base: "center", md: "flex-start" }}
            >
                <AiOutlineHome size={25} />
                <Box display={{ base: "none", md: "block" }}>Home</Box>
            </Link>
        </Tooltip>
    );
};

export default Home;
