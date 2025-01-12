import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import tweetSlice from "./tweetSlice";

const store = configureStore({
  reducer: {
    //slice
    user: userSlice, // Register the user reducer
    tweet: tweetSlice,
  },
});

export default store;
