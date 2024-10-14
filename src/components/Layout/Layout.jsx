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

function Layout({ onLogout }) {
  const location = useLocation(); 
  const headings = {
    "/": "Dashboard",
    "/category": "Category",
    "/subcategory": "SubCategory",
    "/gigs": "Gigs",
    "/user": "User",
    "/new-category": "Category",
  };

  const getHeading = () => headings[location.pathname] || ""; 

  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1">
        <Header heading={getHeading()} /> 
        <div className="mt-14 ml-52 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/subcategory" element={<SubCategory />} />
            <Route path="/user" element={<User />} />
            <Route path="/new-category" element={<NewCategory />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Layout;
