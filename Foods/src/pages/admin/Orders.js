import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <motion.table
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full border rounded-xl shadow-lg"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Order ID</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <motion.tr
              key={order._id}
              whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
              className="border-t"
            >
              <td className="p-3">{order._id}</td>
              <td className="p-3">{order.user?.email}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3 font-semibold">₹{order.totalAmount}</td>
              <td className="p-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Update
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default Orders;
