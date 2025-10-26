import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  const { id } = useParams(); // grab product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`http://localhost:6523/admin/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // adapt to your auth logic
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();
        setProduct(data.product); // assuming API responds with { product: {...} }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <img
        src={`http://localhost:6523${product.imageUrl}`}
        alt={product.name}
        className="mb-4 max-h-96 object-contain"
      />
      <p className="mb-2">{product.description}</p>
      <p className="mb-1">
        <strong>Category:</strong> {product.category} {product.subCategory && ` > ${product.subCategory}`}
      </p>
      <p className="mb-1">
        <strong>Price:</strong> ₹{product.price}{" "}
        <span className="line-through text-gray-500">₹{product.cutPrice}</span>
      </p>
      <p className="mb-1">
        <strong>Stock:</strong> {product.stock}
      </p>
      <p>
        <strong>Offer:</strong> {product.offer ? `${product.offer}% off` : "No offer"}
      </p>
    </div>
  );
}
