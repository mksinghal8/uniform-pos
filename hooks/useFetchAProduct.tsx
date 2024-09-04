import { customizeProductObject } from '@/utils/utils';
import { useQuery } from '@tanstack/react-query';

const fetchProductDetails = async (productId: string): Promise<any> => {
  const response = await fetch(`/api/product/${productId}`);
  console.log("\n\n\n\n\n\nSinghal Ji:\n\n\n\n\n",response)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.data;
};

export const useFetchAProduct = (productId: string) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductDetails(productId),
    enabled: !!productId,
    staleTime: Infinity,
  });

  //let customizedProductObject = customizeProductObject(data);
  const customizedProductObject = data ? customizeProductObject(data) : undefined;

  return { isPending, isError, customizedProductObject, error };
};
