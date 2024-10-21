import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";

const AlertModal = ({ categories, selectedCategory, setSelectedCategory, subCategoryTitle, setSubCategoryTitle, onSubmit, onClose }) => {
  // Use effect to manage body scroll
  useEffect(() => {
    // Disable scrolling when modal is open
    document.body.style.overflow = "hidden";
    
    // Enable scrolling when modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Subcategory Title</label>
            <input
              type="text"
              value={subCategoryTitle}
              onChange={(e) => setSubCategoryTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <Button type="submit" className="p-2 text-xs text-white bg-[#0054ba] group-hover:opacity-100 transition-opacity duration-300">Add</Button>
            <Button type="button" onClick={onClose} className="p-2 text-xs text-white bg-[#0054ba] group-hover:opacity-100 transition-opacity duration-300">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
