import React, { useEffect, useState } from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import axios from "axios";

const SubCategory = () => {
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJhbGlyYXphMTE4MDQxQGdtYWlsLmNvbSIsImNuaWMiOiIzNTMwMjg1ODk3NTY1IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJidXllciIsInN0YXR1cyI6bnVsbCwiYWNjb3VudF9zdGF0dXMiOm51bGwsInBob25lX251bWJlciI6IjAzMDExMzM5MzgxIiwiYmlrZV9udW1iZXIiOm51bGwsImFkZHJlc3MiOiJMYWtzaG1pIENob3drIExhaG9yZSIsImltYWdlIjpudWxsLCJyYXRpbmdzIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJvdHAiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzAxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTZUMDg6MDU6MDkuMDAwWiIsImxvY2F0aW9uIjp7ImlkIjozMSwidXNlcl9pZCI6MzEsImxhdGl0dWRlIjozNS45OTksImxvbmdpdHVkZSI6NDUsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzExWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzExWiJ9LCJpYXQiOjE3MjkwNjY0NDgsImV4cCI6MTczNjg0MjQ0OH0.w5CZy1i5nxyThvtjbWeLjqEtwHwKadrIz4RgQUwhVkk"; 

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/subcategories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       
        const subcategories = response.data.subcategory.map((item) => ({
          subcategory_title: item.subcategory_title,
          category: item.category.category_name, 
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));

        setTableRows(subcategories); 
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setError("Error fetching subcategories");
        setLoading(false); 
      }
    };

    fetchSubCategories();
  }, []);

  const handleAddCategory = () => {
    navigate("/new-subcategory");
  };

  if (loading) {
    return <div>Loading subcategories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="relative">
      <Card className="h-full w-full mt-10 overflow-scroll">
        <DataTable rows={tableRows} />
      </Card>
      <div className="fixed bottom-6 right-6 group">
        <button
          className="relative bg-[#0054ba] text-white font-semibold w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          <AiOutlinePlus size={30} />
          <span className="absolute bottom-full mb-2 w-max p-2 text-xs text-white bg-[#0054ba] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Add New Subcategory
          </span>
        </button>
      </div>
    </div>
  );
};

export default SubCategory;
