// useFetchProducts.ts
import { useQuery } from '@tanstack/react-query';

const fetchCategories = async (): Promise<any> => {
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useFetchCategories = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: Infinity,
  });

  return { data, isLoading: isPending, error };
};
