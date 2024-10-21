import React from "react";

const DataTable = ({ rows, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2">Subcategory Title</th>
          <th className="border border-gray-300 p-2">Category</th>
          <th className="border border-gray-300 p-2">Created At</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="bg-white even:bg-gray-100">
            <td className="border border-gray-300 p-2">{row.subcategory_title}</td>
            <td className="border border-gray-300 p-2">{row.category}</td>
            <td className="border border-gray-300 p-2">{row.created_at}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => onEdit(row)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => onDelete(row.id, row.subcategory_title)} className="text-red-600 hover:underline ml-4">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
