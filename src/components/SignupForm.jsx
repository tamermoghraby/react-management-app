import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const location = useLocation;
  const [successMsg, setSuccessMsg] = useState("");

  const goToSignin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  const onSubmit = async (values) => {
    console.log("Values: ", values);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:9898/auth/register",
        values
      );

      if (response.status === 200) {
        setSuccessMsg("User added successfully!");
        setTimeout(() => {
          setSuccessMsg("Redirecting to SignIn");
        }, 1000);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (err) {
      if (err && err instanceof AxiosError) {
        setError(err.response?.data.message);
      } else if (err && err instanceof Error) setError(err.message);

      console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      role: "",
    },
    onSubmit,
  });

  return (
    <div>
      {isSignUp ? (
        <div className="flex justify-center items-center min-h-screen transition-all duration-500">
          <div className="box relative w-96 min-h-[550px] bg-slate-800  rounded-xl overflow-hidden">
            <form
              onSubmit={formik.handleSubmit}
              action=""
              className="absolute inset-0.5 rounded-lg bg-slate-700 py-12 px-10 flex flex-col "
              style={{ zIndex: 2 }}
            >
              <h2 className=" text-green-50 text-xl font-medium text-center tracking-widest ">
                Sign Up
              </h2>
              <div className="success text-base tracking-widest flex justify-center transition-all duration-500 hover:cursor-auto">
                <p
                  id="successMsg"
                  className="text-sm bg-green-500 rounded-md bg-opacity-80 mt-3 px-3 transition-all "
                >
                  {successMsg}
                </p>
              </div>
              <div className="inputBox relative w-auto mt-9">
                <input
                  type="text"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  onBlur={formik.handleBlur}
                  className={`relative w-full pt-2 pr-2 pb-2 pl-5 bg-transparent rounded-md outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider 
                  }`}
                  required
                />
                <span className="absolute left-0 pt-2 pr-2 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
                  Email Address
                </span>
                <i className=" absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
              </div>
              <div className="inputBox relative w-auto mt-6">
                <input
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="relative w-full pt-5 pr-2 pb-2 pl-5 bg-transparent rounded-2xl outline-none shadow-none border-none text-base transition-all duration-500 z-10 tracking-wider "
                  required
                />
                <span className="absolute left-0 pt-5 pb-2 pointer-events-none text-slate-400 text-base tracking-wider transition-all duration-500">
                  Password
                </span>
                <i className="absolute left-0 bottom-0 w-full h-0.5 bg-slate-500 rounded-md overflow-hidden transition-all duration-500 pointer-events-none"></i>
              </div>
              <div className="inputBox relative w-auto mt-6">
                <FormControl fullWidth>
                  <InputLabel id="role-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="role-simple-select-label"
                    id="role-simple-select"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Role"
                  >
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"TeamLeader"}>TeamLeader</MenuItem>
                    <MenuItem value={"Developer"}>Developer</MenuItem>
                    <MenuItem value={"Tester"}>Tester</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <input
                type="submit"
                value="Create Account"
                className="outline-none py-2 px-6 bg-indigo-600 cursor-pointer text-base rounded-md font-semibold w-full mt-6 transition-all duration-500 active:opacity-80 hover:bg-indigo-800 hover:shadow-md hover:shadow-indigo-600 hover:text-lg hover:duration-300 
            "
              />
              <div className=" text-xs text-slate-400 mt-3 links flex justify-around transition-all duration-500 hover:text-sm hover:text-orange-400 ">
                <p className=" ">Already a member?</p>
                <a href="" onClick={goToSignin} className="  hover:text-white">
                  Signin
                </a>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SignupForm;
