import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-bold mb-4 text-red-600">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700">
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
