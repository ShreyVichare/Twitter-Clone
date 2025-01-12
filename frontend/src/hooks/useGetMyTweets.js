import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllTweets } from "../redux/tweetSlice";
const useGetMyTweets = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyTweets = async () => {
      try {
        const res = await axios.get(
          `${TWEET_API_END_POINT}/alltweet/${id}`,
          {
            withCredentials: true,
          } // user ID: 676d8333ae1ca04efe180db9
        );
        dispatch(getAllTweets(res.data.tweets));
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyTweets();
  }, [id]);
};
export default useGetMyTweets;
