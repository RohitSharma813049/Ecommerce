import React, { useState } from "react";
import { useSelector } from "react-redux";
import { showError, showSuccess } from "@/utils";

export function AddProduct() {
  const { role, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

const [product, setProduct] = useState({
  name: "",
  description: "",
  price: "",
  cutPrice: "",
  offer: "",
  category: "",
  subCategory: "",   // new optional field
  stock: "",
  image: null,
});


  // Restrict access to admin only
  if (role !== "admin") {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        ❌ Access Denied — Only Admins Can Add Products
      </div>
    );
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Auto-calculate discounted price (if offer is given)
  const handleOfferChange = (e) => {
    const value = e.target.value;
    setProduct((prev) => {
      const offerNum = parseFloat(value);
      const cutPriceNum = parseFloat(prev.cutPrice);

      let finalPrice = prev.price;

      if (!isNaN(offerNum) && offerNum > 0 && cutPriceNum > 0) {
        finalPrice = (cutPriceNum - (cutPriceNum * offerNum) / 100).toFixed(2);
      } else {
        // If no offer, price stays equal to cut price
        finalPrice = cutPriceNum || "";
      }

      return { ...prev, offer: value, price: finalPrice };
    });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
    showError("No authorization token found. Please login.");
    return;
  }

  console.log("Sending token:", token)

    if (!product.name || !product.cutPrice || !product.category || !product.image) {
      showError("Please fill all required fields and upload an image.");
      return;
    }

    const cutPriceNum = parseFloat(product.cutPrice);
    const priceNum = parseFloat(product.price || cutPriceNum);

    if (priceNum > cutPriceNum) {
      showError("Final price cannot be higher than original (cut) price.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("cutPrice", product.cutPrice);
    formData.append("offer", product.offer || 0);
    formData.append("price", product.price || product.cutPrice); // ✅ auto use cutPrice if no offer
    formData.append("category", product.category);
    formData.append("subCategory", product.subCategory || "");
    formData.append("stock", product.stock);
    formData.append("image", product.image);

   try {
  setLoading(true);
  console.log("Token used in fetch:", token);

const response = await fetch("http://localhost:6523/api/products/add", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  body: formData,
});


  if (response.status === 401) {
    // Unauthorized - token invalid or expired
    showError("Session expired. Please login again.");
    // dispatch(logout())  <-- if you have dispatch and logout action from redux
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    showError(data.message || "Failed to add product");
    return;
  }

  showSuccess("✅ Product added successfully!");
  // reset form as before

} catch (error) {
  showError(error.message || "Something went wrong");
} finally {
  setLoading(false);
}

  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. Nike Air Max"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            rows="3"
            placeholder="Product details..."
          />
        </div>

        {/* Cut Price */}
        <div>
          <label className="block mb-1 font-medium">Original Price (₹)</label>
          <input
            type="number"
            name="cutPrice"
            value={product.cutPrice}
            onChange={(e) => {
              const value = e.target.value;
              setProduct((prev) => ({
                ...prev,
                cutPrice: value,
                price: prev.offer
                  ? (value - (value * prev.offer) / 100).toFixed(2)
                  : value,
              }));
            }}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 2500"
            required
          />
        </div>

        {/* Offer (optional) */}
        <div>
          <label className="block mb-1 font-medium">Offer (% Discount, optional)</label>
          <input
            type="number"
            name="offer"
            value={product.offer}
            onChange={handleOfferChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 20"
          />
        </div>

        {/* Price (auto or manual) */}
        <div>
          <label className="block mb-1 font-medium">Final Price (₹)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            placeholder="Auto-calculated or same as cut price"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="accessories">Accessories</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        {/* Subcategory (optional) */}
<div>
  <label className="block mb-1 font-medium">Subcategory (optional)</label>
  <input
    type="text"
    name="subCategory"
    value={product.subCategory}
    onChange={handleChange}
    className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
    placeholder="e.g. Sneakers, Watches"
  />
</div>


        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Stock Quantity</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            placeholder="e.g. 50"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded w-full px-3 py-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-medium disabled:opacity-50"
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
