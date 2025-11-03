import React from "react";


function CartPage() {
  const { cart, total, removeFromCart } = useCart();

  if (cart.length === 0)
    return <p className="text-center mt-10">Your cart is empty 🛒</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id} className="flex justify-between items-center border-b py-3">
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-gray-500">₹{item.price} × {item.quantity}</p>
          </div>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="text-right mt-4 font-semibold text-xl">
        Total: ₹{total}
      </div>
    </div>
  );
}

export default CartPage;
