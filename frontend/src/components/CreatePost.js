import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT, USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [tweetImage, setTweetImage] = useState(""); // Store uploaded tweet image URL
  const [fileName, setFileName] = useState("No file chosen"); // Display selected file name
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for tweet submission
  const [isLoadingProfile, setIsLoadingProfile] = useState(false); // Loading state for profile fetch
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Ref for file input

  // Fetch user profile (including profile photo)
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id) return;

      setIsLoadingProfile(true);
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/profile/${user._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.user?.profilePhoto) {
          setProfilePhoto(res.data.user.profilePhoto);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile photo.");
      } finally {
        setIsLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [user?._id]);

  // Handle image upload for tweet
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "twitter-clone"); // Replace with your Cloudinary preset
    data.append("cloud_name", "Smash007"); // Replace with your Cloudinary cloud name

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/Smash007/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadImageUrl = await res.json();
      if (uploadImageUrl.secure_url) {
        setTweetImage(uploadImageUrl.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
      setFileName("No file chosen");
      setTweetImage("");
    }
  };

  // Handle tweet submission
  const submitHandler = async () => {
    if (!description.trim() && !tweetImage) {
      toast.error("Please add a description or image to post.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, image: tweetImage, id: user?._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(getRefresh());
        toast.success(res.data.message);
        setDescription(""); // Clear input
        setTweetImage(""); // Clear image
        setFileName("No file chosen"); // Reset file name
        if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
      } else {
        throw new Error(res.data.message || "Failed to create tweet.");
      }
    } catch (error) {
      console.error("Error creating tweet:", error);
      toast.error(error.response?.data?.message || "Failed to create tweet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };

  const followingHandler = () => {
    dispatch(getIsActive(false));
  };

  return (
    <div className="w-full">
      <div>
        {/* Navigation Section */}
        <div className="flex justify-around mb-4 border-b border-gray-200">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } text-center w-full`}
          >
            <h1 className="font-semibold text-gray-600 text-lg cursor-pointer hover:bg-gray-200 p-2">
              For You
            </h1>
          </div>
          <div
            onClick={followingHandler}
            className={`${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } text-center w-full`}
          >
            <h1 className="font-semibold text-gray-600 text-lg cursor-pointer hover:bg-gray-200 p-2">
              Following
            </h1>
          </div>
        </div>

        {/* Tweet Creation Section */}
        <div>
          <div className="flex items-start p-4">
            <div className="flex-shrink-0">
              {isLoadingProfile ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Avatar
                  src={profilePhoto || "./default-avatar.png"}
                  size="40"
                  round={true}
                  onError={() => setProfilePhoto("./default-avatar.png")} // Fallback on error
                />
              )}
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none border border-gray-300 rounded-lg p-2 text-lg ml-2 resize-none"
              rows="3"
              placeholder="What is happening?!"
            />
          </div>

          {/* Image Upload and Preview */}
          <div className="px-4">
            <div className="flex items-center gap-2 mb-2">
              <label
                htmlFor="tweetImage"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer"
              >
                <CiImageOn
                  size="38px"
                  className="p-2 hover:bg-gray-200 rounded-full"
                />
                <span>{fileName}</span>
              </label>
              <input
                id="tweetImage"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              {tweetImage && (
                <button
                  onClick={() => {
                    setTweetImage("");
                    setFileName("No file chosen");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
            {tweetImage && (
              <div className="mb-2">
                <img
                  src={tweetImage}
                  alt="Tweet Preview"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Post Button */}
          <div className="flex items-center justify-end p-4 border-b border-gray-300">
            <button
              onClick={submitHandler}
              disabled={isSubmitting || (!description.trim() && !tweetImage)}
              className={`bg-[#1D9BF0] px-4 text-lg text-white py-1 border-none rounded-full ${
                isSubmitting || (!description.trim() && !tweetImage)
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              } transition flex items-center gap-2`}
            >
              {isSubmitting && (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v2m0 12v2m-8-8H2m18 0h2M5.64 5.64l1.42 1.42m10.36 10.36l1.42 1.42M5.64 18.36l1.42-1.42m10.36-10.36l1.42-1.42"
                  />
                </svg>
              )}
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
