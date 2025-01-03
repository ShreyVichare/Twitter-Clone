import React from "react";
import { CiHome } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
const LeftSideBar = () => {
  return (
    <div className="w-[20%] mt-4">
      <div>
        <div>
          <img
            width={"24px"}
            className="ml-4"
            src="./Twitter-logo.png"
            alt="twitter-logo"
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
            to="/profile"
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
          <div className="flex items-center my-1 hover:bg-gray-200 hover:cursor-pointer px-4 py-2 rounded-full">
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
