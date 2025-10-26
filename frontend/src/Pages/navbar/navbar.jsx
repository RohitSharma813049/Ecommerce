import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/reducer/user"; // adjust path if needed

export function UserNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token, role, isAuthenticated } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0); // adjust if your state structure is different

  const handleLogout = () => {
    dispatch(logout());
    // Only remove auth-related items from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/account/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">MyStore</Link>
      </div>

      <nav className="flex space-x-4">
        <Link to="/category/men" className="hover:text-blue-500">
          Men
        </Link>
        <Link to="/category/women" className="hover:text-blue-500">
          Women
        </Link>
        <Link to="/category/accessories" className="hover:text-blue-500">
          Accessories
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <input
          type="search"
          aria-label="Search products"
          placeholder="Search products…"
          className="border rounded px-2 py-1"
        />

        <Link to="/cart" className="relative">
          <HiOutlineShoppingCart className="w-6 h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {cartCount}
            </span>
          )}
        </Link>

        {isAuthenticated ? (
          <>
            <span className="mr-2">Hi, {user?.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="hover:text-blue-500"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/account/login" className="hover:text-blue-500">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
