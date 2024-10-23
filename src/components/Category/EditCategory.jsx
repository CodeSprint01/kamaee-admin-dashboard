import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from 'react-icons/fa';

const EditCategory = ({ categoryData, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState("");
  const popupRef = useRef(null);

  // Set the initial category name when the component mounts
  useEffect(() => {
    if (categoryData) {
      setCategoryName(categoryData.category_name);
    }

    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onCancel(); // Close popup if clicked outside
      }
    };

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up event listener and restore background scrolling
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [categoryData, onCancel]);

  const handleSave = () => {
    onSave({ ...categoryData, category_name: categoryName });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div ref={popupRef} className="bg-white p-6 rounded-md shadow-lg w-1/3">
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
            className="p-2 w-full rounded-full text-lg text-white bg-[#0054ba] \d ease-in-out transform hover:bg-[#003a8f] group-hover:opacity-100 transition-opacity duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="p-2 w-full rounded-full text-lg text-white bg-[#0054ba] \d ease-in-out transform hover:bg-[#003a8f] group-hover:opacity-100 transition-opacity duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
