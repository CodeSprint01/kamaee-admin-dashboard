import React from "react";

const Header = ({ heading }) => {
  return (
    <div className="w-full bg-[#0054ba] hidden md:flex justify-center text-center text-white md:p-5 font-poppins fixed top-0">
      <h1 className="text-3xl md:text-4xl -ml-80 font-bold"> {/* Adjusting text size for responsiveness */}
        {heading}
      </h1>
    </div>
  );
};

export default Header;
