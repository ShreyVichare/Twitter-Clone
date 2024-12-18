import React from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
const CreatePost = () => {
  return (
    <div className="w-full">
      <div className="">
        {/* Navigation Section */}
        <div className="flex justify-around mb-4 border-b border-gray-200 ">
          <div className="text-center w-full">
            <h1 className="font-semibold text-gray-600 text-lg cursor-pointer hover:bg-gray-200  p-2 ">
              For You
            </h1>
          </div>
          <div className="text-center w-full">
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
              className="w-full outline-none  border-none text-lg ml-2"
              type="text"
              placeholder="What is happening?!"
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-300">
            <div>
              <CiImageOn />
            </div>
            <div className=" ">
              <button className=" bg-[#1D9BF0] px-4 text-lg text-white  py-1 border border-none rounded-full ">
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
