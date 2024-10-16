import React from "react";
import { Typography } from "@material-tailwind/react";

const DataTable = ({ rows }) => {
  const TABLE_HEAD = ["Subcategory Title", "Category", "Created At", "Updated At"]; 

  return (
    <table className="w-full min-w-max table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th
              key={head}
              className="border-b border-gray-300 bg-gray-200 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold leading-none opacity-70"
              >
                {head}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

            return (
              <tr key={row.subcategory_title} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {row.subcategory_title}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {row.category}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {row.created_at}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {row.updated_at}
                  </Typography>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={4} className="p-4 text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
