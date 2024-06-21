import { useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import useShowToast from "./useShowToast";

const usePreviewImg = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const showToast = useShowToast();
    const maxFileSizeInBytes = 7 * 1024 * 1024;

    const handleImageChange = (e) => {
        // console.log("Triggered");
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                showToast("Error", "File must be less than 7 MB", "error");
                console.log("max limit");
                setSelectedFile(null);
                return;
            }

            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };

            reader.readAsDataURL(file);
        } else {
            showToast("Error", "Please select an Image File", "error");
            setSelectedFile(null);
        }
    };
    return { selectedFile, handleImageChange, setSelectedFile };
};

export default usePreviewImg;
