import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FaThList, FaListAlt, FaBriefcase, FaUserAlt } from "react-icons/fa"; 
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu"; 
import CustomModal from "./CustomModal";
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {  
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LuLayoutDashboard /> },
    { name: "Category", path: "/category", icon: <FaThList /> },
    { name: "SubCategory", path: "/subcategory", icon: <FaListAlt /> }, 
    { name: "Gigs", path: "/gigs", icon: <FaBriefcase /> }, 
    { name: "User", path: "/user", icon: <FaUserAlt /> },
  ];

  const handleLogout = () => {
    setModalOpen(false);
    onLogout();  
  };

  return (
    <div className="w-52 bg-[#0054ba] text-white fixed top-0 left-0 h-full font-poppins z-50">
      <div className="logo-container w-32 h-32 flex justify-center items-center rounded-full mt-5 ml-5">
        <img src={Logo} alt="Logo" className="w-28 rounded-full animate-heart" />
      </div>
      {menuItems.map((item) => (
        <div className="mt-7 " key={item.name}>
          <Link to={item.path}>
            <h2
              className={`flex items-center text-xl font-medium mb-2 cursor-pointer rounded p-3 transition duration-300 
                ${location.pathname === item.path ? "bg-white text-[#0054ba]" : "hover:bg-white hover:text-[#0054ba]"}`}
            >
              <span className="mr-2">{item.icon}</span> {item.name}
            </h2>
          </Link>
        </div>
      ))}

      <div className="mt-2">
        <button 
          onClick={() => setModalOpen(true)} 
          className="w-full bg-[#618abd] p-2 rounded flex items-center justify-center hover:bg-[#40556e]"
        >
          <MdLogout className="mr-2" /> Logout
        </button>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout} 
      />
    </div>
  );
};

export default Sidebar;
