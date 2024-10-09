import React, { useState } from "react";
import Header from "../Header/Header";
import Logo from "../../assets/Logo.png";
import './Sidebar.css'; 

const Sidebar = () => {
  const [heading, setHeading] = useState("Dashboard");
  const menuItems = [
    { name: "Dashboard" },
    { name: "Category" },
    { name: "SubCategory" },
    { name: "Gigs" },
    { name: "User" },
  ];

  return (
    <div className="flex h-screen font-poppins">
      <div className="w-64 bg-[#0054ba] text-white p-5">
        <div className="logo-container w-32 h-32 flex justify-center items-center rounded-full ">
          <img src={Logo} alt="Logo" className="w-28 rounded-full animate-heart" />
        </div>
        {menuItems.map((item) => (
          <div className="mt-10" key={item.name}>
            <h2
              className="text-xl font-medium mb-2 cursor-pointer"
              onClick={() => setHeading(item.name)}
            >
              {item.name}
            </h2>
          </div>
        ))}

        <div className="mt-28">
          <button className="w-full bg-[#618abd] p-2 rounded hover:bg-[#40556e]">
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 bg-gray-100">
        <Header heading={heading} />
      </div>
    </div>
  );
};

export default Sidebar;
