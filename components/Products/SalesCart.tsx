'use client';

import { useSalesCartStore } from '@/store_zustand/salesCartStore2';
import { useState } from 'react';





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

  const { cart, addToCart, updateState } = useSalesCartStore(state => ({
    cart: state.cart,
    addToCart: state.addToCart,
    updateState: state.updateState
  }));

  return (
    <div className='bg-blue-600 w-full h-230'>

    </div>
  );
}
