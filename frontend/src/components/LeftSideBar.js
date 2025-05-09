import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";
import { getAllTweets } from "../redux/tweetSlice";

const LeftSideBar = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      dispatch(getUser(null));
      dispatch(getOtherUsers(null));
      dispatch(getMyProfile(null));
      dispatch(getAllTweets(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[20%] mt-4">
      <div>
        <div>
          <img
            width={"70px"}
            className="ml-4"
            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?t=st=1744643182~exp=1744646782~hmac=8a5d845ef33aa5434b3d918dad2cc07a95bbdf5e7ad6c2715675ddfb1b100cf1&w=826"
            alt="twitter-logo new"
          />
        </div>
        <div className="my-4">
          <Link
            to="/"
            className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full"
          >
            <div>
              <CiHome size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Home</h1>
          </Link>
          <div className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full">
            <div>
              <CiHashtag size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Explore</h1>
          </div>
          <div className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full">
            <div>
              <IoIosNotificationsOutline size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Notifications</h1>
          </div>
          <Link
            to={`/profile/${user?._id}`}
            className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full"
          >
            <div>
              <CiUser size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Profile</h1>
          </Link>
          <div className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full">
            <div>
              <CiBookmark size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Bookmarks</h1>
          </div>
          <div
            onClick={logoutHandler}
            className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full"
          >
            <div>
              <CiLogout size={"24px"} />
            </div>
            <h1 className="font-bold text-lg ml-2">Logout</h1>
          </div>
          <button className="px-4 py-2 border-none text-md bg-[#1D9BF0] w-full rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
