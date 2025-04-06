import React, { useState, useRef } from "react";
import { LuUpload, LuUser, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Fix: Changed `files(0)` to `files[0]`
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center">
      {/* Image Preview */}
      <div className="relative w-32 h-32 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center overflow-hidden">
        {previewUrl ? (
          <img src={previewUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
        ) : (
          <LuUser className="text-gray-400 text-6xl" />
        )}
      </div>

      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={onChooseFile}
        className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <LuUpload /> Upload Photo
      </button>

      {/* Remove Button */}
      {previewUrl && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="mt-2 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          <LuTrash /> Remove Photo
        </button>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
