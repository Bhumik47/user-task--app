import React, { useEffect, useState } from "react";
import "../Styles/auth.css";
import "../App.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthService from "../services/auth.service";
import { useApp } from "../context/AppContext";

const Register = () => {
     const { setIsAuthenticated, setUser } = useApp();
const [showpass, setshowpass] = useState(false);
const navigate = useNavigate();
const [userdata, setuserdata] = useState({
  name: "",
  email: "",
  password: "",
});
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value });
      };
    
    useEffect(() => {
      const checkCookie = () => {
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token"));

        if (cookieValue) {
          navigate("/");
        } else {
          setIsAuthenticated(false);
        }
      };
      checkCookie();
    }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Email validation check
    if (!validateEmail(userdata.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", userdata.name);
      formData.append("email", userdata.email);
      formData.append("password", userdata.password);
      const response = await AuthService.registerUser(formData);

      if (response.status === 201) {
        toast.success(response.data.message);
          navigate("/");
          localStorage.setItem("username", JSON.stringify(response.data.username));      
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative h-[500px] w-[500px] px-6 py-12 md:p-12">
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col rounded-xl text-center shadow-lg shadow-slate-500 bg-white w-full px-9 py-11 text-black gap-5"
        >
          <h2 className=" text-xl text-gray-700">Register</h2>
          <div className="flex flex-col text-start">
            <input
              type="text"
              className="bg-transparent border-b border-gray-400 text-gray-900 text-sm  block w-full p-3 outline-none"
              name="name"
              placeholder="Name"
              value={userdata.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-start">
            <input
              type="email"
              className="bg-transparent border-b border-gray-400 text-gray-900 text-sm  block w-full p-3 outline-none"
              name="email"
              placeholder="Email"
              value={userdata.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col text-start relative">
            <input
              className="bg-transparent border-b border-gray-400 text-gray-900 text-sm  block w-full p-3 outline-none"
              type={showpass ? "text" : "password"}
              name="password"
              value={userdata.password}
              placeholder="Password"
              onChange={handleChange}
            />
            {!showpass ? (
              <IoMdEyeOff
                className="eye_icon"
                onClick={() => {
                  setshowpass((prev) => !prev);
                }}
              />
            ) : (
              <IoMdEye
                className="eye_icon"
                onClick={() => {
                  setshowpass((prev) => !prev);
                }}
              />
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <button
              className="rounded-md text-white w-full bg-[#1a1a1a] border
                         border-transparent px-3 py-2 text-base font-medium cursor-pointer"
              type="submit"
            >
              Sign Up
            </button>
            <div>
              <span className="text-gray-500 text-sm  hover:text-gray-800 ">
                Already have an account?{" "}
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </span>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
