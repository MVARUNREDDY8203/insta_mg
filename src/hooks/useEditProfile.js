import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { firestore, storage } from "../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
    collection,
    doc,
    getDocs,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import useUserProfileStore from "../store/userProfileStore";
import { useToast } from "@chakra-ui/react";

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const setAuthUser = useAuthStore((state) => state.setUser);
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const editProfile = async (inputs, selectedFile) => {
        if (!authUser || isUpdating) return;

        setIsUpdating(true);
        const storageRef = ref(storage, `profilePics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);

        let URL = "";
        try {
            // check if the username already exists
            const usersRef = collection(firestore, "users");
            const q = query(usersRef, where("username", "==", inputs.username));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error("Username already exists");
            }

            // selected image processing

            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(
                    ref(storage, `profilePics/${authUser.uid}`)
                );
            }
            const updatedUser = {
                ...authUser,
                fullname: inputs.fullname || authUser.fullname,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL || authUser.profilePicURL,
            };

            await updateDoc(userDocRef, updatedUser);
            localStorage.setItem("user-info", JSON.stringify(updatedUser));
            setAuthUser(updatedUser);
            setUserProfile(updatedUser);
            showToast("Success", "Profile Updated Successfully", "success");
        } catch (error) {
            // console.log(error.message);
            showToast("Error", error.message, "error");
        }
    };
    return { editProfile, isUpdating };
};

export default useEditProfile;
