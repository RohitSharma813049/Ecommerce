import React from "react";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../navbar/adminnavbar"; // Adjust the import path accordingly
import Footer from "@/footer/footer";

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />

      <main className="flex-grow bg-gray-100 p-6">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}
