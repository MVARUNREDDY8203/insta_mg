import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
const useLogOut = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const showToast = useShowToast();
    const logoutUser = useAuthStore((state) => state.logout);
    const handleLogOut = async () => {
        try {
            await signOut();
            localStorage.removeItem("user-info");
            showToast("Success", "Logged out successfully", "success");
            logoutUser();
        } catch (error) {
            console.log(error.message);
        }
    };
    return { handleLogOut, loading, error };
};

export default useLogOut;
