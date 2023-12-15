import React, { useEffect, useState } from 'react'
import '../Styles/auth.css';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AuthService from '../services/auth.service';
import { useApp } from '../context/AppContext';

const Login = () => {

    const { setIsAuthenticated } = useApp();

    const [showpass, setshowpass] = useState(false);
    const navigate = useNavigate();
    const [userdata, setuserdata] = useState({
      email: '',
      password :''
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
            formData.append('email', userdata.email);
            formData.append('password', userdata.password);
            const response = await AuthService.login(formData);

            if (response.status === 201) {
                toast.success(response.data.message);
                navigate('/');
            } else {
                console.error('Error while loggin in:', response.statusText);
            }
        } catch (error) {
        //   toast.error(error.response.data.message);
          console.error('Error while loggin in:', error.message);
        }
     }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="box">
        <h1 className="title">Login</h1>
        <div className="input_fields">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userdata.email}
            onChange={(e) =>
              setuserdata({ ...userdata, email: e.target.value })
            }
          />
          <div className="pass_div">
            <input
              type={showpass ? "text" : "password"}
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
        </div>
        <div className="button_div">
          <button type='submit' className="singup_button">
            LOGIN
          </button>
          <p className="button_div_text">
            Don't have an account ?
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              Register
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login