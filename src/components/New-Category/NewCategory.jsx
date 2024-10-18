import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewCategory = ({ onCategoryAdded = () => {} }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate(); 
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJhbGlyYXphMTE4MDQxQGdtYWlsLmNvbSIsImNuaWMiOiIzNTMwMjg1ODk3NTY1IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJidXllciIsInN0YXR1cyI6bnVsbCwiYWNjb3VudF9zdGF0dXMiOm51bGwsInBob25lX251bWJlciI6IjAzMDExMzM5MzgxIiwiYmlrZV9udW1iZXIiOm51bGwsImFkZHJlc3MiOiJMYWtzaG1pIENob3drIExhaG9yZSIsImltYWdlIjpudWxsLCJyYXRpbmdzIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJvdHAiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzAxWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTZUMDg6MDU6MDkuMDAwWiIsImxvY2F0aW9uIjp7ImlkIjozMSwidXNlcl9pZCI6MzEsImxhdGl0dWRlIjozNS45OTksImxvbmdpdHVkZSI6NDUsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzExWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTVUMTk6MjU6NDEuNzExWiJ9LCJpYXQiOjE3MjkwNjY2MjcsImV4cCI6MTczNjg0MjYyN30.eihIWaxOMJa_xdv6uC3QYwikzyuoX9tQEePIlyufYKA"; 

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !image) {
      setError("Please enter a name and upload an image.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("category_name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://api.kamaee.pk/api/category",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Category added:", response.data);
      onCategoryAdded(response.data.category);
      setName("");
      setImage(null);
      setImagePreview(null);
      setError("");
      
   
      navigate("/category"); 

    } catch (error) {
      console.error("Full error response:", error.response);
      setError("Error adding category: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-5 p-8 bg-gray-100 shadow-lg rounded"> 
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

        <div className="flex justify-center">
        <button
          type="submit"
          className={`${
            isLoading
              ? "w-12 h-12"
              : "w-full h-12"
          } bg-[#2154c0] rounded-full text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:bg-[#203aa1] flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
          ) : (
            "Add Category "
          )}
        </button>
        </div>
      </form>
    </div>
  );
};

export default NewCategory;
