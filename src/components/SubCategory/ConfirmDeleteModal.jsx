import React, { useState, useRef, useEffect } from "react";
import { Button } from "@material-tailwind/react";

const ConfirmDeleteModal = ({ itemName, onDeleteConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null); // Create a ref for the modal

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

  const handleDelete = async () => {
    setLoading(true);
    await onDeleteConfirm();
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg p-6 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete the subcategory:{" "}
          <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-between gap-5 mt-4">
          <Button
            onClick={onClose}
            className="p-2 w-full rounded-full text-lg text-white bg-[#0054ba] group-hover:opacity-100 transition-opacity duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className={`${
              loading ? "w-12 h-12" : "p-2 text-lg w-full"
            } text-white bg-[#0054ba] rounded-full transition-all duration-300 ease-in-out transform hover:bg-[#003a8f] flex justify-center items-center`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
