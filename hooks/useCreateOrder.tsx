import { useMutation } from '@tanstack/react-query';

// Define the API endpoint
const API_URL = '/api/orders/createOrder';

// Create a function that makes the POST request using fetch
const createOrder = async (orderData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error('Error creating order');
  }

  return response.json();
};

// Create the custom hook
const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('Order created successfully:', data);
      // Optionally, you can invalidate any queries related to orders here
      // queryClient.invalidateQueries('orders');
    },
    onError: (error) => {
      console.error('Error creating order:', error);
    },
  });
};

export default useCreateOrder;
