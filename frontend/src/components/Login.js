import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice.js";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [fileName, setFileName] = useState("No file chosen"); // To display the selected file name
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name); // Update the displayed file name

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "twitter-clone");
    data.append("cloud_name", "Smash007");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/Smash007/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadImageUrl = await res.json();
      if (uploadImageUrl.secure_url) {
        setProfilePhoto(uploadImageUrl.secure_url);
        toast.success("Profile photo uploaded successfully!");
      } else {
        toast.error("Failed to upload profile photo.");
      }
      console.log(uploadImageUrl);
    } catch (error) {
      toast.error("Error uploading profile photo.");
      setFileName("No file chosen"); // Reset on error
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          navigate("/");
          toast.success(res.data.message);
        }
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          { name, username, email, password, profilePhoto },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setIsLogin(true);
          toast.success(res.data.message);
        }
        console.log(res);
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  const loginSignupHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            src="Twitter-logo.png"
            width={"300px"}
            className="ml-5"
            alt="Twitter Logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="outline-blue-500 my-1 border border-gray-800 px-3 py-2 rounded-full font-semibold"
                />
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="outline-blue-500 my-1 border border-gray-800 px-3 py-2 font-semibold rounded-full"
                />
                {/* Custom File Input */}
                <div className="flex items-center my-1 border border-gray-800 rounded-full px-3 py-2">
                  <label
                    htmlFor="profilePhoto"
                    className="bg-[#1D9BF0] text-white font-semibold px-1 py-1 rounded-full cursor-pointer hover:bg-blue-600 transition"
                  >
                    Upload Photo
                  </label>
                  <input
                    id="profilePhoto"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="ml-3 text-gray-600 truncate">
                    {fileName}
                  </span>
                </div>
                {/* Optional: Display Image Preview */}
                {profilePhoto && (
                  <div className="my-2">
                    <img
                      src={profilePhoto}
                      alt="Profile Preview"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
              </>
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="outline-blue-500 my-1 border border-gray-800 font-semibold px-3 py-2 rounded-full"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="outline-blue-500 my-1 border font-semibold border-gray-800 px-3 py-2 rounded-full"
            />
            <button className="py-2 rounded-full text-lg text-white my-4 bg-[#1D9BF0] border-none">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span
                onClick={loginSignupHandler}
                className="font-bold text-blue-600 hover:cursor-pointer hover:underline"
              >
                {isLogin ? " Signup" : " Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
