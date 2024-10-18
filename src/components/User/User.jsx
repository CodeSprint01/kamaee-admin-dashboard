import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Typography } from '@material-tailwind/react';
import OrderDialog from './OrderDialog'; 
import FriendsDialog from './FriendsDialog.jsx'; 

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]); 
  const [selectedFriends, setSelectedFriends] = useState([]); 
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [isFriendsDialogOpen, setIsFriendsDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBcmhhbSIsImxhc3RfbmFtZSI6IlNhcndhciIsImVtYWlsIjoiYXJoYW1zYXJ3YXJzZWN1cmVob3BzQGdtYWlsLmNvbSIsImNuaWMiOiIzMjkzMjc0ODkzNzU4IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJzZWxsZXIiLCJzdGF0dXMiOm51bGwsImFjY291bnRfc3RhdHVzIjpudWxsLCJwaG9uZV9udW1iZXIiOiIwMzAxMTExMTExMSIsImJpa2VfbnVtYmVyIjpudWxsLCJhZGRyZXNzIjoiU2VjdXJlaG9wc0BnbWFpbC5jb20iLCJpbWFnZSI6bnVsbCwicmF0aW5ncyI6bnVsbCwiY3JlYXRlZF9ieSI6bnVsbCwib3RwIjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTEwLTE3VDA3OjM2OjIwLjkwNFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTE3VDA3OjM2OjIwLjkwNFoiLCJsb2NhdGlvbiI6eyJpZCI6NDMsInVzZXJfaWQiOjQzLCJsYXRpdHVkZSI6MzUuOTk5LCJsb25naXR1ZGUiOjQ1LCJjcmVhdGVkQXQiOiIyMDI0LTEwLTE3VDA3OjM2OjIwLjkxM1oiLCJ1cGRhdGVkQXQiOiIyMDI0LTEwLTE3VDA3OjM2OjIwLjkxM1oifSwiaWF0IjoxNzI5MTUxNDg2LCJleHAiOjE3MzY5Mjc0ODZ9.FFwbBh8P2qZFlKAtT-xMD6MwBV44DBjXYx3b4Wtqugg"; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleViewOrders = (orders) => {
    setSelectedOrders(orders); 
    setIsOrderDialogOpen(true); 
  };

  const handleViewFriends = (friends) => {
    setSelectedFriends(friends); 
    setIsFriendsDialogOpen(true); 
  };

  const handleEditUser = (user) => {
    setCurrentUser(user); // Set the current user for editing
    setIsEditDialogOpen(true); // Open the edit dialog
  };

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId); // Set the user to delete
    setIsDeleteConfirmationOpen(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`https://api.kamaee.pk/api/users/${userToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Refresh the user list after deletion
        setUsers(users.filter(user => user.id !== userToDelete));
      } catch (error) {
        setError("Error deleting user");
      }
      setIsDeleteConfirmationOpen(false); // Close the confirmation dialog
      setUserToDelete(null); // Reset the user to delete
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setUserToDelete(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://api.kamaee.pk/api/users/${currentUser.id}`, currentUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the user list
      setUsers(users.map(user => (user.id === currentUser.id ? currentUser : user)));
    } catch (error) {
      setError("Error updating user");
    }
    setIsEditDialogOpen(false); // Close the edit dialog
    setCurrentUser(null); // Reset the current user
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const TABLE_HEAD = ["First Name", "Last Name", "Email", "Phone Number", "CNIC", "Status", "Image", "Orders", "Friends", "Actions"];

  return (
    <div className="mt-15 mx-7">
      <div className="overflow-hidden">
        {/* Scrollable container for the table */}
        <div className="overflow-x-auto">
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
              {users.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      No users available
                    </Typography>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => {
                  const isLast = index === users.length - 1;
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
                      <td className={classes + " flex space-x-2"}>
                        {/* Edit Button */}
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:underline"
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
      </div>

      {/* Order Dialog */}
      <OrderDialog
        open={isOrderDialogOpen}
        onClose={() => setIsOrderDialogOpen(false)}
        orders={selectedOrders}
      />

      {/* Friends Dialog */}
      <FriendsDialog
        open={isFriendsDialogOpen}
        onClose={() => setIsFriendsDialogOpen(false)}
        friends={selectedFriends}
      />

      {/* Delete Confirmation Dialog */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Are you sure you want to delete this user?
            </Typography>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={cancelDelete} 
                className="bg-gray-300 text-gray-700 py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete} 
                className="bg-red-600 text-white py-1 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Dialog */}
      {isEditDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-4 rounded shadow-lg w-80 max-h-[80vh] overflow-y-auto"
          >
            <Typography variant="h6" color="blue-gray" className="mb-4">
              Edit User
            </Typography>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="First Name"
                value={currentUser.first_name}
                onChange={(e) => setCurrentUser({ ...currentUser, first_name: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={currentUser.last_name}
                onChange={(e) => setCurrentUser({ ...currentUser, last_name: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={currentUser.email}
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="CNIC"
                value={currentUser.cnic}
                onChange={(e) => setCurrentUser({ ...currentUser, cnic: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={currentUser.password}
                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Role"
                value={currentUser.role}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={currentUser.phone_number}
                onChange={(e) => setCurrentUser({ ...currentUser, phone_number: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Latitude"
                value={currentUser.latitude}
                onChange={(e) => setCurrentUser({ ...currentUser, latitude: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Longitude"
                value={currentUser.longitude}
                onChange={(e) => setCurrentUser({ ...currentUser, longitude: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Account Number"
                value={currentUser.account_number}
                onChange={(e) => setCurrentUser({ ...currentUser, account_number: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                placeholder="Payment Type"
                value={currentUser.payment_type}
                onChange={(e) => setCurrentUser({ ...currentUser, payment_type: e.target.value })}
                className="border border-gray-300 p-2 rounded"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button 
                onClick={() => setIsEditDialogOpen(false)} 
                className="bg-gray-300 text-gray-700 py-1 px-4 rounded"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 text-white py-1 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default User;
