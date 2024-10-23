import React, { useEffect, useRef } from "react";
import { FaTimes } from 'react-icons/fa';

const DeleteCategory = ({ category, onConfirm, onCancel }) => {
  const popupRef = useRef(null);

  // Handle click outside to close the popup
  useEffect(() => {
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
  }, [onCancel]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div ref={popupRef} className="bg-white p-6 rounded-md shadow-lg w-1/3">
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
            className="p-2 w-full rounded-full text-lg text-white bg-[#0054ba] \d ease-in-out transform hover:bg-[#003a8f] group-hover:opacity-100 transition-opacity duration-300"
          >
             Delete
          </button>
          <button
            onClick={onCancel}
            className="p-2 w-full rounded-full text-lg text-white bg-[#0054ba] \d ease-in-out transform hover:bg-[#003a8f] group-hover:opacity-100 transition-opacity duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCategory;
