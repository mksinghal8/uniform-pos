'use client';

import { useSalesCartStore } from '@/store_zustand/salesCartStore2';
import { useEffect, useRef, useState } from 'react';
import CartItemProduct from './CartItemProduct';
import useCreateOrder from '@/hooks/useCreateOrder';
import Bill from './Bill';
import { formatSalesRecordData, generateBillTemplate, tokenGenerator } from '@/utils/utils';
import { useCreateSalesRecord } from '@/hooks/useCreateSalesRecord';
import useSessionStore from '@/store_zustand/sessionStore';
import { useCreateSalesAssignment } from '@/hooks/useCreateSalesAssignment';

export default function SalesCart2() {
  const iframeRef = useRef();

  const { session, setSession } = useSessionStore();
  const handlePrint = (invoiceDetails) => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(generateBillTemplate(invoiceDetails));
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const { cart } = useSalesCartStore((state) => ({
    cart: state.cart,
  }));

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('+91');
  const [subtotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [cashByCustomer, setcashByCustomer] = useState();
  const [amountToReturn, setAmountToReturn] = useState<Number>();
  const [paymentMode, setPaymentMode] = useState('Cash'); // Default value
  const [salesToken, setSalesToken] = useState(0);

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

    const totalItems = cart.reduce((acc, item) => {
      return acc + item.quantityInCart;
    }, 0);

    setSubTotal(total);
    setTotalItems(totalItems);
  }, [cart]);

  useEffect(() => {
    if (!cashByCustomer) {
        setAmountToReturn(0);
        return;
    }
    const parsedSubtotal = parseInt(subtotal);
    const parsedCashByCustomer = parseInt(cashByCustomer) || 0;
    const parsedDiscount = parseInt(discount) || 0;
    const totalAmount = subtotal - parsedDiscount;

    if (parsedCashByCustomer >= totalAmount) {
        setAmountToReturn(parsedCashByCustomer - totalAmount);
    } else {
        setAmountToReturn(0);
    }
}, [subtotal, cashByCustomer, discount]);



  // Use the createOrder mutation
  const {
    mutate: createOrder,
    isPending: pendingCreateOrder,
    error,
  } = useCreateOrder();

  const {
    mutate: createSalesRecord,
    isPending: pendingCreateSalesRecord,
    error: createSalesRecordError,
  } = useCreateSalesRecord();

  const {
    mutate: createSalesAssignment,
    isPending: pendingCreateSalesAssignment,
    error: errorCreateSalesAssignment,
  } = useCreateSalesAssignment();

  const handleCompleteOrder = () => {
    const orderData = {
      line_items: cart.map((item) => ({
        sku: item.selectedVariant.uuid,
        quantity: item.quantityInCart,
      })),
      mobile:
        customerPhone && customerPhone.length > 9
          ? customerPhone
          : '+91-9898989898', // Consider validating the phone format
      buyer_pin: 'CUSTOMER_PIN', // Replace with customer pin
      address: {
        line: 'ADDRESS_LINE', // Replace with actual address details
        city: 'CITY_NAME',
        state: 'STATE_NAME',
        country: 'in',
        pin: 'PIN_CODE', // Replace with actual pin code
        name: customerName ? customerName : 'Walk In Customer',
        email: 'mksinghal8@gmail.com',
        mobile:
          customerPhone && customerPhone.length > 9
            ? customerPhone
            : '+91-9898989898',
      },
      manual_ship_charge: '0', // Example value
      manual_discount_type: 1,
      manual_discount_value: String(discount),
      notes: 'Order notes',
      payment_mode: 0, // Ensure this corresponds to actual payment modes
    };

    createOrder(orderData, {
      onSuccess: (resp) => {
        console.log('This is the response of the order: ', resp);
        handlePrint({
          customerDetails: { customerName, customerPhone },
          cart,
          discount,
          paymentMode,
        });
      },
      onError: (error) => {
        console.error('Error completing the order:', error);
      },
    });

    createSalesRecord(
      formatSalesRecordData({
        cart,
        customer: { name: customerName, phone: customerPhone },
        salesMan: session.userName || 'salesMan',
        helper: 'helper',
        type: 'Retail',
        paymentMode,
        subtotal: '',
        discount,
      })
    );
  };

  //Function to create salesAssignment
  const salesAssignment = ()=>{
    const currentToken = tokenGenerator();
    setSalesToken(currentToken);
    createSalesAssignment({
      helper:'helper',
      cartDetails:cart,
      customer: { name: customerName, phone: customerPhone },
      status:"Pending",
      token:currentToken,
      salesMan: session.userName || 'salesMan',
    })
  }

  return (
    <div className="flex flex-col p-1 space-y-1">
      {/* First Row: Two Input Texts with Labels */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs font-semibold">Sales By</label>
          <p className="text-xs font-semibold text-slate-600 pl-1">{session && session.userName}</p>
        </div>
        <div>
          <label className="block mb-1 text-xs font-semibold">Helper</label>
          {/* <input type="text" className="w-full p-1 border rounded" /> */}
          <select
            id="helper"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          >
            <option>Select helper</option>
            <option>Helper 1</option>
            <option>Helper 2</option>
          </select>
        </div>
      </div>

      {/* Second Row: Two Input Texts with Labels */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block mb-1 text-xs font-semibold">
            Customer Name
          </label>
          <input
            type="text"
            id="input1"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Walk In Customer"
            value={customerName}
            onChange={handleCustomerNameChange}
          />
        </div>
        <div>
          <label className="block mb-1 text-xs font-semibold">
            Customer Number
          </label>
          <input
            type="text"
            id="input1"
            //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter first input"
            value={customerPhone}
            onChange={handleCustomerPhoneChange}
          />
        </div>
      </div>

      {/* Scrollable Vertical Div */}
      <div className="h-95 overflow-y-scroll border-y border-slate-200 p-1">
        <ul className="p-1">
          {cart.map((product, index) => (
            <CartItemProduct index={index} product={product} />
          ))}
        </ul>
      </div>

      {/* Information Div */}
      <div className="p-2 rounded border-dotted border-2 border-slate-400 bg-slate-100">
        <div className="flex flex-col">
          <div className="">
            <p className="text-sm text-gray-400 text-center mb-2 font-satoshi">
              # Summary for <span className="font-bold">{totalItems}</span> Items
            </p>
          </div>
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
                disabled={subtotal<=0}
                pattern="\d*"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">Total</p>
            <div className="flex items-center">
              <span className="text-sm font-semibold text-gray-900 mr-2">
                Rs.
              </span>
              <span className="text-sm font-semibold text-gray-900 w-20 text-right">
                {subtotal - discount || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Rows of Input */}

      <div className="flex justify-between items-center py-2">
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

      <div className="grid grid-cols-2 gap-2  h-15">
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
                  {amountToReturn}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Button */}
      {/* <button
        className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        type="button"
        onClick={handleCompleteOrder}
        disabled={pendingCreateOrder}
      >
        Process Order
      </button> */}

<div className="grid grid-cols-5 gap-4">
  <button
    className="col-span-1 mt-1 bg-blue-500 text-white  rounded hover:bg-blue-600"
    type="button"
    onClick={salesAssignment}
  >
    Other Action
  </button>

  <button
    className="col-span-4 mt-1 bg-blue-500 text-white  rounded hover:bg-blue-600"
    type="button"
    onClick={handleCompleteOrder}
    disabled={pendingCreateOrder}
  >
    Process Order
  </button>
</div>
      

      {/* Hidden iframe for printing */}
      <iframe ref={iframeRef} style={{ display: 'none' }} title="Print Bill" />

      {/* Render Bill content for printing
      <div id="bill-content" style={{ display: 'none' }}>
        <Bill />
      </div> */}
    </div>
  );
}
