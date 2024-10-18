import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { Typography } from '@material-tailwind/react';

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksIm90cFRpbWUiOm51bGwsImZpcnN0X25hbWUiOiJBbGkiLCJsYXN0X25hbWUiOiJSYXphIiwiZW1haWwiOiJhbGlyYXphMTE4MDQxQGdtYWlsLmNvbSIsImNuaWMiOiIzNTMwMjg1ODk3NTY1IiwiaXNBY3RpdmUiOnRydWUsInJvbGUiOiJidXllciIsInN0YXR1cyI6bnVsbCwiYWNjb3VudF9zdGF0dXMiOm51bGwsInBob25lX251bWJlciI6IjAzMDExMzM5MzgxIiwiYmlrZV9udW1iZXIiOm51bGwsImFkZHJlc3MiOiJMYWtzaG1pIENob3drIExhaG9yZSIsImltYWdlIjpudWxsLCJyYXRpbmdzIjpudWxsLCJjcmVhdGVkX2J5IjpudWxsLCJvdHAiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTkwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTdUMTk6MTA6MTQuMDAwWiIsImxvY2F0aW9uIjp7ImlkIjozOSwidXNlcl9pZCI6MzksImxhdGl0dWRlIjozNS45OTksImxvbmdpdHVkZSI6NDUsImNyZWF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiIsInVwZGF0ZWRBdCI6IjIwMjQtMTAtMTZUMTA6NDM6NDAuNTk0WiJ9LCJpYXQiOjE3MjkyNDY5NDcsImV4cCI6MTczNzAyMjk0N30.4tMJ388Ge9NpOJlQmqnXE6cGCWQQIrbhVuRUaUzkWpE"; 

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const response = await axios.get("https://api.kamaee.pk/api/user/gigs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('Response data:', response.data); 
        
        
        setGigs(response.data);
      } catch (error) {
        console.error('Error fetching gigs:', error); 
        setError("Error fetching gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, [token]);

  if (loading) {
    return <div>Loading gigs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const TABLE_HEAD = [
    "Gig Title", "Category", "Sub-category", "Price", "Active", "Deleted", 
    "Interaction Method", "Created At", "Updated At"
  ];

  return (
    <div className="mt-15 mx-7">
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
                gigs["Gigs"].map((gig, index) => {
                  const isLast = index === gigs.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                 
                  return (
                    <tr key={gig.id} className={index % 2 !== 0 ? "bg-gray-100" : ""}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.title || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.category || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.sub_category || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          ${gig.price || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {gig.isActive ? (
                          <AiFillCheckCircle className="text-green-500 text-xl" />
                        ) : (
                          <AiFillCloseCircle className="text-red-500 text-xl" />
                        )}
                      </td>
                      <td className={classes}>
                        {gig.isDeleted ? (
                          <AiFillCloseCircle className="text-red-500 text-xl" />
                        ) : (
                          <AiFillCheckCircle className="text-green-500 text-xl" />
                        )}
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.interaction_method || "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.createdAt ? new Date(gig.createdAt).toLocaleString() : "N/A"}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {gig.updatedAt ? new Date(gig.updatedAt).toLocaleString() : "N/A"}
                        </Typography>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Gigs;
