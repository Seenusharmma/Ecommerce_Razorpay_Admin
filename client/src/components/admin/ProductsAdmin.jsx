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

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://ecommerce-razorpay-admin.onrender.com/api/products"
    );
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(
        `https://ecommerce-razorpay-admin.onrender.com/api/products/${editingId}`,
        form
      );
      setEditingId(null);
    } else {
      await axios.post(
        "https://ecommerce-razorpay-admin.onrender.com/api/products",
        form
      );
    }
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      qty: "",
      imgSrc: "",
    });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure?")) {
      await axios.delete(
        `https://ecommerce-razorpay-admin.onrender.com/api/products/${id}`
      );
      fetchProducts();
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product._id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          🛒 Admin Panel
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <a className="hover:bg-blue-800 p-2 rounded">Dashboard</a>
          <a className="bg-blue-800 p-2 rounded">Products</a>
          <a className="hover:bg-blue-800 p-2 rounded">Orders</a>
          <a className="hover:bg-blue-800 p-2 rounded">Users</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow rounded-lg p-4 mb-6">
          <h1 className="text-xl font-bold">📦 Manage Products</h1>
          <div className="flex items-center gap-3">
            <span className="font-medium">Admin</span>
            <img
              src="https://ui-avatars.com/api/?name=Admin"
              alt="Admin"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Product Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="qty"
            value={form.qty}
            onChange={handleChange}
            placeholder="Quantity"
            className="p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <input
            type="text"
            name="imgSrc"
            value={form.imgSrc}
            onChange={handleChange}
            placeholder="Image URL"
            className="col-span-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="col-span-full p-3 border rounded-lg focus:ring focus:ring-blue-400"
          />
          <button className="col-span-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition flex flex-col"
            >
              <img
                src={product.imgSrc}
                alt={product.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="font-bold text-lg">{product.title}</h2>
              <p className="text-gray-600">{product.category}</p>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
              <p className="text-gray-500">Stock: {product.qty}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsAdmin;
