import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [imageError, setImageError] = useState(false); // Track if the image fails to load

  // Handle like or dislike
  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/likeordislike/${id}`,
        { id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error in likeOrDislikeHandler:", error);
      toast.error(
        error.response?.data?.message || "Failed to like/dislike tweet."
      );
    }
  };

  // Handle tweet deletion
  const deleteTweetHandler = async (id) => {
    try {
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`, {
        withCredentials: true,
      });
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error in deleteTweetHandler:", error);
      toast.error(error.response?.data?.message || "Failed to delete tweet.");
    }
  };

  return (
    <div className="border-b border-b-gray-200">
      <div>
        <div className="flex p-4">
          {/* User Avatar */}
          <Avatar
            src={
              tweet?.userDetails?.[0]?.profilePhoto ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            size="40"
            round={true}
            onError={() => {
              console.log("Avatar failed to load, using fallback.");
              return true; // Use fallback image
            }}
          />
          <div className="ml-2 w-full">
            {/* User Info */}
            <div className="flex items-center">
              <h1 className="font-bold">
                {tweet?.userDetails?.[0]?.name || "Unknown User"}
              </h1>
              <p className="text-gray-500 text-sm ml-1">
                @{tweet?.userDetails?.[0]?.username || "unknown"} · 1m
              </p>
            </div>
            {/* Tweet Description */}
            <div>
              <p>{tweet?.description || "No description available."}</p>
            </div>
            {/* Tweet Image */}
            {tweet?.image && !imageError && (
              <div className="my-3">
                <img
                  src={tweet.image}
                  alt="Tweet"
                  className="w-full rounded-lg object-cover"
                  onError={() => {
                    console.error("Tweet image failed to load:", tweet.image);
                    setImageError(true); // Hide image if it fails to load
                  }}
                />
              </div>
            )}
            {imageError && tweet?.image && (
              <p className="text-red-500 text-sm my-3">Failed to load image.</p>
            )}
            {/* Tweet Actions */}
            <div className="flex justify-between my-3">
              {/* Comment */}
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-green-100 rounded-full">
                  <VscComment size={"21px"} />
                </div>
                <p>0</p>
              </div>
              {/* Like */}
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:cursor-pointer hover:bg-pink-200 rounded-full"
                >
                  <CiHeart size={"27px"} />
                </div>
                <p>{tweet?.like?.length || 0}</p>
              </div>
              {/* Bookmark */}
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-yellow-100 rounded-full">
                  <CiBookmark size={"24px"} />
                </div>
                <p>0</p>
              </div>
              {/* Delete (only for the tweet owner) */}
              {user?._id === tweet?.userId && (
                <div
                  onClick={() => deleteTweetHandler(tweet?._id)}
                  className="flex items-center"
                >
                  <div className="p-2 hover:cursor-pointer hover:bg-red-500 rounded-full">
                    <MdOutlineDeleteOutline size={"24px"} />
                  </div>
                  <p>0</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
