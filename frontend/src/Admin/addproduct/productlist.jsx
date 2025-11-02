import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:6523/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.products ?? data ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://localhost:6523/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return <p className="text-center py-8 text-lg text-gray-700">Loading products...</p>;
  if (error)
    return <p className="text-center py-8 text-red-600 text-lg">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[600px] bg-white border rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={product.imageUrl ? `http://localhost:6523${product.imageUrl}` : '/placeholder.png'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">
                    ₹{product.price}{' '}
                    <span className="line-through text-gray-400">₹{product.cutPrice}</span>
                  </td>
                  <td className="px-4 py-2">{product.stock}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
