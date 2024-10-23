import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Typography, Button } from '@material-tailwind/react';

const EditGig = ({ gig, onClose, updateGig }) => {
  const [formData, setFormData] = useState({
    title: gig.title || '',
    price: gig.price || '',
    interaction_method: gig.interaction_method || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedData = {
      id: gig.id, 
      gig_title: formData.title,
      price: formData.price,
      interact_method: formData.interaction_method,
    };
    console.log('Updated gig data:', updatedData);
    updateGig(updatedData); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h6" color="blue-gray" className="font-bold">
            Edit Gig
          </Typography>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <AiOutlineClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Gig Title</label>
            <input
              type="text"
              name="title"
              value={formData.gig_title}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>
         

          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Interaction Method</label>
            <input
              type="text"
              name="interaction_method"
              value={formData.interact_method}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGig;