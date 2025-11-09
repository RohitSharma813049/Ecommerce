import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:6523/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 mt-10">{error}</div>;

  if (!product)
    return <div className="text-center text-yellow-600 mt-10">Product not found</div>;
  

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-4 aspect-square flex items-center justify-center">
                <img
                  src={`http://localhost:6523${
                    productImages[selectedImage].startsWith("/")
                      ? productImages[selectedImage]
                      : "/" + productImages[selectedImage]
                  }`}
                  alt={product.name}
                  className="w-full h-80 object-contain rounded-lg"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto py-2">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 ${
                      selectedImage === idx ? "border-indigo-600" : "border-gray-200"
                    } overflow-hidden`}
                  >
                    <img
                      src={`http://localhost:6523${img.startsWith("/") ? img : "/" + img}`}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
                <div className="text-3xl font-bold text-green-600">₹{product.price}</div>

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

                      className="px-4"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-lg font-semibold"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
