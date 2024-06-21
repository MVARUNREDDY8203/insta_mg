import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useLogin = () => {
    const [signInWithEmailAndPassword, user, loading, error] =
        useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    const showToast = useShowToast();
    const setProfileComplete = useAuthStore(
        (state) => state.setProfileComplete
    );

    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            alert("Please fill in all the fields.");
            return;
        }
        try {
            const userCred = await signInWithEmailAndPassword(
                inputs.email,
                inputs.password
            );
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    localStorage.setItem("user-info", JSON.stringify(userData));
                    loginUser(userData);
                    setProfileComplete(true); // Set profile complete
                } else {
                    console.error("No such document!");
                }
            }
        } catch (error) {
            // console.error("Error signing in:", error.message);
            showToast("Error", error.message, "error");
            alert(error.message);
        }
    };

    return { loading, error, login };
};

export default useLogin;
