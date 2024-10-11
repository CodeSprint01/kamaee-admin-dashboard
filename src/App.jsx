import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NewCategory from "./components/New-Category/NewCategory"; 
import SubCategory from "./components/SubCategory/SubCategory";
import Dashboard from "./components/Dashboard/Dashboard";
import Category from "./components/Category/Category";
import Sidebar from "./components/Sidebar/sidebar";
import Header from "./components/Header/Header";
import Gigs from "./components/Gigs/Gigs";
import User from "./components/User/User";
import './App.css';

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const headingMap = {
    "/category": "Category",
    "/subcategory": "SubCategory",
    "/gigs": "Gigs",
    "/user": "User",
    "/new-category": "Category", 
  };

  const heading = headingMap[location.pathname] || "Dashboard";

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header heading={heading} />
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

export default App;
