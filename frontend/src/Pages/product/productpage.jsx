import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:6523/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading products...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        All Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-lg overflow-hidden shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <img
                src={`http://localhost:6523${product.imageUrl.startsWith("/")
                  ? product.imageUrl
                  : "/" + product.imageUrl}`}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                  {product.description || "No description available."}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    {product.cutPrice && (
                      <span className="ml-2 text-gray-400 line-through text-sm">
                        ₹{product.cutPrice}
                      </span>
                    )}
                  </div>
                  {product.offer > 0 && (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                      {product.offer}% OFF
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.name} added to cart`);
                    }}
                    className="flex-1 bg-yellow-400 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-500 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toast.success(`Buying ${product.name}`)}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
