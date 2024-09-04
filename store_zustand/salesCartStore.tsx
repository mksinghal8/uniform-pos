// salesCartStore.ts
import create from 'zustand';
import { Product, Customer, PaymentMode, Remarks } from './types';

// Define the SalesCartStore type
interface SalesCartStore {
  salesMan: string;
  helper: string;
  customer: Customer;
  cart: Product[];
  couponCode: string;
  discount: number;
  paymentMode: PaymentMode;
  remarks: Remarks;
  // Actions
  setSalesMan: (salesMan: string) => void;
  setHelper: (helper: string) => void;
  setCustomer: (customer: Customer) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  setCouponCode: (couponCode: string) => void;
  setDiscount: (discount: number) => void;
  setPaymentMode: (paymentMode: PaymentMode) => void;
  setRemarks: (remarks: Remarks) => void;
}

export const useSalesCartStore = create<SalesCartStore>((set) => ({
  salesMan: '',
  helper: '',
  customer: { id: 0, name: '', email: '' },
  cart: [],
  couponCode: '',
  discount: 0,
  paymentMode: 'Cash', // Default value
  remarks: { note: '', date: new Date() },

  setSalesMan: (salesMan) => set({ salesMan }),
  setHelper: (helper) => set({ helper }),
  setCustomer: (customer) => set({ customer }),
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, product]
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(product => product.id !== productId)
  })),
  setCouponCode: (couponCode) => set({ couponCode }),
  setDiscount: (discount) => set({ discount }),
  setPaymentMode: (paymentMode) => set({ paymentMode }),
  setRemarks: (remarks) => set({ remarks }),
}));




// CartComponent.tsx
import React from 'react';
import { useSalesCartStore } from './salesCartStore';

const CartComponent: React.FC = () => {
  const { cart, addToCart, removeFromCart, discount, setDiscount } = useSalesCartStore();

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price} x {product.quantity}
            <button onClick={() => removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div>
        <span>Discount: ${discount}</span>
        <button onClick={() => setDiscount(10)}>Apply $10 Discount</button>
      </div>
    </div>
  );
};

export default CartComponent;
