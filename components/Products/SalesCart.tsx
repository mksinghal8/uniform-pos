'use client';

import { useSalesCartStore } from '@/store_zustand/salesCartStore2';
import { useEffect, useState } from 'react';
import CartItemProduct from './CartItemProduct';
import useCreateOrder from '@/hooks/useCreateOrder';

export default function SalesCart() {
  const { cart } = useSalesCartStore((state) => ({
    cart: state.cart,
  }));

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("+91");
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cashByCustomer, setcashByCustomer] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Cash'); // Default value

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleCustomerPhoneChange = (e) => {
    setCustomerPhone(e.target.value);
  };



  const handleCashByCustomerChange = (e) => {
    setcashByCustomer(e.target.value);
  };
  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      return acc + item.selectedVariant.selling_price * item.quantityInCart;
    }, 0);
    setSubTotal(total);
  }, [cart]);

  // Use the createOrder mutation
  const { mutate: createOrder, isLoading, error } = useCreateOrder();

  const handleCompleteOrder = () => {
    const orderData = {
      line_items: cart.map(item => ({
        sku: item.selectedVariant.uuid,
        quantity: item.quantityInCart,
      })),
      mobile: customerPhone && customerPhone.length>9 ? customerPhone : "+91-9898989898", // Replace with customer phone number
      buyer_pin: 'CUSTOMER_PIN', // Replace with customer pin
      address: {
        // Replace with actual address details
        line: 'ADDRESS_LINE',
        city: 'CITY_NAME',
        state: 'STATE_NAME',
        country: 'in',
        pin: 'PIN_CODE',
        name: customerName ? customerName : "Walk In Customer",
        email: 'mksinghal8@gmail.com',
        mobile: customerPhone && customerPhone.length>9 ? customerPhone : "+91-9898989898",
      },
      manual_ship_charge: '0', // Example value
      manual_discount_type: 1,
      manual_discount_value: String(discount),
      notes: 'Order notes',
      payment_mode: 0, // Example mapping
    };

    createOrder(orderData);
  };

  return (
    <div className="bg-white shadow">
      <div className="py-6 sm:px-2 sm:py-4">
        <div className="grid grid-cols-1 gap-4">
          {/* <!-- First Row --> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="salesman"
                className="block text-sm font-medium text-gray-700"
              >
                SalesMan Name
              </label>
            </div>
            <div>
              <select
                id="helper"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Select helper</option>
                <option>Helper 1</option>
                <option>Helper 2</option>
              </select>
            </div>
          </div>
          {/* <!-- Second Row --> */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="salesman"
                className="block text-xs font-medium text-gray-700"
              >
                Customer Name
              </label>
              <input
                type="text"
                id="input1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Walk In Customer"
                value={customerName}
                onChange={handleCustomerNameChange}
              />
            </div>
            <div>
              <label
                htmlFor="salesman"
                className="block text-xs font-medium text-gray-700"
              >
                Customer Number
              </label>
              <input
                type="text"
                id="input1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter first input"
                value={customerPhone}
                onChange={handleCustomerPhoneChange}
              />
            </div>
          </div>
        </div>

        <div className="flow-root h-100 overflow-y-auto">
          <ul className="p-1">
            {cart.map((product, index) => (
              <CartItemProduct index={index} product={product} />
            ))}
          </ul>
        </div>

        <div className="border-t border-b">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Subtotal</p>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-2">
                  Rs.
                </span>
                <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                  {subtotal}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Discount</p>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-2">
                  Rs.
                </span>
                <input
                  type="text"
                  id="input1"
                  className="bg-transparent font-semibold border-b mb-2 border-gray-300 text-gray-900 text-sm text-right rounded-none focus:ring-0 focus:border-blue-500 w-20  dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Discount"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Total</p>
          <div className="flex items-center">
            <span className="text-sm font-semibold text-gray-900 mr-2">
              Rs.
            </span>
            <span className="text-sm font-semibold text-gray-900 w-20 text-right">
              {subtotal - discount}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-semibold text-gray-900">
            Payment Mode
          </span>
          <div className="flex items-center">
            <div className="flex items-center me-4">
              <input
                id="inline-radio"
                type="radio"
                value="Cash" // Set the value to "cash"
                name="inline-radio-group"
                checked={paymentMode === 'Cash'} // Check if the paymentMode is 'cash'
                onChange={handlePaymentModeChange} // Handle the change
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="inline-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Cash
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="inline-2-radio"
                type="radio"
                value="Online" // Set the value to "online"
                name="inline-radio-group"
                checked={paymentMode === 'Online'} // Check if the paymentMode is 'online'
                onChange={handlePaymentModeChange} // Handle the change
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="inline-2-radio"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Online
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3 h-12">
          {paymentMode === 'Cash' && (
            <>
              <div className="flex flex-col">
                <label
                  htmlFor="input1"
                  className="block text-xs font-medium text-gray-700"
                >
                  Amount Paid by Customer
                </label>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 mr-2">
                    Rs.
                  </span>
                  <input
                    type="text"
                    id="input1"
                    className="bg-gray-50 border-b border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Cash By Customer"
                    value={cashByCustomer}
                    onChange={handleCashByCustomerChange}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <label className="block text-xs font-medium text-gray-700">
                  Amount to return
                </label>
                <div className="flex items-center mt-2">
                  <span className="text-sm font-semibold text-gray-900 mr-2">
                    Rs.
                  </span>
                  <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                    {cashByCustomer - (+subtotal - +discount)}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-3">
          <button
            className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
            onClick={handleCompleteOrder}
            disabled={isLoading}
          >
            Complete Order
          </button>
        </div>
      </div>
    </div>
  );
}
