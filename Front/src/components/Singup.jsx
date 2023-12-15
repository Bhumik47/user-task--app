import React, { useEffect, useState } from "react";
import "../Styles/auth.css";
import "../App.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AuthService from "../services/auth.service";
import { useApp } from "../context/AppContext";
const Singup = () => {

  const { setIsAuthenticated } = useApp();

  const [showpass, setshowpass] = useState(false);
  const navigate = useNavigate();
  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: ""
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
            toast.error('Please enter a valid email address');
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
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitForm} className="box">
        <h1 className="title">Register</h1>
        <div className="input_fields">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userdata.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userdata.email}
            onChange={handleChange}
          />
          <div className="pass_div">
            <input
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
        </div>
        <div className="button_div">
          <button type="submit" className="singup_button">
            SIGN UP
          </button>
          <p className="button_div_text">
            Already have an account ?
            <span
              onClick={() => {
                navigate("/login");
              }}
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Singup;
