import React, { useState } from "react";

const NewCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !image) {
      setError("Please enter a name and upload an image.");
      return;
    }
    setError("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-gray-100 shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Category</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Category Image
          </label>
          <div className="w-52 h-36 p-2 border border-dashed border-gray-300 rounded cursor-pointer flex justify-center items-center bg-white relative">
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <div className="relative w-36 h-36">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 text-white bg-red-500 rounded-full w-8 h-8 flex justify-center items-center -mt-2 -mr-2"
                >
                  ×
                </button>
              </div>
            ) : (
              <span className="text-gray-500">Upload Category Image</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-[#0054ba] font-bold text-white p-3 rounded hover:bg-white hover:text-[#0054ba] transition"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
