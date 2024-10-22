import React, { useState, useEffect } from "react";
import { FaTimes } from 'react-icons/fa';

const EditCategory = ({ categoryData, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState("");

  // Set the initial category name when the component mounts
  useEffect(() => {
    console.log(categoryData, "00".repeat(100));
    
    if (categoryData) {
      setCategoryName(categoryData.category_name);
    }
  }, [categoryData]);

  const handleSave = () => {
    // Trigger the save callback with the new category name
    onSave({ ...categoryData, category_name: categoryName });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Category</h2>
          <button onClick={onCancel} className="text-gray-600 hover:text-red-500">
            <FaTimes />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category_name">
            Category Name
          </label>
          <input
            type="text"
            id="category_name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={ ()=> handleSave(categoryData)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
