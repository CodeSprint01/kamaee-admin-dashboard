import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { FaTimes } from 'react-icons/fa';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';

const DataTable = ({ rows, setRows }) => { 
  const TABLE_HEAD = ["Category Name", "Image", "Created At", "Actions"];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredRows = rows.filter(row =>
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
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://api.kamaee.pk/api/update/category/${updatedCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedCategory),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update category");
      }
  
      const result = await response.json();
      console.log("Category updated successfully:", result);
      
      setIsEditing(false);
      setSelectedCategory(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://api.kamaee.pk/api/delete/category/${selectedCategory.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete category");
      }

      // Update the rows state to remove the deleted category
      setRows(prevRows => prevRows.filter(row => row.id !== selectedCategory.id));
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
                <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70">
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
                <Typography variant="small" color="blue-gray" className="font-normal">
                  No categories available
                </Typography>
              </td>
            </tr>
          ) : (
            filteredRows.map(({ id, category_name, image, created_at }, index) => {
              const isLast = index === filteredRows.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

              return (
                <tr key={id} className={index % 2 !== 0 ? "bg-gray-100" : "bg-white"}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {category_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {image ? <img src={`https://api.kamaee.pk${image}`} alt={category_name} height={50} width={50} /> : "No Image"}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {formatDate(created_at)}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <button
                      onClick={() => handleEdit({ id, category_name, image, created_at })}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete({ id, category_name })}
                      className="text-red-600 hover:underline ml-4"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Edit Popup */}
      {isEditing && selectedCategory && (
        <EditCategory
          categoryData={selectedCategory}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {/* Delete Confirmation Popup */}
      {isDeleting && (
        <DeleteCategory 
          category={selectedCategory} 
          onConfirm={handleDeleteConfirm} 
          onCancel={() => setIsDeleting(false)} 
        />
      )}
    </div>
  );
};

export default DataTable;
