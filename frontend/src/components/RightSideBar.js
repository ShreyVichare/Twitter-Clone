import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";

const RightSideBar = () => {
  return (
    <div className="w-[25%] mt-4">
      <div className="p-2 bg-gray-100 rounded-full outline-none flex items-center hover:cursor-pointer w-full">
        <CiSearch size={"25px"} />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-full px-2"
        />
      </div>

      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg ">Who to follow</h1>
        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar src="./pfp3.jpg" size="40" round={true} />
            </div>
            <div className="ml-2">
              <h1 className="font-bold ">Shah</h1>
              <p className="text-sm">@Shah_hehe</p>
            </div>
          </div>
          <div>
            <button className="px-4 py-1 bg-black text-white rounded-full">
              Profile
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar src="./pfp3.jpg" size="40" round={true} />
            </div>
            <div className="ml-2">
              <h1 className="font-bold ">Shah</h1>
              <p className="text-sm">@Shah_hehe</p>
            </div>
          </div>
          <div>
            <button className="px-4 py-1 bg-black text-white rounded-full">
              Profile
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between my-3">
          <div className="flex">
            <div>
              <Avatar src="./pfp3.jpg" size="40" round={true} />
            </div>
            <div className="ml-2">
              <h1 className="font-bold ">Shah</h1>
              <p className="text-sm">@Shah_hehe</p>
            </div>
          </div>
          <div>
            <button className="px-4 py-1 bg-black text-white rounded-full">
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
