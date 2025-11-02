import React, { useEffect, useState } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:6523/api/products"); // Backend endpoint
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data) {
          setProducts([data]); // wrap single object in array
        } else {
          setProducts([]);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="home-container max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-4 shadow hover:shadow-lg transition">
            <img
              src={`http://localhost:6523${product.imageUrl}`} // use correct field
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
