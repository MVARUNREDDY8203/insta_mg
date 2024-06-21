import React, { useEffect, useState } from "react";
import usePostStore from "../store/postStore";
import useShowToast from "./useShowToast";
import useUserProfileStore from "../store/userProfileStore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);

    useEffect(() => {
        const getPosts = async () => {
            if (!userProfile) return;
            setIsLoading(true);
            setPosts([]);

            try {
                const q = query(
                    collection(firestore, "posts"),
                    where("createdBy", "==", userProfile.uid)
                );
                const querySnapshot = await getDocs(q);
                const fetchedPosts = [];
                querySnapshot.forEach((doc) => {
                    fetchedPosts.push({ ...doc.data(), id: doc.id });
                });
                fetchedPosts.sort((a, b) => b.createdAt - a.createdAt);
                setPosts(fetchedPosts);
            } catch (error) {
                // console.log(error.message);
                showToast("Error", error.message, "error");
                setPosts([]);
            } finally {
                setIsLoading(false);
            }
        };
        getPosts();
    }, [setPosts, userProfile, showToast]);
    return { isLoading, posts };
};

export default useGetUserPosts;
