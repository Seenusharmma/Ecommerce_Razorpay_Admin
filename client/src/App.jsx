import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProductsAdmin from "./components/admin/ProductsAdmin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/products" replace />} />
      <Route path="/admin/products" element={<ProductsAdmin />} />
    </Routes>
  );
};

export default App;
