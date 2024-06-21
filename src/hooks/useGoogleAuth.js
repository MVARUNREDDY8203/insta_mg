import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";

const useGoogleAuth = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const loginUser = useAuthStore((state) => state.login);
    const setProfileComplete = useAuthStore(
        (state) => state.setProfileComplete
    );

    const googleSignIn = async () => {
        try {
            const userCred = await signInWithGoogle();
            if (userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid);
                const docSnap = await getDoc(docRef);

                if (!docSnap.exists()) {
                    // If user is new, create a document with default profile data
                    const newUser = {
                        uid: userCred.user.uid,
                        email: userCred.user.email,
                        username: userCred.user.displayName || "",
                        fullname: userCred.user.displayName || "",
                        bio: "",
                        profilePicURL: userCred.user.photoURL || "",
                        followers: [],
                        following: [],
                        posts: [],
                        createdAt: Date.now(),
                    };

                    await setDoc(docRef, newUser);
                    loginUser(newUser);
                    localStorage.setItem("user-info", JSON.stringify(newUser));
                    setProfileComplete(true);
                } else {
                    // If user exists, use the existing data
                    const userData = docSnap.data();
                    loginUser(userData);
                    localStorage.setItem("user-info", JSON.stringify(userData));
                    setProfileComplete(true);
                }
            }
        } catch (error) {
            console.error("Error with Google sign-in:", error.message);
            alert(error.message);
        }
    };

    return { loading, error, googleSignIn };
};

export default useGoogleAuth;
