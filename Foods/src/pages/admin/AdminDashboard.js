import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BarChart3, ShoppingCart, CreditCard, Users } from "lucide-react";

const Dashboard = () => {
  const cards = [
    { title: "Orders", icon: <ShoppingCart size={32} />, link: "/admin/orders", color: "bg-blue-500" },
    { title: "Payments", icon: <CreditCard size={32} />, link: "/admin/payments", color: "bg-green-500" },
    { title: "Users", icon: <Users size={32} />, link: "/admin/users", color: "bg-purple-500" },
    { title: "Analytics", icon: <BarChart3 size={32} />, link: "#", color: "bg-pink-500" }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className={`${card.color} text-white rounded-2xl p-6 shadow-lg cursor-pointer`}
          >
            <Link to={card.link} className="flex flex-col items-center">
              {card.icon}
              <h2 className="mt-3 text-xl font-semibold">{card.title}</h2>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
