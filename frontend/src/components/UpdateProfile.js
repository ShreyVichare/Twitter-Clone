import React, { useState, useEffect } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export const UpdateProfile = () => {
  const { profile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: userId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    profilePhoto: "",
    coverPhoto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with profile data
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        username: profile.username || "",
        bio: profile.bio || "",
        profilePhoto: profile.profilePhoto || "",
        coverPhoto: profile.coverPhoto || "",
      });
    }
  }, [profile]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle Cloudinary file upload
  const handleFileUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "twitter-clone");
    data.append("cloud_name", "Smash007");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/Smash007/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error("Network error during image upload.");
      }
      const uploadImageUrl = await res.json();
      if (uploadImageUrl.secure_url) {
        setFormData((prev) => ({
          ...prev,
          [field]: uploadImageUrl.secure_url,
        }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Failed to upload image.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.put(
        `${USER_API_END_POINT}/profile/update/${userId}`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getMyProfile(res.data.user));
        toast.success("Profile updated successfully!");
        navigate(`/profile/${userId}`);
      } else {
        throw new Error(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!profile) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[50%]  p-6 bg-white shadow-md rounded-lg mt-0">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(`/profile/${userId}`)}
          className="p-2 rounded-full hover:bg-gray-100 flex items-center"
        >
          <IoMdArrowBack size={24} />
          <span className="ml-2 text-blue-500 hover:underline">Back</span>
        </button>
      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write something about yourself"
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="profilePhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Photo
          </label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "profilePhoto")}
            className="mt-1 block w-full text-gray-700"
          />
          {formData.profilePhoto && (
            <img
              src={formData.profilePhoto}
              alt="Profile Preview"
              className="mt-2 w-20 h-20 rounded-full object-cover"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="coverPhoto"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Photo
          </label>
          <input
            type="file"
            id="coverPhoto"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "coverPhoto")}
            className="mt-1 block w-full text-gray-700"
          />
          {formData.coverPhoto && (
            <img
              src={formData.coverPhoto}
              alt="Cover Preview"
              className="mt-2 w-full h-40 rounded-lg object-cover"
            />
          )}
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-2 px-4 rounded-md text-white ${
              isSubmitting
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/profile/${userId}`)}
            className="flex-1 py-2 px-4 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
