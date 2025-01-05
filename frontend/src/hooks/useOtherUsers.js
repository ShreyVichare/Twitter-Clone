import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile, getOtherUsers } from "../redux/userSlice";
const useOtherUsers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${USER_API_END_POINT}/otherusers/${id}`,
          {
            withCredentials: true,
          } // user ID: 676d8333ae1ca04efe180db9
        );
        console.log(res);

        dispatch(getOtherUsers(res.data.otherUsers));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUsers();
  }, []);
};
export default useOtherUsers;
