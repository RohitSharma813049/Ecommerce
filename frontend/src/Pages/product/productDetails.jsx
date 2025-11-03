import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
  
  if (error) return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 text-5xl mb-4">⚠️</div>
        <h3 className="text-red-800 text-lg font-semibold mb-2">Error Loading Product</h3>
        <p className="text-red-600">{error}</p>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
        <div className="text-yellow-600 text-5xl mb-4">🔍</div>
        <h3 className="text-yellow-800 text-xl font-semibold mb-2">Product Not Found</h3>
        <p className="text-yellow-600">The product you're looking for doesn't exist.</p>
      </div>
    </div>
  );

  // Mock multiple images for demo
  const productImages = [
    product.imageUrl,
    product.imageUrl,
    product.imageUrl,
    product.imageUrl
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
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
              
              {/* Image Thumbnails */}
              <div className="flex gap-3 overflow-x-auto py-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 ${
                      selectedImage === index 
                        ? 'border-indigo-600' 
                        : 'border-gray-200'
                    } overflow-hidden`}
                  >
                    <img
                      src={`http://localhost:6523${
                        img.startsWith("/") ? img : "/" + img
                      }`}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div className="space-y-6">
                {/* Category & Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Home</span>
                  <span>›</span>
                  <span>{product.category}</span>
                  <span>›</span>
                  <span className="text-gray-900 font-medium">{product.name}</span>
                </div>

                {/* Product Title */}
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>

                {/* Product Description */}
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-green-600">
                      ₹{product.price}
                    </span>
                    {product.cutPrice && (
                      <span className="text-xl text-gray-400 line-through">
                        ₹{product.cutPrice}
                      </span>
                    )}
                    {product.offer > 0 && (
                      <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {product.offer}% OFF
                      </span>
                    )}
                  </div>
                  
                  {product.offer > 0 && product.cutPrice && (
                    <p className="text-sm text-gray-600">
                      You save ₹{(product.cutPrice - product.price).toFixed(2)} 
                    </p>
                  )}
                </div>

                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">Category:</span>
                  <span className="font-semibold">{product.category}</span>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <span className="text-gray-700 font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-semibold min-w-12 text-center">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-6">
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    🛒 Add to Cart
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    ⚡ Buy Now
                  </button>
                </div>
                
                {/* Additional Info */}
                <div className="grid grid-cols-2 gap-4 text-center text-sm text-gray-600">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">🚚 Free Shipping</div>
                    <div>On orders over ₹999</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="font-semibold">↩️ Easy Returns</div>
                    <div>30-day policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}