import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Layout from "./components/Layout/Layout";
import CategoryTable from "./components/Category/DataTable"; 
import NewCategory from "./components/New-Category/NewCategory"; 
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
    setLoading(false); 
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <Layout onLogout={handleLogout} className="">
                <Routes>
                  {/* Category Table Route */}
                  <Route path="/category" element={<CategoryTable />} />

                  {/* Add New Category Route */}
                  <Route path="/new-category" element={<NewCategory />} />

                  {/* Default Route */}
                  <Route path="*" element={<Navigate to="/category" />} />
                </Routes>
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
