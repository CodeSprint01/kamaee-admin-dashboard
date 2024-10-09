import React from "react";

const Header = ({ heading }) => {
  return (
    <div className="w-full bg-[#0054ba] text-white p-3 text-center font-poppins fixed top-0 z-0"> 
      <h1 className="text-4xl font-bold">{heading}</h1>
    </div>
  );
};

export default Header;
