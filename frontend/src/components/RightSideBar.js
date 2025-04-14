import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";

const RightSideBar = ({ otherUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter users based on the search term
  const filteredUsers = otherUsers?.filter(
    (user) =>
      user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user?.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[25%] mt-4">
      {/* Search Bar */}
      <div className="p-2 bg-gray-100 rounded-full outline-none flex items-center hover:cursor-pointer w-full">
        <CiSearch size={"25px"} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent outline-none w-full px-2"
        />
      </div>

      {/* Who to Follow Section */}
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-lg ">Who to follow</h1>

        {filteredUsers?.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user?._id}
              className="flex items-center justify-between my-3"
            >
              <div className="flex">
                <div>
                  <Avatar src={user?.profilePhoto} size="40" round={true} />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold ">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                  <button className="px-4 py-1 bg-black text-white rounded-full">
                    Profile
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default RightSideBar;
