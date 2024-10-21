import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';

const FriendsDialog = ({ open, onClose, friends }) => {
  const [filterType, setFilterType] = useState('email'); // Default to filtering by email
  const [searchTerm, setSearchTerm] = useState('');

  if (!open) return null;

  // Filter friends based on search term and filter type
  const filteredFriends = friends.filter((friend) => {
    if (filterType === 'email') {
      return friend.email.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === 'phone') {
      return friend.phone_number.includes(searchTerm);
    }
    return true;
  });

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

        {/* Filter Section */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2"> {/* Flex container for side-by-side layout */}
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)} 
              className="border border-gray-300 p-2 rounded"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>

            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend, index) => (
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
