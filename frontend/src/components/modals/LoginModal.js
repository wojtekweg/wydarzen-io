import React, { useState, useContext } from "react";
import axios from "axios";
import config from "../../config.json";
import { UserContext } from "../../App";

// TODO create helpers and cleanup
const logError = (error) => {
  if (error.response) {
    console.error(error.response.data);
  } else if (error.request) {
    console.error(error.request);
  } else {
    console.error("Error", error.message);
  }
};

const LoginModal = (props) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { username, setUsername, setToken } = useContext(UserContext);

  const postData = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    await axios
      .post(config.url.replace("api/", "api-token-auth/"), formData)
      .catch(logError)
      .then((res) => {
        setToken(res.data.token);
      });

    props.callbackModal("login");
    return;
  };

  return (
    <section
      className={`modal-section ${props.loginModal ? "invisible" : ""}`}
      id="popup-modal"
    >
      <div className="modal-container">
        <div className="modal-header">
          <h1 className="modal-header-h1">Login</h1>
        </div>
        <div className="modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="login" className="modal-label">
              Login
            </label>
            <input
              type="text"
              id="Login"
              name="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User login"
              className="modal-input"
            />
          </div>
        </div>
        <div className="modal-full-row">
          <div className="modal-label-input">
            <label htmlFor="password" className="modal-label">
              Password
            </label>

            <div className="flex flex-row items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="User password"
                className="modal-input grid-9 mr-4"
              />
              <label
                className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-m text-gray-600 font-mono cursor-pointer h-full"
                for="toggle"
                style={{ position: "relative" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "hide" : "show"}
              </label>
            </div>
          </div>
        </div>

        <div className="mt-5 flex modal-full-row">
          <button
            className="modal-cancel"
            onClick={() => props.callbackModal("login")}
          >
            Cancel
          </button>
          <button className="modal-save" id="save" onClick={postData}>
            Login
          </button>
        </div>
        <div className="mt-5 modal-full-row text-xl">
          <p>Don't have an account? Well, registration isn't done yet...</p>
        </div>
      </div>
    </section>
  );
};

export default LoginModal;
