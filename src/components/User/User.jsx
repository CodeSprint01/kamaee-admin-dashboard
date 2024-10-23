import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Typography } from '@material-tailwind/react';
import { FaTimes } from 'react-icons/fa'; 
import OrderDialog from './OrderDialog'; 
import FriendsDialog from './FriendsDialog'; 
import EditDialog from './EditDialog';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('email');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isFriendsDialogOpen, setIsFriendsDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJhbGlyYXphMTE4MDQxQGdtYWlsLmNvbSIsImNuaWMiOiIzNTMwMjg1ODk3NTY1IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJidXllciIsInN0YXR1cyI6bnVsbCwiYWNjb3VudF9zdGF0dXMiOm51bGwsInBob25lX251bWJlciI6IjAzMDExMzM5MzgxIiwiYmlrZV9udW1iZXIiOm51bGwsImFkZHJlc3MiOiJMYWtzaG1pIENob3drIExhaG9yZSIsImltYWdlIjpudWxsLCJyYXRpbmdzIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJvdHAiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTkwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTdUMTk6MTA6MTQuMDAwWiIsImxvY2F0aW9uIjp7ImlkIjozOSwidXNlcl9pZCI6MzksImxhdGl0dWRlIjozNS45OTksImxvbmdpdHVkZSI6NDUsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiJ9LCJpYXQiOjE3MjkyNDY5NDcsImV4cCI6MTczNzAyMjk0N30.4tMJ388Ge9NpOJlQmqnXE6cGCWQQIrbhVuRUaUzkWpE"; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    const filtered = users.filter(user => {
      if (filterType === 'email') {
        return user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      } else if (filterType === 'phone') {
        return user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      } else if (filterType === 'cnic') {
        return user.cnic?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      } else {
        return false;
      }
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filterType, users]);

  const handleViewOrders = (orders) => {
    setSelectedOrders(orders); 
    setIsOrderDialogOpen(true); 
  };

  const handleClearSearch = () => {
    setSearchTerm(''); // Clear the search term
  };

  const handleViewFriends = (friends) => {
    setSelectedFriends(friends); 
    setIsFriendsDialogOpen(true); 
  };

  const handleEditUser = (user) => {
    setCurrentUser(user); 
    setIsEditDialogOpen(true); 
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId); 
    setIsDeleteConfirmationOpen(true); 
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://api.kamaee.pk/api/users/${userToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter(user => user.id !== userToDelete));
      } catch (error) {
        setError("Error deleting user");
      }
      setIsDeleteConfirmationOpen(false); 
      setUserToDelete(null); 
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setUserToDelete(null);
  };

  const handleEditSubmit = async (userData) => {
    try {
      await axios.put(`https://api.kamaee.pk/api/users/${userData.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map(user => (user.id === userData.id ? userData : user)));
    } catch (error) {
      setError("Error updating user");
    }
    setIsEditDialogOpen(false); 
    setCurrentUser(null); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-12 h-12 mr-2 animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08172 50.5908C9.08172 73.242 27.349 91.5092 50 91.5092C72.651 91.5092 90.9183 73.242 90.9183 50.5908C90.9183 27.9397 72.651 9.67256 50 9.67256C27.349 9.67256 9.08172 27.9397 9.08172 50.5908Z"
              fill="currentColor"  // This will use the current text color
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5538C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7236 75.2124 7.4129C69.5422 4.10219 63.2754 1.94025 56.7221 1.05122C51.7666 0.36736 46.7397 0.44618 41.8224 1.27873C39.3076 1.69969 37.8173 4.19778 38.4544 6.62326C39.0915 9.04874 41.5717 10.4717 44.0864 10.1071C47.9024 9.51986 51.7913 9.48838 55.6335 10.0172C60.8521 10.7506 65.8413 12.614 70.2762 15.4649C74.7112 18.3157 78.4851 22.104 81.3705 26.615C83.7451 30.2107 85.4557 34.1872 86.4299 38.3687C87.053 40.7242 89.5423 42.1339 91.9676 41.4967Z"
              fill="#3B82F6"  // Set this to blue color
            />
          </svg>
          <span className="text-blue-600 font-semibold">Loading...</span>
        </div>
      </div>
    );
  }
  

  if (error) {
    return <div>{error}</div>;
  }

  const TABLE_HEAD = ["First Name", "Last Name", "Email", "Phone Number", "CNIC", "Status", "Image", "Orders", "Friends", "Actions"];

  return (
    <div className="mt-11">
      {/* Search and Filter Section */}
      <div className="mb-4 flex items-center">
        <div className="mr-4 ">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="cnic">CNIC</option>
          </select>
        </div>

        <input
          type="text"
          placeholder={`Search by ${filterType}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />

{searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-10 top-3/3 transform -translate-y-3/2 text-gray-500"
              aria-label="Clear Search"
            >
              <FaTimes />
            </button>
          )}
      </div>

      {/* Scrollable container for the table */}
      <div className="overflow-x-scroll ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-gray-300 bg-gray-200 p-4">
                  <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    No users available
                  </Typography>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => {
                const isLast = index === filteredUsers.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                return (
                  <tr key={user.id} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.first_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.last_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.phone_number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user.cnic}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {user.isActive ? (
                        <AiFillCheckCircle className="text-green-500 text-xl" />
                      ) : (
                        <AiFillCloseCircle className="text-red-500 text-xl" />
                      )}
                    </td>
                    <td className={classes}>
                      <img
                        src={`https://api.kamaee.pk${user.image}`}
                        alt={user.first_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => handleViewOrders(user.orders)}
                        className="text-pink-600 hover:underline"
                      >
                        View Orders
                      </button>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => handleViewFriends(user.friends)} 
                        className="text-pink-600 hover:underline"
                      >
                        View Friends
                      </button>
                    </td>
                    <td className={classes}>
                      <button
                        onClick={() => handleEditUser(user)} 
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)} 
                        className="text-red-600 hover:underline ml-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Dialog Components */}
      <OrderDialog 
        open={isOrderDialogOpen} 
        orders={selectedOrders} 
        onClose={() => setIsOrderDialogOpen(false)} 
      />
      <FriendsDialog 
        open={isFriendsDialogOpen} 
        friends={selectedFriends} 
        onClose={() => setIsFriendsDialogOpen(false)} 
      />
      <EditDialog 
        open={isEditDialogOpen} 
        user={currentUser} 
        onClose={() => setIsEditDialogOpen(false)} 
        onSubmit={handleEditSubmit} 
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Are you sure you want to delete this user?</h2>
            <div className="flex justify-end mt-4">
              <button onClick={cancelDelete} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
