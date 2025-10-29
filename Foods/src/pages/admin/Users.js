import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setUsers(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <motion.table
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full border rounded-xl shadow-md"
      >
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">User ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <motion.tr
              key={user._id}
              whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
              className="border-t"
            >
              <td className="p-3">{user._id}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.role}</td>
              <td className="p-3">
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default Users;
