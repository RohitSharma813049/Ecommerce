import React from "react";
import { Outlet } from "react-router-dom";

export function AccountLayout() {
  return (
    <div className=" h-[100vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row items-center justify-center max-w-4xl w-full">
        {/* Image Section - Same height as form */}
        <div className="w-full lg:w-1/2 hidden  lg:block">
          <img
            src="https://pcdn.sharethis.com/wp-content/uploads/2020/06/Blog_eCommerce_060120_WP-2.png"
            alt="Modern secure authentication interface"
            className="w-full h-[500px] lg:h-[600px] object-cover rounded-l-2xl lg:rounded-r-none rounded-2xl shadow-2xl"
          />
        </div>

        {/* Form Section - Same height as image */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] bg-white/95 backdrop-blur-lg p-8 rounded-r-2xl lg:rounded-l-none rounded-2xl shadow-2xl border border-white/40">
          <Outlet />
          
          {/* Security Footer */}
          <div className="mt-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Protected by advanced security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}