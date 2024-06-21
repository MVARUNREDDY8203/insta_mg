import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import useUserProfileStore from "../store/userProfileStore";
import useShowToast from "./useShowToast";
import { firestore } from "../firebase/firebase";

const useGetUserProfileByUsername = (username) => {
    const [loading, setLoading] = useState(true);
    const showToast = useShowToast();
    const { userProfile, setUserProfile } = useUserProfileStore();
    useEffect(() => {
        const getUserProfile = async () => {
            setLoading(true);
            try {
                const usersRef = collection(firestore, "users");
                const q = query(usersRef, where("username", "==", username));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) setUserProfile(null);

                let userDoc;
                querySnapshot.forEach((doc) => {
                    userDoc = doc.data();
                });

                setUserProfile(userDoc);
                // console.log(userDoc);
            } catch (error) {
                showToast("Error", error.message, "error");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        getUserProfile();
    }, [setUserProfile, username]);

    return { loading, userProfile };
};

export default useGetUserProfileByUsername;
