import React from "react";
import Avatar from "react-avatar";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { VscComment } from "react-icons/vsc";
const Tweet = ({ tweet }) => {
  return (
    <div className="border-b border-b-gray-200">
      <div>
        <div className="flex p-4">
          <Avatar src="./pfp1.webp" size="40" round={true} />
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
                <p>{tweet?.like?.lenght}</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-pink-200 rounded-full">
                  <CiHeart size={"27px"} />
                </div>

                <p>0</p>
              </div>
              <div className="flex items-center">
                <div className="p-2 hover:cursor-pointer hover:bg-yellow-100 rounded-full">
                  <CiBookmark size={"24px"} />
                </div>
                <p>0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
