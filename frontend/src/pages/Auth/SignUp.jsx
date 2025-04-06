import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";

import { UserContext } from "../../context/userContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!fullName) return setError("Please enter your name");
    if (!validateEmail(email)) return setError("Please enter a valid email");
    if (!password) return setError("Please enter a valid password");
    setError(null);

    try {
      let profileImageUrl = "";

      // Upload image if one is selected
      if (profilePic) {
        if (!profilePic.type.startsWith("image/")) {
          setError("Only image files are allowed.");
          return;
        }

        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      // Register user
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      // Save token and update context
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-900 text-center">Create an Account</h3>
        <p className="text-gray-600 text-center mb-6">Please provide your details below</p>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSignUp} className="space-y-4">
          <ProfilePhotoSelector setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              required
              label="Full Name"
              type="text"
              placeholder="Margaret Mwakima"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              required
              label="Email Address"
              type="email"
              placeholder="mwakima@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Input
            required
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-primary font-medium cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
