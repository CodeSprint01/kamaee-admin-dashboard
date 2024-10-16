import React from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";

const Category = () => {
  const TABLE_HEAD = ["category_name", "imges", "created_at", "updated_at"];
  const TABLE_ROWS = [
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    { name: "", job: "", date: "" },
    
  ];

  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("/new-category"); 
  };

  return (
    <div className="relative">
      <Card className="h-full w-full mt-10 overflow-scroll">
        <DataTable rows={TABLE_ROWS} />
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
