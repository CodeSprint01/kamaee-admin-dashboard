import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FaThList, FaListAlt, FaBriefcase, FaUserAlt } from "react-icons/fa"; 
import { LuLayoutDashboard } from "react-icons/lu"; 
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { name: "Category", path: "/category", icon: <FaThList /> },
    { name: "SubCategory", path: "/subcategory", icon: <FaListAlt /> }, 
    { name: "Gigs", path: "/gigs", icon: <FaBriefcase /> }, 
    { name: "User", path: "/user", icon: <FaUserAlt /> },
  ];

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      console.log("User logged out");
    }
  };

  return (
    <div className="w-52 bg-[#0054ba] text-white fixed top-0 left-0 h-full font-poppins z-10">
      <div className="logo-container w-32 h-32 flex justify-center items-center rounded-full mt-5 ml-5">
        <img src={Logo} alt="Logo" className="w-28 rounded-full animate-heart" />
      </div>
      {menuItems.map((item) => (
        <div className="mt-7 " key={item.name}>
          <Link to={item.path}>
            <h2
              className={`flex items-center text-xl font-medium mb-2 cursor-pointer p-3 transition duration-300 
                ${location.pathname === item.path ? "bg-gray-300 text-[#0054ba]" : "hover:bg-gray-300 hover:text-[#0054ba]"}`}
            >
              <span className="mr-2">{item.icon}</span> {item.name}
            </h2>
          </Link>
        </div>
      ))}

      <div className="mt-10">
        <button onClick={handleLogout} className="w-full bg-[#618abd] p-2 rounded hover:bg-[#40556e]">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
