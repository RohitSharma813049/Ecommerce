import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';

import HomeLayout from './Pages/Home/homelayout';
import Home from './Pages/Home/home';
import { AccountLayout } from './Accounts/accountlayout';
import { Login } from './Accounts/login';
import { Register } from './Accounts/register';
import { Forgetpassword } from './Accounts/forget/forgetpassword';
import { Otpveryfy } from './Accounts/forget/otpveryfy';
import { Resetpassword } from './Accounts/forget/resetpassword';

import { AdminLayout } from './Admin/adminlayout/adminlayout';
import AdminDashboard from './Admin/dashboard/dashboard';
import { AddProduct } from './Admin/addproduct/addproduct';
import { ProductList } from './Admin/addproduct/productlist';

import { ProductDetails } from './Pages/product/productDetails';
import CartPage from "./Pages/cart/cartpage";

import NotFound from './Pages/pagenotfound/pagenotfound';
import ProtectedRoute from './procatedroutes';

function App() {
  const role = localStorage.getItem("role");

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontSize: '0.875rem', borderRadius: '0.5rem' },
        }}
      />

      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* Account Routes */}
        <Route path="/account" element={<AccountLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgetpassword" element={<Forgetpassword />} />
          <Route path="otpverify" element={<Otpveryfy />} />
          <Route path="resetpassword" element={<Resetpassword />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="products" element={<ProductList />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
