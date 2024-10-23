import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Typography, Button } from '@material-tailwind/react';
import EditGig from './EditGig'; 

const Gigs = () => {
  const [gigs, setGigs] = useState([]); // Ensure gigs is initialized as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [selectedGig, setSelectedGig] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJhbGlyYXphMTE4MDQxQGdtYWlsLmNvbSIsImNuaWMiOiIzNTMwMjg1ODk3NTY1IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJidXllciIsInN0YXR1cyI6bnVsbCwiYWNjb3VudF9zdGF0dXMiOm51bGwsInBob25lX251bWJlciI6IjAzMDExMzM5MzgxIiwiYmlrZV9udW1iZXIiOm51bGwsImFkZHJlc3MiOiJMYWtzaG1pIENob3drIExhaG9yZSIsImltYWdlIjpudWxsLCJyYXRpbmdzIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJvdHAiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTkwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTdUMTk6MTA6MTQuMDAwWiIsImxvY2F0aW9uIjp7ImlkIjozOSwidXNlcl9pZCI6MzksImxhdGl0dWRlIjozNS45OTksImxvbmdpdHVkZSI6NDUsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiJ9LCJpYXQiOjE3Mjk1OTk0NDEsImV4cCI6MTczNzM3NTQ0MX0.xMHZl4WpjKpaztOQsFsr14ER9_7hiKBJsOiTBQj_y1o";

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/user/gigs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", response.data); 
        setGigs(Array.isArray(response.data.Gigs) ? response.data.Gigs : []); 
      } catch (error) {
        setError("Error fetching gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [token]);

  const handleEdit = (gig) => {
    setSelectedGig(gig);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (gigId) => {
    try {
      await axios.delete(`https://api.kamaee.pk/api/delete/gig/${gigId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGigs(gigs.filter((gig) => gig.id !== gigId)); 
    } catch (error) {
      setError("Error deleting gig");
    } finally {
      setIsDeleteConfirmationOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const updateGig = async (updatedGig) => {
    console.log("Updating gig with data:", updatedGig);
    try {
      const response = await axios.post(`https://api.kamaee.pk/api/update/gig/${updatedGig.id}`, updatedGig, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Gig updated successfully:", response.data);
    } catch (error) {
      setError("Error updating gig:",  error.response ? error.response.data : error.message);
    }
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

  const TABLE_HEAD = [
    "Gig Title", "Price", "Active", "Deleted", 
    "Interaction Method", "Created At", "Updated At", "Actions"
  ];

  return (
    <div className="mt-12 mx-7">
      <div className="overflow-hidden">
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
              {gigs.length === 0 ? (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      No gigs available
                    </Typography>
                  </td>
                </tr>
              ) : (
                gigs.map((gig) => {
                  return (
                    <tr key={gig.id}>
                      <td className="p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">{gig.gig_title || "N/A"}</Typography>
                      </td>
                      <td className="p-4">${gig.price || "N/A"}</td>
                      <td className="p-4">{gig.isActive ? <AiFillCheckCircle className="text-green-500" /> : <AiFillCloseCircle className="text-red-500" />}</td>
                      <td className="p-4">{gig.isDeleted ? <AiFillCloseCircle className="text-red-500" /> : <AiFillCheckCircle className="text-green-500" />}</td>
                      <td className="p-4">{gig.interact_method || "N/A"}</td>
                      <td className="p-4">{new Date(gig.created_at).toLocaleString() || "N/A"}</td>
                      <td className="p-4">{new Date(gig.updated_at).toLocaleString() || "N/A"}</td>
                      <td className="p-4">
                        <Button variant="text"  color="blue" onClick={() => handleEdit(gig)}>Edit</Button>
                        <Button variant="text" color="red" className="ml-2" onClick={() => {
                          setSelectedGig(gig);
                          setIsDeleteConfirmationOpen(true);
                        }}>Delete</Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {isDeleteConfirmationOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold">Are you sure you want to delete this gig: {selectedGig?.gig_title}?</h2>
            <div className="flex justify-end mt-4">
              <button onClick={cancelDelete} className="mr-2 bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={() => handleDelete(selectedGig?.id)} className="bg-red-600 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Gig Popup */}
      {isEditDialogOpen && (
        <EditGig 
          gig={selectedGig} 
          updateGig={updateGig} 
          onClose={() => setIsEditDialogOpen(false)} 
        />
      )}
    </div>
  );
};

export default Gigs;
