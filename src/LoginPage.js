import React from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import UserIcon from "./assets/icons/user.png";
import PassIcon from "./assets/icons/pass.png";
const LoginModal = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div className="main-container">
        <div className="login-container">
          <div className="form-box login">
            <h2>TransConnect</h2>
            <form action="#">
              <div className="input-box">
                <span className="icon1">
                  <img src={UserIcon} />
                </span>
                <input type="username" required />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon2">
                  <img src={PassIcon} />
                </span>
                <input type="password" required />
                <label>Password</label>
              </div>
            </form>
          </div>

          <button onClick={handleOnclick} className="login-btn">
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
