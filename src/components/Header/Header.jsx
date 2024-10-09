import React from "react";

const Header = ({ heading }) => {
  return (
    <div className="bg-[#0054ba] text-white p-3 text-center font-poppins">
      <h1 className="text-4xl font-bold">{heading}</h1>
    </div>
  );
};

export default Header;
