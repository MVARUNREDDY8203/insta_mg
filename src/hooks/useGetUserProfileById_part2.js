import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById_part2 = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);

    const showToast = useShowToast();

    const getUserProfile = async (userId) => {
        setIsLoading(true);
        setUserProfile(null);
        try {
            const userRef = await getDoc(doc(firestore, "users", userId));
            if (userRef.exists()) {
                setUserProfile(userRef.data());
            }
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };
    getUserProfile();

    return { isLoading, userProfile, getUserProfile };
};

export default useGetUserProfileById_part2;
