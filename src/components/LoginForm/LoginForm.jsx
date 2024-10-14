import formLogo from "../../assets/form-logo.png";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import bgimg from "../../assets/bgimg.jpg";
// import logo from "../../assets/logo.png";
import React, { useState } from "react";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Phone number is required");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Incorrect password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://api.kamaee.pk/api/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: email,
          password: password,
          fcm_token: "8237429834729349",
        }),
      });

      const data = await response.json();
      console.log("API Response: ", data);

      if (response.ok && data.token) {
        localStorage.setItem("authToken", data.token);
        onLogin();
        navigate("/");
      } else {
        if (data.error) {
          setEmailError(data.message);
        } else {
          setEmailError("Login failed, please try again.");
        }
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setEmailError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center text-white"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="absolute top-5 left-5">
        {/* <img src={logo} alt="Logo" className="w-12 h-auto" /> */}
      </div>
      <form onSubmit={handleSubmit} className="relative ">
        <div className="flex justify-center mb-6">
          <img src={formLogo} alt="Form Logo" className="w-16" />
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Phone Number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full h-12 bg-transparent border-2 border-[rgba(255,255,255,0.2)] rounded-full text-white px-4 pr-12 focus:outline-none focus:border-[#2154c0] transition duration-300"
          />
          <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
        </div>
        {emailError && (
          <p className="text-red-500 text-xs mt-2 ml-2">{emailError}</p>
        )}

        <div className="relative mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            className="w-full h-12 bg-transparent border-2 border-[rgba(255,255,255,0.2)] rounded-full text-white px-4 pr-12 focus:outline-none focus:border-[#2154c0] transition duration-300"
          />
          <FaLock className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg" />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-2 ml-2">{passwordError}</p>
        )}

        <button
          type="submit"
          className={`w-full h-12 bg-[#2154c0] rounded-full text-white font-bold text-lg transition duration-500 ease-in-out transform hover:bg-[#203aa1] ${
            isLoading ? "flex justify-center items-center" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
