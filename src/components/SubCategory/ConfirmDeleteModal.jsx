import React from "react";
import { Button } from "@material-tailwind/react";

const ConfirmDeleteModal = ({ itemName, onDeleteConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the subcategory: <strong>{itemName}</strong>?</p>
        <div className="flex justify-between mt-4">
          <Button onClick={onDeleteConfirm} className="bg-red-600 text-white">Delete</Button>
          <Button onClick={onClose} className="text-gray-500">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
