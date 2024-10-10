import React from "react";
import { Card } from "@material-tailwind/react";
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
    <div>
      <Card className="h-full w-full mt-10 overflow-scroll">
        <DataTable rows={TABLE_ROWS}  /> 
      </Card>
      <div className="mt-4 flex justify-end">
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SubCategory;
