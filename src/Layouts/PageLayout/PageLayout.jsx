// import { Box, Flex } from "@chakra-ui/react";
// import React from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import { useLocation } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../firebase/firebase";

// const PageLayout = ({ children }) => {
//     const { pathname } = useLocation();
//     const [user, loading, error] = useAuthState(auth);
//     const canRenderSidebar = pathname !== "/auth" && user;
//     return (
//         <>
//             <Flex>
//                 {/* sidebar on the left */}
//                 {canRenderSidebar ? (
//                     <Box w={{ base: 70, md: 240 }}>
//                         <Sidebar />
//                     </Box>
//                 ) : null}

//                 {/* page content on the right */}
//                 <Box
//                     mx={"auto"}
//                     w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
//                 >
//                     {children}
//                 </Box>
//             </Flex>
//         </>
//     );
// };

// export default PageLayout;

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const PageLayout = ({ children }) => {
    const { pathname } = useLocation();
    const authUser = useAuthStore((state) => state.user);
    const profileComplete = useAuthStore((state) => state.profileComplete);
    const canRenderSidebar =
        pathname !== "/auth" &&
        pathname !== "/set-username" &&
        authUser &&
        profileComplete;

    return (
        <>
            <Flex>
                {canRenderSidebar && (
                    <Box w={{ base: 70, md: 240 }}>
                        <Sidebar />
                    </Box>
                )}
                <Box
                    mx={"auto"}
                    w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
                >
                    {children}
                </Box>
            </Flex>
        </>
    );
};

export default PageLayout;
