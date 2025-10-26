import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Customer Service</h4>
          <ul className="space-y-1 text-gray-600">
            <li><a href="/help">Help Center</a></li>
            <li><a href="/returns">Returns</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">About Us</h4>
          <ul className="space-y-1 text-gray-600">
            <li><a href="/our-story">Our Story</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Stay Connected</h4>
          <div className="flex space-x-4 mb-4">
            {/* social icons placeholders */}
            <a href="#"><span className="material-icons">facebook</span></a>
            <a href="#"><span className="material-icons">instagram</span></a>
            <a href="#"><span className="material-icons">twitter</span></a>
          </div>
          <form className="flex">
            <input type="email" placeholder="Your email" className="border px-3 py-2 rounded-l w-full"/>
            <button type="submit" className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
