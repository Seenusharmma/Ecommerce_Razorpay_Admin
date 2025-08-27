import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    imgSrc: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:1000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create / Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:1000/api/products/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post("http://localhost:1000/api/products", form);
    }
    setForm({ title: "", description: "", price: "", category: "", qty: "", imgSrc: "" });
    fetchProducts();
  };

  // Delete product
  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`http://localhost:1000/api/products/${id}`);
      fetchProducts();
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">📦 Admin Product Dashboard</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
        <button className="col-span-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Products List */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow rounded-lg p-4 flex flex-col items-center"
          >
            <img src={product.imgSrc} alt={product.title} className="w-32 h-32 object-cover mb-3" />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-green-600 font-bold">₹{product.price}</p>
            <p className="text-gray-500">Stock: {product.qty}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="px-4 py-2 bg-yellow-400 text-black rounded-lg font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
