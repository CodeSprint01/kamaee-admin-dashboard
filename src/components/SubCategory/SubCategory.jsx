import React from "react";
import { Card } from "@material-tailwind/react";
import { AiOutlinePlus } from "react-icons/ai";
import DataTable from "./DataTable";

const SubCategory = () => {
  const TABLE_ROWS = [
    { name: "John Michael", job: "Manager", date: "23/04/18" },
    { name: "Alexa Liras", job: "Developer", date: "23/04/18" },
    { name: "Laurent Perrier", job: "Executive", date: "19/09/17" },
    { name: "Michael Levi", job: "Developer", date: "24/12/08" },
    { name: "Richard Gran", job: "Manager", date: "04/10/21" },
  ];

  return (
    <div className="relative ml-3"> 
    <Card className="h-full w-full mt-10 overflow-scroll">
      <DataTable rows={TABLE_ROWS} />
    </Card>
    <div className="fixed bottom-6 right-6 group"> 
      <button
        className="relative bg-[#0054ba] text-white font-semibold w-16 h-16 rounded-full flex items-center justify-center hover:bg-blue-600"
      >
        <AiOutlinePlus size={30} /> 
        <span className="absolute bottom-full mb-2 w-max p-2 text-xs text-white bg-[#0054ba] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Add more data
        </span>
      </button>
    </div>
  </div>
  );
};

export default SubCategory;
