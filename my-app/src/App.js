import React from "react";
import "./App.css";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import AdminLayout from "./pages/layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Product from "./features/product/Product";
import ProductAdd from "./features/product/ProductAdd";
import Category from "./features/category/Category";
import CategoryAdd from "./features/category/CategoryAdd";
import CategoryEdit from "./features/category/CategoryEdit";
import ProductEdit from "./features/product/ProductEdit";
import WebsiteLayout from "./pages/layouts/WebsiteLayout";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import ProdductDetail from "./pages/ProductDetail";
import User from "./features/user/User";
import UserAdd from "./features/user/UserAdd";
import UserEdit from "./features/user/UserEdit";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import PrivateRouter from "./pages/PrivateRouter";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<Homepage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProdductDetail />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route
          path="admin"
          element={
            <PrivateRouter>
              <AdminLayout />
            </PrivateRouter>
          }
        >
          {/* <Route path="admin" element={<AdminLayout />}> */}
          <Route index element={<Dashboard />} />

          <Route path="products">
            <Route index element={<Product />} />
            <Route path="add" element={<ProductAdd />} />
            <Route path=":id/edit" element={<ProductEdit />} />
          </Route>
          <Route path="categories">
            <Route index element={<Category />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path=":id/edit" element={<CategoryEdit />} />
          </Route>

          <Route path="users">
            <Route index element={<User />} />
            <Route path="add" element={<UserAdd />} />
            <Route path=":id/edit" element={<UserEdit />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
