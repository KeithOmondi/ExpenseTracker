import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();

  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image upload response:", response.data);

    // Adjust this depending on your backend structure
    const imageUrl = response.data?.imageUrl || response.data?.url || "";

    if (!imageUrl) {
      throw new Error("Image URL not found in response");
    }

    return { imageUrl };
  } catch (error) {
    console.error("Error uploading the image:", error.message || error);
    return { imageUrl: "" }; // Safe fallback
  }
};

export default uploadImage;
