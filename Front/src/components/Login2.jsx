import React, { useEffect, useState } from "react";
import "../Styles/auth.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthService from "../services/auth.service";
import { useApp } from "../context/AppContext";

const Login = () => {
  const { setIsAuthenticated, setUser } = useApp();

  const [showpass, setshowpass] = useState(false);
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("email", userdata.email);
      formData.append("password", userdata.password);
      const response = await AuthService.login(formData);

      if (response.status === 201) {
        toast.success(response.data.message);
        setUser(response.data.username);
        localStorage.setItem(
          "username",
          JSON.stringify(response.data.username)
        );

        navigate("/");
      } else {
        console.error("Error while loggin in:", response.statusText);
      }
    } catch (error) {
      //   toast.error(error.response.data.message);
      console.error("Error while loggin in:", error.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="relative h-[400px] w-[500px] px-6 py-12 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-xl text-center shadow-lg shadow-slate-500
                 bg-white w-full px-9 py-11 text-black gap-5"
        >
          <h2 className=" text-xl text-gray-700">Login</h2>
          <div className="flex flex-col text-start">
            <input
              className="bg-transparent border-b border-gray-400 text-gray-900 text-sm  block w-full p-3 outline-none"
              type="email"
              name="email"
              placeholder="Email"
              value={userdata.email}
              onChange={(e) =>
                setuserdata({ ...userdata, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col text-start relative">
            <input
              type={showpass ? "text" : "password"}
              className="bg-transparent border-b border-gray-400 text-gray-900 text-sm  block w-full p-3 outline-none"
              name="password"
              placeholder="Passowrd"
              value={userdata.password}
              onChange={(e) =>
                setuserdata({ ...userdata, password: e.target.value })
              }
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

          <div className="w-full flex flex-col mt-5 gap-2">
            <button
              className="rounded-md text-white w-full bg-[#1a1a1a] border
                         border-transparent px-3 py-2 text-base font-medium cursor-pointer"
              type="submit"
            >
              Login
            </button>
            <div>
              <span
                className="text-gray-500 text-sm hover:text-gray-800 cursor-pointer ml-1"
                onClick={() => {
                  setuserdata({
                    ...userdata,
                    email: "guest@example.com",
                    password: "1234",
                  });
                }}
              >
                Guest login
              </span>

              <span className="text-gray-500 text-sm  hover:text-gray-500">
                {" "}
                or{" "}
              </span>
              <span
                className="text-gray-500 text-sm  hover:text-gray-800 cursor-pointer"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
