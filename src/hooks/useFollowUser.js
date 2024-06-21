import React, { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import useAuthStore from "../store/authStore";
import useUserProfileStore from "../store/userProfileStore";
import { firestore } from "../firebase/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

const useFollowUser = (userId) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const { userProfile, setUserProfile } = useUserProfileStore();
    const showToast = useShowToast();

    const handleFollowUser = async () => {
        setIsUpdating(true);
        try {
            const currentUserRef = doc(firestore, "users", authUser.uid);
            const userToFollowOrUnfollow = doc(firestore, "users", userId);
            // console.log("trigger");

            await updateDoc(currentUserRef, {
                following: isFollowing
                    ? arrayRemove(userId)
                    : arrayUnion(userId),
            });
            await updateDoc(userToFollowOrUnfollow, {
                followers: isFollowing
                    ? arrayRemove(authUser.uid)
                    : arrayUnion(authUser.uid),
            });

            if (isFollowing && userProfile) {
                // unfollow
                //If uid (current user ID in the list) is not equal to userId (the user being unfollowed), it keeps that uid in the filtered list.
                setAuthUser({
                    ...authUser,
                    following: authUser.following.filter(
                        (uid) => uid !== userId
                    ),
                });
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter(
                        (uid) => uid !== authUser.uid
                    ),
                });
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: authUser.following.filter(
                            (uid) => uid != userId
                        ),
                    })
                );
                setIsFollowing(false);
            } else {
                // follow
                setAuthUser({
                    ...authUser,
                    following: [...authUser.following, userId],
                });
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, authUser.uid],
                });
                localStorage.setItem(
                    "user-info",
                    JSON.stringify({
                        ...authUser,
                        following: [...authUser.following, userId],
                    })
                );
                setIsFollowing(true);
            }
        } catch (error) {
            console.log(error.message);
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (authUser && userId) {
            const followingOrNot = authUser.following.includes(userId);
            setIsFollowing(followingOrNot);
        }
    }, [authUser, userId]);

    return { isUpdating, isFollowing, handleFollowUser };
};

export default useFollowUser;
