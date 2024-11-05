// useFetchProducts.ts
import { useQuery } from '@tanstack/react-query';

const fetchSaleAssignments = async (): Promise<any> => {
  const response = await fetch('/api/ssu/salesAssignment');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useFetchSalesAssignment = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['salesAssignment'],
    queryFn: fetchSaleAssignments,
    staleTime: Infinity,
  });

  return { data, isLoading: isPending, error };
};
