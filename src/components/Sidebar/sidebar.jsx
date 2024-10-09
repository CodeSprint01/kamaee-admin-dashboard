import React from "react";
import { Link } from "react-router-dom"; 
import Logo from "../../assets/Logo.png";
import './Sidebar.css'; 

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Category", path: "/category" },
    { name: "SubCategory", path: "/subcategory" },
    { name: "Gigs", path: "/gigs" },
    { name: "User", path: "/user" },
  ];

  return (
    <div className="font-poppins">
      <div className="w-64 bg-[#0054ba] text-white p-5 fixed top-0 left-0 h-full z-10">
        <div className="logo-container w-32 h-32 flex justify-center items-center rounded-full ">
          <img src={Logo} alt="Logo" className="w-28 rounded-full animate-heart " />
        </div>
        {menuItems.map((item) => (
          <div className="mt-10" key={item.name}>
            <Link to={item.path}>
              <h2 className="text-xl font-medium mb-2 cursor-pointer">
                {item.name}
              </h2>
            </Link>
          </div>
        ))}

        <div className="mt-24">
          <button className="w-full bg-[#618abd] p-2 rounded hover:bg-[#40556e]">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
