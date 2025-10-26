import React, { useEffect, useState } from 'react';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:6523/admin/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // or get token from redux/context
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await res.json();
        setProducts(data.products || []); // adjust based on your API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product) => (
            <li key={product._id} className="border p-4 rounded shadow">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>Price:</strong> ₹{product.price} &nbsp;
                <span className="line-through text-gray-500">₹{product.cutPrice}</span>
              </p>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>Stock:</strong> {product.stock}
              </p>
              {/* You can add Edit/Delete buttons here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
