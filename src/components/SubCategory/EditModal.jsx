import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-tailwind/react";

const EditModal = ({ subcategory, categories, onSubmit, onClose, setSelectedCategory, selectedCategory }) => {
  const [subcategoryTitle, setSubcategoryTitle] = useState("");
  const modalRef = useRef(null); // Create a ref for the modal
   
  useEffect(() => {
    if (subcategory) {
      setSubcategoryTitle(subcategory.subcategory_title);
      // setSelectedCategory(subcategory.category_id);
    }
  }, [subcategory]);

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subcategoryTitle) {
      alert("Please enter a subcategory title.");
      return;
    }

    const category = categories.find(cat => cat.id === parseInt(selectedCategory));
    const categoryName = category ? category.category_name : "";

    onSubmit({
      id: subcategory.id,
      subcategory_title: subcategoryTitle,
      category_name: categoryName,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Edit Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Subcategory Title</label>
            <input
              type="text"
              value={subcategoryTitle}
              onChange={(e) => setSubcategoryTitle(e.target.value)}
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
            <Button type="button" onClick={onClose} className="p-2 text-xs text-white bg-[#0054ba] group-hover:opacity-100 transition-opacity duration-300">Cancel</Button>
            <Button type="submit" className="p-2 text-xs text-white bg-[#0054ba] group-hover:opacity-100 transition-opacity duration-300">Update</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
