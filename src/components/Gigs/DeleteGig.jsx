import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaTimes } from "react-icons/fa";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

const DataTable = ({ rows, setRows }) => {
  const TABLE_HEAD = ["Category Name", "Image", "Created At", "Actions"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRows = rows.filter((row) =>
    row.category_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditing(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleting(true);
  };

  const handleSave = async (updatedCategory) => {
    try {
      const token = "your-token-here"; // Replace with the correct token
      const response = await fetch(
        `https://api.kamaee.pk/api/update/category/${updatedCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCategory),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update category");
      }

      const result = await response.json();
      console.log("Category updated successfully:", result);

      // Update the categories list
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === updatedCategory.id ? updatedCategory : row
        )
      );
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = "your-token-here"; // Replace with the correct token
      const response = await fetch(
        `https://api.kamaee.pk/api/delete/category/${selectedCategory.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Update the rows state to remove the deleted category
      setRows((prevRows) =>
        prevRows.filter((row) => row.id !== selectedCategory.id)
      );
      setIsDeleting(false);
      setSelectedCategory(null);
      console.log("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="mt-5 flex flex-col">
      {/* Search Input */}
      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search Categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-1 rounded w-1/3 pr-10"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute top-5 transform -translate-x-5 -translate-y-1/2 text-gray-600 hover:text-blue-500 text-lg"
            aria-label="Clear Search"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Category Table */}
      <table className="w-full min-w-max table-auto text-left border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="border-b border-gray-300 p-4">
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
          {filteredRows.length === 0 ? (
            <tr>
              <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  No Categories Found
                </Typography>
              </td>
            </tr>
          ) : (
            filteredRows.map((row, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-4">{row.category_name}</td>
                <td className="p-4">
                  <img
                    src={row.image || "/placeholder.jpg"}
                    alt="Category"
                    className="h-12 w-12 object-cover rounded-full"
                  />
                </td>
                <td className="p-4">{formatDate(row.created_at)}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(row)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit and Delete Modals */}
      {isEditing && (
        <EditCategory
          category={selectedCategory}
          onSave={handleSave}
          onClose={() => setIsEditing(false)}
        />
      )}
      {isDeleting && (
        <DeleteCategory
          category={selectedCategory}
          onDelete={handleDeleteConfirm}
          onClose={() => setIsDeleting(false)}
        />
      )}
    </div>
  );
};

export default DataTable;
