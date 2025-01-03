import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from "../hooks/useGetProfile";
import { useSelector } from "react-redux";
const Profile = () => {
  const { user, profile } = useSelector((store) => store.user);

  useGetProfile(user?._id);
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div className="">
        <div className="flex items-center py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:cursor-pointer hover:bg-gray-100"
          >
            <IoMdArrowBack size={"24px"} />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img src="./cover-1.jpeg" alt="banner" />
        <div className="absolute ml-2 top-52 border-4 border-white rounded-full">
          <Avatar src="./pfp2.webp" size="120" round={true} />
        </div>
        <div className="text-right m-4 ">
          <button className="px-4 py-1 hover:bg-gray-200 rounded-full  border border-gray-400">
            Edit Profile
          </button>
        </div>
        <div className="m-4">
          <h1 className="font-bold text-xl">{profile?.name}</h1>
          <p>@{profile?.username}</p>
        </div>
        <div className="m-4 text-sm">
          <p>Turning Ideas into Amazing Websites</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
