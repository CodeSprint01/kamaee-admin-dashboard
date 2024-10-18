import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NewCategory from "../New-Category/NewCategory";
import SubCategory from "../SubCategory/SubCategory";
import Dashboard from "../Dashboard/Dashboard";
import Category from "../Category/Category";
import Sidebar from "../Sidebar/sidebar";
import Header from "../Header/Header";
import Gigs from "../Gigs/Gigs";
import User from "../User/User";
// import NewSubCategory from "../NewSubCategory/NewSubCategory";


function Layout({ onLogout }) {
  const location = useLocation();
  const headings = {
    "/": "Dashboard",
    "/category": "Category",
    "/subcategory": "SubCategory",
    "/new-subcategory": "SubCategory",
    "/gigs": "Gigs",
    "/user": "User",
    "/new-category": "Category",
  };

  const getHeading = () => headings[location.pathname] || "";

  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 transition-all mt-9 md:mt-3 xl:mt-3 lg:mt-3 duration-300 sm:ml-0 md:ml-52 lg:ml-48 xl:ml-48 lg:p-4 overflow-hidden">
        <Header heading={getHeading()} />
        <div className="mt-14 md:p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/user" element={<User />} />
            <Route path="/new-category" element={<NewCategory />} />
            {/* <Route path="/new-subcategory" element={<NewSubCategory />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Layout;
