import React from "react";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import { Outlet } from "react-router-dom";
import useOtherUsers from "../hooks/useOtherUsers";
import { useSelector } from "react-redux";

const Home = () => {
  //Custom Hooks
  const { user, otherUsers } = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSideBar /> <Outlet />
      <RightSideBar otherUsers={otherUsers} />
    </div>
  );
};

export default Home;
