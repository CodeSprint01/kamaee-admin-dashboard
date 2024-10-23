import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";

const AlertModal = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  subCategoryTitle,
  setSubCategoryTitle,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState(false); // State to track loader
  const modalRef = useRef(null); // Create a ref for the modal

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader when submitting
    await onSubmit(); // Wait for submission to complete
    setLoading(false); // Hide loader after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Add New Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Subcategory Title
            </label>
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
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="gap-5 flex justify-between">
            <Button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-lg w-full text-white bg-[#0054ba] transition-opacity duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${
                loading ? "w-12 h-12" : "w-full h-12"
              } bg-[#0054ba] rounded-full text-white font-bold text-lg transition-all duration-500 ease-in-out transform hover:bg-[#003a8f] flex justify-center items-center`}
              disabled={loading} // Disable button while loading
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
              ) : (
                "Add "
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
