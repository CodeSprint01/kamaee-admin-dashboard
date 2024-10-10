import React from "react";
import { Typography } from "@material-tailwind/react";

const DataTable = ({ rows }) => {
  const TABLE_HEAD = ["Name", "Job", "Employed", "Actions"];

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
        {rows.map(({ name, job, date }, index) => {
          const isLast = index === rows.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

          return (
            <tr key={name} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {job}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {date}
                </Typography>
              </td>
              <td className={classes}>
                <div className="flex space-x-10">
                  <Typography as="a" href="#" variant="small" color="blue-gray" className="font-normal">
                    Edit
                  </Typography>
                  <Typography
                    as="button"
                    variant="small"
                    color="red"
                    className="font-normal"
                  >
                    Delete
                  </Typography>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
