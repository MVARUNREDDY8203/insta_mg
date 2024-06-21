import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";

const useSignUpWithEmailAndPassword = () => {
    const loginUser = useAuthStore((state) => state.login);
    const showToast = useShowToast();
    const setProfileComplete = useAuthStore(
        (state) => state.setProfileComplete
    );

    const [createUserWithEmailAndPassword, user, loading, error] =
        useCreateUserWithEmailAndPassword(auth);

    const signup = async (email, password) => {
        try {
            const newUser = await createUserWithEmailAndPassword(
                email,
                password
            );
            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: email,
                    username: "",
                    fullname: "",
                    bio: "",
                    profilePicURL: "",
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                loginUser(userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
            }
        } catch (err) {
            // console.error("Error creating user:", err);
            showToast("Error", error.message, "error");
        }
    };

    const setProfile = async (inputs) => {
        try {
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("username", "==", inputs.username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error("Username already exists");
            }

            const fulluserDoc = {
                uid: auth.currentUser.uid,
                email: inputs.email || auth.currentUser.email,
                username: inputs.username,
                fullname: inputs.fullname,
                bio: "",
                profilePicURL: "",
                followers: [],
                following: [],
                posts: [],
                createdAt: Date.now(),
            };

            await setDoc(
                doc(firestore, "users", auth.currentUser.uid),
                fulluserDoc
            );
            useAuthStore.setState({ user: fulluserDoc });
            localStorage.setItem("user-info", JSON.stringify(fulluserDoc));
            setProfileComplete(true);
        } catch (error) {
            // console.error("Error setting profile:", err);
            showToast("Error", error.message, "error");
            throw err;
        }
    };

    return { loading, error, signup, setProfile };
};

export default useSignUpWithEmailAndPassword;
