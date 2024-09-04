import {create} from 'zustand';

type Customer = {
  customerName: string;
  mobileNo: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
};

// Define a base type for Cash payment details
interface CashPaymentDetails {
  mode: 'Cash';
  cashPaid: number;          // Amount of cash paid by the customer
  amountToReturn: number;    // Amount to be returned to the customer
}

// Define a base type for other payment modes (without additional properties)
interface OtherPaymentModes {
  mode: 'CreditCard' | 'DebitCard' | 'Online' | 'GiftCard';
}

// Combine them into a union type for PaymentMode
type PaymentMode = CashPaymentDetails | OtherPaymentModes;

// Define the SalesCartStore type
interface SalesCartStore {
  salesMan: string;
  helper: string;
  customer: Customer;
  cart: Product[];
  couponCode: string;
  manualDiscount: number;
  paymentMode: PaymentMode;
  remarks: string; // Assuming remarks is a simple string, adjust if needed
  // Actions
  updateState: (partialState: Partial<SalesCartStore>) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const useSalesCartStore = create<SalesCartStore>((set) => ({
  salesMan: '',
  helper: '',
  customer: { customerName: '', mobileNo: '' },
  cart: [],
  couponCode: '',
  manualDiscount: 0,
  paymentMode: { mode: 'Cash', cashPaid: 0, amountToReturn: 0 }, // Default value for Cash
  remarks: '', // Default remarks

  updateState: (partialState) => set(state => ({ ...state, ...partialState })),
  addToCart: (product) => set(state => ({
    cart: [...state.cart, product]
  })),
  removeFromCart: (productId) => set(state => ({
    cart: state.cart.filter(product => product.id !== productId)
  })),
}));
