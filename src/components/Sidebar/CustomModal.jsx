import React from 'react';

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-gray-700 rounded-lg shadow-lg p-6 z-10 max-w-md w-full mx-4 sm:mx-0">
        <h2 className="text-lg font-semibold mb-4">Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-[#0054ba] rounded hover:bg-white hover:text-[#0054ba]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#0054ba] text-white rounded hover:bg-white hover:text-[#0054ba]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
