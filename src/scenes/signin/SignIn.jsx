import React, { useState, useContext } from "react";
import "./signin.css";
import SignupForm from "../../components/SignupForm";
import { useSignIn, useSignOut } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { UserContext } from "../../context/UserContext";
import userService from "../../services/userService";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);
  const toggleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const [error, setError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = useSignIn();
  const signOut = useSignOut();

  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9898/auth/token",
        values
      );

      if (response.status === 200) {
        try {
          const user = await userService.getUserByUsername(values.username);
          setUser(user.data);
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.log(error);
        }

        console.log(response);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          console.log(response);
          setErrorMsg("Wrong Credentials!");
        }, 2000);
      }

      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { username: values.username },
      });
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
        setTimeout(() => {
          setErrorMsg("Wrong Credentials!");
        }, 1000);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <div className="flex flex-col items-center transition-all duration-700">
      {isSignIn ? (
        <div className="flex justify-center items-center min-h-screen transition-all duration-500">
          <div className="box relative w-96 h-[395px] bg-transparent  rounded-xl shadow-2xl shadow-inherit overflow-hidden">
            <form
              onSubmit={formik.handleSubmit}
              action="/dashboard"
              className="absolute inset-0.5 rounded-xl bg-slate-700 py-12 px-10 flex flex-col "
              style={{ zIndex: 2 }}
            >
              <h2 className=" text-gray-50 text-xl font-medium text-center tracking-widest ">
                Sign in
              </h2>
              <div className="inputBox relative w-auto mt-9">
                <input
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  type="text"
                  className={`relative w-full pt-2 pr-2 pb-2 pl-5 bg-transparent rounded-md outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider 
                  }`}
                  required
                />
                <span className="absolute left-0 pt-2 pr-2 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
                  Username
                </span>
                <i className=" absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
              </div>
              <div className="inputBox relative w-auto mt-9">
                <input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  className="relative w-full pt-5 pr-2 pb-2 pl-5 bg-transparent rounded-2xl outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider "
                  required
                />
                <span className="absolute left-0 pt-5 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
                  Password
                </span>
                <i className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
              </div>
              <div className="links text-xs text-slate-400 flex justify-between transition-all duration-500 hover:text-sm hover:text-orange-400">
                <a href="#" className=" my-3  hover:text-white">
                  Forgot Password
                </a>
                <a
                  href=""
                  onClick={toggleSignup}
                  className=" my-3   hover:text-white"
                >
                  Signup
                </a>
              </div>
              <div className="outline-none py-1 px-6 bg-indigo-600 cursor-pointer text-base rounded-md font-semibold w-full mt-3 transition-all duration-500 active:opacity-80 hover:bg-indigo-800 hover:shadow-md hover:shadow-indigo-600 hover:text-lg hover:duration-300 ">
                <LoadingButton
                  type="submit"
                  loading={loading}
                  variant="filled"
                  fullWidth
                  sx={{
                    "&": {
                      fontSize: "1rem",
                      lineHeight: "1.5rem",
                    },
                    "&:hover": {
                      backgroundColor: "transparent", // keep the same background color as normal state
                      boxShadow: "none", // remove the box shadow
                    },
                  }}
                >
                  LogIn
                </LoadingButton>
              </div>
              <div className="error text-base tracking-widest flex justify-center transition-all duration-500 hover:cursor-auto">
                <p
                  id="errMsg"
                  className="text-sm bg-red-500 rounded-md bg-opacity-80 my-4 px-3 transition-all "
                >
                  {errorMsg}
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <SignupForm />
      )}
    </div>
  );
};

export default SignIn;
