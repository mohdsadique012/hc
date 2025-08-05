import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Header = () => {
  const { state, toggleCart } = useContext(ProductContext);
  const { cart } = state;

  return (
    <header className="bg-blue-600 text-white flex items-center justify-between px-6 py-4">
      <h1 className="text-xl font-bold">Product Dashboard</h1>
      <div className="relative cursor-pointer" onClick={toggleCart}>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {cart.length}
        </span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.3a1 1 0 001 1.7h11a1 1 0 001-1.7L17 13M7 13L5.4 5M9 21h.01M15 21h.01" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
