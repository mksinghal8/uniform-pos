import { useMutation } from '@tanstack/react-query';

async function createSalesRecord(data) {

    console.log("About to create",data);
  const response = await fetch('/api/ssu/salesRecord', {
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

// export const useCreateSalesRecord = () => {
//   return useMutation(createSalesRecord, {
//     onSuccess: (data) => {
//       console.log('Sales Record Created:', data);
//     },
//     onError: (error) => {
//       console.error('Failed to create sales record:', error);
//     },
//   });
// };
export const useCreateSalesRecord = () => {
    return useMutation({
      mutationFn: createSalesRecord,
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


