import React from 'react';

const AlertModal = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  subCategoryTitle,
  setSubCategoryTitle,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Subcategory</h2>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          <div>
            <label htmlFor="subcategory-title">SubCategory Title:</label>
            <input
              type="text"
              id="subcategory-title"
              value={subCategoryTitle}
              onChange={(e) => setSubCategoryTitle(e.target.value)}
              required
              className="ml-3 border border-black"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="category-dropdown">Select Category:</label>
            <select
              id="category-dropdown"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="ml-3 border border-black"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-slate-600 text-white p-2 rounded mt-4"
            >
              Add Subcategory
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white p-2 rounded ml-2 mt-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlertModal;
