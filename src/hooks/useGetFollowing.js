import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";

const useGetFollowing = () => {
    const [isLoadingFollowing, setIsLoading] = useState(false);
    const [following, setFollowing] = useState([]);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const showToast = useShowToast();

    useEffect(() => {
        const getFollowing = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const q = query(
                    usersRef,
                    where("uid", "in", userProfile.following)
                );
                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });
                setFollowing(users);
            } catch (error) {
                // console.log(error.message);
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        if (userProfile && userProfile.following.length > 0) getFollowing();
    }, [userProfile, showToast]);

    return { isLoadingFollowing, following };
};

export default useGetFollowing;
