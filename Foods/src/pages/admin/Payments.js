import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/payments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setPayments(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Monitoring</h1>
      <motion.table
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full border rounded-xl shadow-md"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Payment ID</th>
            <th className="p-3 text-left">User</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <motion.tr
              key={payment._id}
              whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
              className="border-t"
            >
              <td className="p-3">{payment._id}</td>
              <td className="p-3">{payment.user?.email}</td>
              <td className="p-3">₹{payment.amount}</td>
              <td className={`p-3 font-semibold ${payment.status === "success" ? "text-green-600" : "text-red-600"}`}>
                {payment.status}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default Payments;
