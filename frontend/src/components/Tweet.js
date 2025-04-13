import axios from "axios";
import React from "react";
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from "../redux/tweetSlice";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const likeOrDislikeHandler = async (id) => {
    console.log("Tweet ID:", id);

    try {
      const res = await axios.put(
        `${TWEET_API_END_POINT}/likeordislike/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(getRefresh());

      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);

      console.log(error);
    }
  };

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      console.log(res);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="border-b border-b-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar
            src={
              tweet?.userDetails[0]?.profilePhoto ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            size="40"
            round={true}
          />
          <div className="ml-2 w-full">
            <div className="flex items-center ">
              <h1 className="font-bold">{tweet?.userDetails[0]?.name}</h1>
              <p className="text-gray-500 text-sm ml-1">
                {`${tweet?.userDetails[0].username}   .1m`}
              </p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className="flex justify-between my-3">
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-green-100 rounded-full">
                  <VscComment size={"21px"} />
                </div>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <div
                  onClick={() => likeOrDislikeHandler(tweet?._id)}
                  className="p-2 hover:cursor-pointer hover:bg-pink-200 rounded-full"
                >
                  <CiHeart size={"27px"} />
                </div>

                <p>{tweet?.like?.length}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-yellow-100 rounded-full">
                  <CiBookmark size={"24px"} />
                </div>
                <p>0</p>
              </div>
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
