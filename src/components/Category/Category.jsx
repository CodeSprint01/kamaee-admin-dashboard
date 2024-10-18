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

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJ1bmRlZmluZWQiLCJjbmljIjoiMzUzMDI4NTg5NzU2NSIsImlzQWN0aXZlIjp0cnVlLCJyb2xlIjoic2VsbGVyIiwic3RhdHVzIjpudWxsLCJhY2NvdW50X3N0YXR1cyI6bnVsbCwicGhvbmVfbnVtYmVyIjoiMDMwMTEzMzkzODEiLCJiaWtlX251bWJlciI6bnVsbCwiYWRkcmVzcyI6Ikxha3NobWkgQ2hvd2sgTGFob3JlIiwiaW1hZ2UiOm51bGwsInJhdGluZ3MiOm51bGwsImNyZWF0ZWRfYnkiOm51bGwsIm90cCI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0xMC0xMFQxMToyMjowMy42MzhaIiwidXBkYXRlZEF0IjoiMjAyNC0xMC0xMFQxMToyMjowMy42MzhaIiwibG9jYXRpb24iOnsiaWQiOjI4LCJ1c2VyX2lkIjoyOCwibGF0aXR1ZGUiOjM1Ljk5OSwibG9uZ2l0dWRlIjo0NSwiY3JlYXRlZEF0IjoiMjAyNC0xMC0xMFQxMToyMjowMy42NDVaIiwidXBkYXRlZEF0IjoiMjAyNC0xMC0xMFQxMToyMjowMy42NDVaIn0sImlhdCI6MTcyODU2ODExMiwiZXhwIjoxNzM2MzQ0MTEyfQ.FXhZ3Zln8nOccEh52USOZlKxhedd-fh3TtrUIDy0EH8"; // Replace with the actual token

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
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative">
      <Card className="h-full w-full mt-3 overflow-scroll">
        {
          !loading &&
          <DataTable rows={categories} /> }
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
 