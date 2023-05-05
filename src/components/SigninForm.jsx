import React from "react";

const SigninForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen transition-all duration-500">
      <div className="box relative w-96 h-96 bg-slate-800  rounded-xl overflow-hidden">
        <form
          action="/dashboard"
          className="absolute inset-0.5 rounded-lg bg-slate-700 py-12 px-10 flex flex-col "
          style={{ zIndex: 2 }}
        >
          <h2 className=" text-gray-50 text-xl font-medium text-center tracking-widest ">
            Sign in
          </h2>
          <div className="inputBox relative w-80 mt-9">
            <input
              type="text"
              className="relative w-full pt-5 pr-2 pb-2 pl-5 bg-transparent rounded-2xl outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider"
              required
            />
            <span className="absolute left-0 pt-5 pr-2 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
              Username
            </span>
            <i className=" absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
          </div>
          <div className="inputBox relative w-80 mt-9">
            <input
              type="password"
              className="relative w-full pt-5 pr-2 pb-2 pl-5 bg-transparent rounded-2xl outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider "
              required
            />
            <span className="absolute left-0 pt-5 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
              Password
            </span>
            <i className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
          </div>
          <div className="links flex justify-between ">
            <a
              href="#"
              className=" my-3 text-xs text-slate-400 hover:text-white"
            >
              Forgot Password
            </a>
            <a
              href=""
              className=" my-3 text-xs text-slate-400 hover:text-white"
            >
              Signup
            </a>
          </div>
          <input
            type="submit"
            value="LogIn"
            className="outline-none py-2 px-6 bg-orange-500 cursor-pointer text-base rounded-md font-semibold w-full mt-3 transition-all duration-500 active:opacity-80 hover:bg-orange-600 hover:text-xl "
          />
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
