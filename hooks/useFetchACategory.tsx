import { useQuery } from '@tanstack/react-query';

const fetchCategoryDetails = async (categoryId: string): Promise<any> => {
  const response = await fetch(`/api/categories/${categoryId}`);
  console.log("\n\n\n\n\n\nSinghal Ji:\n\n\n\n\n",response)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  console.log("Data is\n\n\n\nISHIKA\n\n:",data);
  return data;
};

export const useFetchACategory = (categoryId: string) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => fetchCategoryDetails(categoryId),
    enabled: !!categoryId,
    staleTime: Infinity,
  });

  return { isPending, isError, data, error };
};
