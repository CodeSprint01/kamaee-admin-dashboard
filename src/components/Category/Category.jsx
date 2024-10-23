import React, { useState, useEffect } from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "./DataTable";

const Category = () => {
  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const token = localStorage.getItem("authToken");

  useEffect(() => {
    
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://api.kamaee.pk/api/categories",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      
console.log(response.data);

setCategories(response.data.category || []); 

      setLoading(false);
    } catch (error) {
      setError("Error fetching categories");
      setLoading(false);
    }
  };
  
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("/new-category");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mr-2 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08172 50.5908C9.08172 73.242 27.349 91.5092 50 91.5092C72.651 91.5092 90.9183 73.242 90.9183 50.5908C90.9183 27.9397 72.651 9.67256 50 9.67256C27.349 9.67256 9.08172 27.9397 9.08172 50.5908Z"
              fill="currentColor"  // This will use the current text color
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7236 75.2124 7.4129C69.5422 4.10219 63.2754 1.94025 56.7221 1.05122C51.7666 0.36736 46.7397 0.44618 41.8224 1.27873C39.3076 1.69969 37.8173 4.19778 38.4544 6.62326C39.0915 9.04874 41.5717 10.4717 44.0864 10.1071C47.9024 9.51986 51.7913 9.48838 55.6335 10.0172C60.8521 10.7506 65.8413 12.614 70.2762 15.4649C74.7112 18.3157 78.4851 22.104 81.3705 26.615C83.7451 30.2107 85.4557 34.1872 86.4299 38.3687C87.053 40.7242 89.5423 42.1339 91.9676 41.4967Z"
              fill="#3B82F6"  // Set this to blue color
            />
          </svg>
          <span className="text-blue-600 font-semibold">Loading...</span>
        </div>
      </div>
    );
  }
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative">
      <Card className="h-full w-full mt-3 overflow-scroll">
        {!loading && <DataTable rows={categories} setRows={setCategories} />}
      </Card>
      <div className="fixed bottom-6 right-6 group">
        <button
          className="relative bg-[#0054ba] text-white font-semibold w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          <AiOutlinePlus size={30} />
          <span className="absolute bottom-full mb-2 w-max p-2 text-xs text-white bg-[#0054ba] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add New Category
          </span>
        </button>
      </div>
    </div>
  );
};

export default Category;
 