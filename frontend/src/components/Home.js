import React from "react";
import LeftSideBar from "./LeftSideBar";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";

const Home = () => {
  return (
    <div className="flex justify-between w-[80%] mx-auto">
      <LeftSideBar /> <Feed />
      <RightSideBar />
    </div>
  );
};

export default Home;
