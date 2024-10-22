import React from "react";
import { FaTimes } from 'react-icons/fa';

const DeleteCategory = ({ categoryData, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Delete Category</h2>
          <button onClick={onCancel} className="text-gray-600 hover:text-red-500">
            <FaTimes />
          </button>
        </div>

        <p className="mb-4">
          Are you sure you want to delete the category <strong>{category.category_name}</strong>?
        </p>

        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
