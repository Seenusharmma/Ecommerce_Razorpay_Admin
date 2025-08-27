import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsAdmin from "../components/admin/ProductsAdmin";

const Home = () => <h1 className="text-2xl font-bold p-5">Welcome to Admin Dashboard</h1>;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/products" element={<ProductsAdmin />} />
    </Routes>
  );
};

export default App;
