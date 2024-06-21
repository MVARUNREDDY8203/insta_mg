// import { Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
// import AuthPage from "./pages/AuthPage/AuthPage";
// import PageLayout from "./Layouts/PageLayout/PageLayout";
// import ProfilePage from "./pages/ProfilePage/ProfilePage";
// import useAuthStore from "./store/authStore";
// function App() {
//     const authUser = useAuthStore((state) => state.user);

//     return (
//         <PageLayout>
//             <Routes>
//                 <Route
//                     path='/'
//                     element={
//                         authUser ? <HomePage /> : <Navigate to={"/auth"} />
//                     }
//                 />
//                 <Route
//                     path='/auth'
//                     element={!authUser ? <AuthPage /> : <Navigate to={"/"} />}
//                 />
//                 <Route
//                     path='/:username'
//                     element={
//                         authUser ? <ProfilePage /> : <Navigate to={"/auth"} />
//                     }
//                 />
//             </Routes>
//         </PageLayout>
//     );
// }

// export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
// import SetUsername from "./pages/SetUsername/SetUsername";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import useAuthStore from "./store/authStore";
import SetUsername from "./components/AuthForm/SetUsername";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
function App() {
    const authUser = useAuthStore((state) => state.user);
    const profileComplete = useAuthStore((state) => state.profileComplete);

    return (
        <PageLayout>
            <Routes>
                <Route
                    path='/'
                    element={
                        authUser ? (
                            profileComplete ? (
                                <HomePage />
                            ) : (
                                <Navigate to={"/set-username"} />
                            )
                        ) : (
                            <Navigate to={"/auth"} />
                        )
                    }
                />
                <Route
                    path='/auth'
                    element={
                        !authUser ? (
                            <AuthPage />
                        ) : (
                            <Navigate
                                to={profileComplete ? "/" : "/set-username"}
                            />
                        )
                    }
                />
                <Route
                    path='/set-username'
                    element={
                        authUser && !profileComplete ? (
                            <SetUsername />
                        ) : (
                            <Navigate to={"/"} />
                        )
                    }
                />
                <Route
                    path='/:username'
                    element={
                        authUser ? (
                            profileComplete ? (
                                <ProfilePage />
                            ) : (
                                <Navigate to={"/set-username"} />
                            )
                        ) : (
                            <Navigate to={"/auth"} />
                        )
                    }
                />
            </Routes>
        </PageLayout>
    );
}

export default App;
