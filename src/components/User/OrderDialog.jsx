import React, { useState } from 'react';
import { Typography } from '@material-tailwind/react';

const OrderDialog = ({ open, onClose, orders }) => {
  const [filterType, setFilterType] = useState('orderId'); // 'orderId' or 'orderMethod'
  const [searchTerm, setSearchTerm] = useState('');

  if (!open) return null;

  // Filter orders based on search term and filter type
  const filteredOrders = orders.filter((order) => {
    if (filterType === 'orderId') {
      return order.id.toString().includes(searchTerm);
    } else if (filterType === 'orderMethod') {
      return order.delivery_method.toLowerCase().includes(searchTerm.toLowerCase());
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

        <h2 className="text-2xl font-semibold mb-4 text-center">User Orders</h2>

        {/* Filter Section */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2"> {/* Flex container for side-by-side layout */}
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)} 
              className="border border-gray-300 p-2 rounded"
            >
              <option value="orderId">Order ID</option>
              <option value="orderMethod">Order Method</option>
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

        {filteredOrders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border-b border-gray-300 p-2">Order ID</th>
                <th className="border-b border-gray-300 p-2">Total Amount</th>
                <th className="border-b border-gray-300 p-2">Order Status</th>
                <th className="border-b border-gray-300 p-2">Delivery Method</th>
                <th className="border-b border-gray-300 p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border-b border-gray-300 p-2">{order.id}</td>
                  <td className="border-b border-gray-300 p-2">{order.total_amount}</td>
                  <td className="border-b border-gray-300 p-2">{order.order_status}</td>
                  <td className="border-b border-gray-300 p-2">{order.delivery_method}</td>
                  <td className="border-b border-gray-300 p-2">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography variant="small" color="blue-gray" className="font-normal text-center">
            No orders available
          </Typography>
        )}
      </div>
    </div>
  );
};

export default OrderDialog;
