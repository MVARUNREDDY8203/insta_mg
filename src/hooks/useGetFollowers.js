import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";

const useGetFollowers = () => {
    const [isLoadingFollowers, setIsLoading] = useState(false);
    const [followers, setFollowers] = useState([]);
    // const authUser = useAuthStore((state) => state.user);
    const userProfile = useUserProfileStore((state) => state.userProfile);
    const showToast = useShowToast();

    useEffect(() => {
        const getFollowers = async () => {
            setIsLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const q = query(
                    usersRef,
                    where("uid", "in", userProfile.followers)
                );
                const querySnapshot = await getDocs(q);
                const users = [];

                querySnapshot.forEach((doc) => {
                    users.push({ ...doc.data(), id: doc.id });
                });
                setFollowers(users);
            } catch (error) {
                // console.log(error.message);
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };
        if (userProfile && userProfile.followers.length > 0) getFollowers();
    }, [userProfile, showToast]);

    return { isLoadingFollowers, followers };
};

export default useGetFollowers;
