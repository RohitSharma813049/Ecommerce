import { showError, showSuccess } from "@/utils";
import React, { useEffect, useState } from "react";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Cart Items for Logged-in User
  useEffect(() => {
    const fetchCart = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        showError("Please log in to view your cart!");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:6523/auth/cart/get/${userId}`);
        const data = await res.json();

        if (res.ok) {
          setCartItems(data.cartItems || []);
        } else {
          showError(data.message || "Failed to load cart");
        }
      } catch (error) {
        showError("Error fetching cart items");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // ✅ Delete item from cart
  const handleRemove = async (productId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return showError("Login required!");

    try {
      const res = await fetch(`http://localhost:6523/auth/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });

      const data = await res.json();
      if (res.ok) {
        showSuccess("🗑️ Item removed from cart");
        setCartItems((prev) =>
          prev.filter((item) => item.product._id !== productId)
        );
      } else {
        showError(data.message || "Failed to remove item");
      }
    } catch (error) {
      showError("Error removing item");
    }
  };

  // ✅ Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <img src="/empty-cart.png" alt="Empty Cart" className="w-56 mb-6" />
        <h2 className="text-2xl font-semibold">Your cart is empty 🛒</h2>
        <p className="text-gray-500 mt-2">Add items to get started!</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6">🛍 Your Cart</h2>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={
                    item.product.imageUrl
                      ? `http://localhost:6523${item.product.imageUrl}`
                      : "/placeholder.png"
                  }
                  alt={item.product.name}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-100"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">₹{item.product.price}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleRemove(item.product._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Total Section */}
        <div className="mt-8 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total:</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalPrice}</p>
        </div>

        <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
