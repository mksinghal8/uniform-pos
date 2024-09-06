'use client';

import { useSalesCartStore } from '@/store_zustand/salesCartStore2';
import { useState } from 'react';
import CartItemProduct from './CartItemProduct';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
];

export default function SalesCart() {
  const [open, setOpen] = useState(true);

  const { cart, addToCart, updateState, removeFromCart, updateCartItem } =
    useSalesCartStore((state) => ({
      cart: state.cart,
      addToCart: state.addToCart,
      updateState: state.updateState,
      removeFromCart: state.removeFromCart,
      updateCartItem: state.updateCartItem,
    }));

  const incrementCartItem = (productId) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // Product exists, update its quantity
      const existingCartItem = cart[existingProductIndex];
      existingCartItem.quantityInCart = existingCartItem.quantityInCart + 1;
      updateCartItem(existingProductIndex, existingCartItem);
    }
  };

  const decrementCartItem = (productId) => {
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      // Product exists, update its quantity
      const existingCartItem = cart[existingProductIndex];
      if (existingCartItem.quantityInCart == 1) {
        removeFromCart(productId);
      } else {
        existingCartItem.quantityInCart = existingCartItem.quantityInCart - 1;
        updateCartItem(existingProductIndex, existingCartItem);
      }
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="py-6 sm:px-2 sm:py-4">
        <div className="flow-root h-100 overflow-y-auto">
          <ul className="p-1">
            {cart.map((product,index) => (
              <CartItemProduct index={index} product={product}/>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-b py-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Subtotal</p>
            <p className="text-lg font-semibold text-gray-900">$399.00</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Shipping</p>
            <p className="text-lg font-semibold text-gray-900">$8.00</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <p className="text-2xl font-semibold text-gray-900">
            <span className="text-xs font-normal text-gray-400">USD</span>{' '}
            408.00
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
          >
            Checkout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
