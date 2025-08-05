// src/App.js
import React, { useContext } from 'react';
import { ProductContext } from './context/ProductContext';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import StatsCards from './components/StatsCards';

const App = () => {
  const { state, toggleCart } = useContext(ProductContext);
  const { isCartOpen, cart } = state;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-red-800 text-white flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold">Product Dashboard</h1>
        <div className="relative cursor-pointer" onClick={toggleCart}>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
            {cart.length}
          </span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.3 5.3a1 1 0 001 1.7h11a1 1 0 001-1.7L17 13M7 13L5.4 5M9 21h.01M15 21h.01" />
          </svg>
        </div>
      </div>

      <main className="flex flex-col lg:flex-row p-4 gap-4">
        <div className="flex-1">
          <StatsCards />
          <ProductList />
        </div>
        {isCartOpen && <CartSidebar />}
      </main>
    </div>
  );
};

export default App;
