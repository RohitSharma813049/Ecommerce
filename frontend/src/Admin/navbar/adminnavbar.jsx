import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaShoppingCart, FaCog, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../app/reducer/user";

export function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { to: "/", label: "Home", icon: null },
    { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { to: "/admin/users", label: "Users", icon: <FaUsers /> },
    { to: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
    { to: "/admin/addproduct", label: "Add Product", icon: <FaCog /> },
    { to: "/admin/products", label: "Product List", icon: <FaCog /> },
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Title */}
          <div className="flex-shrink-0 font-bold text-2xl">Admin Panel</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none text-2xl">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 px-2 pt-2 pb-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)} // close menu after click
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-700 ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 w-full mt-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
}
