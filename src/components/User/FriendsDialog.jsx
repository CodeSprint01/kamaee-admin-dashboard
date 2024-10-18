import React from 'react';
import { Typography } from '@material-tailwind/react';

const FriendsDialog = ({ open, onClose, friends }) => {
  if (!open) return null; 

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" 
      onClick={onClose} 
    >
      <div 
        className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg h-auto overflow-y-auto max-h-96 relative" 
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-blue-500 text-3xl hover:text-blue-700 focus:outline-none"
          aria-label="Close"
        >
          &times; {/* Big cross icon */}
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">User Friends</h2>
        {friends.length > 0 ? (
          friends.map((friend, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{friend.first_name} {friend.last_name}</p>
              <p>Email: {friend.email}</p>
              <p>Phone: {friend.phone_number}</p>
              <hr />
            </div>
          ))
        ) : (
          <Typography variant="small" color="blue-gray" className="font-normal text-center">
            No friends available
          </Typography>
        )}
      </div>
    </div>
  );
};

export default FriendsDialog;
