import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:6523/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // 🕑 Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  // ❌ Error state
  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  // ⚠️ Product not found
  if (!product)
    return (
      <div className="text-center text-yellow-600 mt-10">
        Product not found
      </div>
    );

  // ✅ Handle imageUrl (backend sends only one image)
  const imageUrl = product.imageUrl
    ? `http://localhost:6523${product.imageUrl}`
    : "/placeholder.png";

  // ✅ Add to Cart Function
  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please log in to add items to your cart!");
      return;
    }

    setAdding(true);
    try {
      const res = await fetch(`http://localhost:6523/auth/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: id,
          quantity,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🛒 Product added to cart!");
      } else {
        toast.error(`❌ Failed to add to cart: ${data.message}`);
      }
    } catch (err) {
      toast.error("❌ Error adding to cart");
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* 🖼 Product Image */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-4 aspect-square flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={product.name}
                  onError={(e) => (e.target.src = "/placeholder.png")}
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>
            </div>

            {/* 🧾 Product Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>

                <div className="text-3xl font-bold text-green-600">
                  ₹{product.price}
                </div>

                {/* 📦 Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span>Quantity:</span>
                  <div className="flex border rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4"
                    >
                      −
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-4"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* 🛒 Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`mt-6 w-full py-3 rounded-lg font-semibold ${
                  adding
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600 text-black"
                }`}
              >
                {adding ? "Adding..." : "🛒 Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
