import React, { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT, TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]); // State to store user's tweets

  useGetProfile(id);

  // Fetch user's tweets
  useEffect(() => {
    const fetchUserTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_END_POINT}/getowntweet/${id}`,
          {
            withCredentials: true,
          }
        );
        setTweets(res.data.tweets); // Assuming the API returns tweets in `res.data.tweets`
      } catch (error) {
        console.error("Error fetching user tweets:", error);
        toast.error("Failed to load tweets.");
      }
    };

    if (id) {
      fetchUserTweets();
    }
  }, [id]);

  const followAndUnfollowHandler = async () => {
    if (user.following.includes(id)) {
      // Unfollow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, {
          id: user._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      // Follow
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {
          id: user._id,
        });
        dispatch(followingUpdate(id));
        dispatch(getRefresh());
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div className="border-b border-gray-200 relative">
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            <IoMdArrowBack size={"24px"} />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
          </div>
        </div>
        <img
          src={profile?.coverPhoto}
          alt="banner"
          className="h-[250px] w-full object-cover"
        />
        <div className="absolute ml-2 top-52 border-4 border-white rounded-full">
          <Avatar src={profile?.profilePhoto} size="120" round={true} />
        </div>
        <div className="text-right m-4 ">
          {profile?._id === user?._id ? (
            <Link to={`/profile/update/${user._id}`}>
              <button className="px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400">
                Edit Profile
              </button>
            </Link>
          ) : (
            <button
              onClick={followAndUnfollowHandler}
              className="px-4 py-1 bg-black text-white rounded-full border border-gray-400"
            >
              {user.following.includes(id) ? "Following" : "Follow"}
            </button>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div className="m-4 text-sm">
          <p>{profile?.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
