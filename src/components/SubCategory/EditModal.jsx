import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const EditModal = ({ subcategory, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: subcategory.id,
    subcategory_title: subcategory.subcategory_title,
    category: subcategory.category,
    created_at: subcategory.created_at,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit Subcategory</h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Subcategory Title"
            name="subcategory_title"
            value={formData.subcategory_title}
            onChange={handleChange}
            required
          />
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-7"
          />
          <Input
            label="Added"
            name="created_at"
            value={formData.created_at}
            className="mt-7"
          />
          <div className="flex justify-end mt-10">
            <Button type="button" color="red" onClick={onClose} className="mr-2 bg-slate-700 text-white p-2">
              Cancel
            </Button>
            <Button type="submit" color="blue" className="bg-slate-700 text-white p-2">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
