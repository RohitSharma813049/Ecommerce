import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../../app/reducer/user";  // Adjust the import path if needed

export function AdminNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action to clear auth state
    dispatch(logout());

    // Clear token and user info from localStorage (if stored there)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect user to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white flex items-center justify-between px-6 py-3">
      <h2 className="text-2xl font-bold">Admin Panel</h2>

      <ul className="flex space-x-6 items-center">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUsers />
            <span>Users</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaShoppingCart />
            <span>Orders</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/addproduct"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-700 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaCog />
            <span>AddProduct</span>
          </NavLink>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-3 py-2 rounded bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
