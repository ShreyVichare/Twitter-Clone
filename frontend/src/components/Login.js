import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

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
          <div className="my-5 ">
            <h1 className="font-bold text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold ">
            {isLogin ? "Login" : "Sign up"}
          </h1>
          <form className="flex flex-col w-[55%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="outline-blue-500 my-1 border border-gray-800 px-3 py-2 rounded-full font-semibold"
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="outline-blue-500 my-1 border border-gray-800 px-3 py-2 font-semibold rounded-full"
                />
              </>
            )}
            <input
              type="text"
              placeholder="Email"
              className="outline-blue-500 my-1 border border-gray-800 font-semibold px-3 py-2 rounded-full"
            />
            <input
              type="text"
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
