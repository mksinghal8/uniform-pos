import { useMutation } from '@tanstack/react-query';

async function createSalesAssignment(data) {

  console.log("About to create",data);
  const response = await fetch('/api/ssu/salesAssignment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  return response.json();
}


export const useCreateSalesAssignment = () => {
    return useMutation({
      mutationFn: createSalesAssignment,
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


