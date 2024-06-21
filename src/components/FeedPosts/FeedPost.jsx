// import { Box, Container, Image } from "@chakra-ui/react";
// import React from "react";
// import PostHeader from "./PostHeader";
// import PostFooter from "./PostFooter";
// import useGetUserProfileById from "../../hooks/useGetUserProfileById";

// const FeedPost = ({ post }) => {
//     const { userProfile } = useGetUserProfileById(post.createdBy);
//     return (
//         <Container mb={7}>
//             <PostHeader username={userProfile.} avatar={avatar}></PostHeader>
//             <Box overflow={"hidden"} mb={2}>
//                 <Image src={post.imageURL} alt={"FeedPost png"}></Image>
//             </Box>
//             <PostFooter
//                 isProfilePage={true}
//                 creatorProfile={userProfile}
//             ></PostFooter>
//         </Container>
//     );
// };

// export default FeedPost;
import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
    const { userProfile } = useGetUserProfileById(post.createdBy);

    return (
        <>
            <PostHeader post={post} creatorProfile={userProfile} />
            <Box my={2} borderRadius={4} overflow={"hidden"}>
                <Image src={post.imageURL} alt={"FEED POST IMG"} />
            </Box>
            <PostFooter post={post} creatorProfile={userProfile} />
        </>
    );
};

export default FeedPost;
