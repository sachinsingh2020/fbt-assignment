import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";

// Header component provides navigation and displays cart item count
const Header = () => {
  // Accessing cart items from Redux store to display the count
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Logo section */}
      <h2 className="text-xl font-bold">Logo Here</h2>

      {/* Navigation links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/cart" className="flex items-center space-x-2">
          {/* Shopping bag icon and cart count */}
          <FiShoppingBag className="text-2xl" />
          <p className="bg-red-500 text-white px-2 py-1 rounded-full">
            {cartItems.length}
          </p>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
