import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const CartSidebar = () => {
  const { state, removeFromCart, closeCart } = useContext(ProductContext);
  const { cart } = state;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-50 overflow-y-auto transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Your Cart</h2>
        <button
          onClick={closeCart}
          className="text-gray-500 hover:text-red-500 text-lg font-bold"
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map(item => (
              <li
                key={item.id}
                className="flex justify-between items-center p-3 rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="h-12 w-12 object-cover rounded border"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">${item.price} x {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="mt-auto p-4 border-t bg-gray-50">
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
