import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";
const CreatePost = () => {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const { isActive } = useSelector((store) => store.tweet);
  const dispatch = useDispatch();
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/create`,
        { description, id: user?._id },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
    }

    setDescription("");
  };

  const forYouHandler = () => {
    dispatch(getIsActive(true));
  };
  const followingHandler = () => {
    dispatch(getIsActive(false));
  };
  return (
    <div className="w-full">
      <div className="">
        {/* Navigation Section */}
        <div className="flex  justify-around mb-4 border-b border-gray-200 ">
          <div
            onClick={forYouHandler}
            className={`${
              isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } text-center w-full`}
          >
            <h1 className="font-semibold text-gray-600 text-lg cursor-pointer hover:bg-gray-200  p-2 ">
              For You
            </h1>
          </div>
          <div
            onClick={followingHandler}
            className={` ${
              !isActive
                ? "border-b-4 border-blue-600"
                : "border-b-4 border-transparent"
            } text-center w-full`}
          >
            <h1 className="font-semibold text-gray-600 text-lg cursor-pointer hover:bg-gray-200  p-2">
              Following
            </h1>
          </div>
        </div>
        <div className="">
          <div className="flex item-center p-4">
            <div>
              <Avatar src="./pfp2.webp" size="40" round={true} />
            </div>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none  border-none text-lg ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div className="items-center">
              <CiImageOn
                size={"38px"}
                className="hover:bg-slate-200 rounded-full hover:cursor-pointer p-2"
              />
            </div>
            <div className=" ">
              <button
                onClick={submitHandler}
                className=" bg-[#1D9BF0] px-4 text-lg text-white  py-1 border border-none rounded-full "
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
