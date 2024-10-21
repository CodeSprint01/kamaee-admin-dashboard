import React from "react";
import { Typography } from "@material-tailwind/react";

const DataTable = ({ rows, onEdit, onDelete }) => {
  const TABLE_HEAD = ["Subcategory Title", "Category", "Created At", "Actions"];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <table className="w-full min-w-max table-auto text-left border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-b border-gray-300 p-4">
              <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70">
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
              <Typography variant="small" color="blue-gray" className="font-normal">
                No subcategories available
              </Typography>
            </td>
          </tr>
        ) : (
          rows.map(({ id, subcategory_title, category, created_at }, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

            return (
              <tr key={id} className={index % 2 !== 0 ? "bg-gray-100" : "bg-white"}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {subcategory_title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {formatDate(created_at)}
                  </Typography>
                </td>
                <td className={classes}>
                  <button onClick={() => onEdit({ id, subcategory_title, category, created_at })} className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button onClick={() => onDelete(id, subcategory_title)} className="text-red-600 hover:underline ml-4">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
