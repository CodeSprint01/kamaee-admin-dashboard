import React from "react";
import { Typography } from "@material-tailwind/react";

const DataTable = ({ rows }) => {
  console.log(rows, "DataTable Rows");

  const TABLE_HEAD = ["Category Name", "Image", "Created At", "Updated At" ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


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
        {rows.length === 0 ? (
          <tr>
            <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
              <Typography variant="small" color="blue-gray" className="font-normal">
                No categories available
              </Typography>
            </td>
          </tr>
        ) : (
          rows.map(({ id, category_name, image, updated_at, created_at }, index) => {
            const isLast = index === rows.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

            return (
              <tr key={id} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {category_name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {image ? (
                      <img src={`https://api.kamaee.pk${image}`} alt={category_name} height={50} width={50} />
                    ) : (
                      <span>No Image</span>
                    )}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {formatDate(created_at)}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {formatDate(updated_at)}
                  </Typography>
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
