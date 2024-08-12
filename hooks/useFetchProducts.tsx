// useFetchProducts.ts
import { useQueries } from '@tanstack/react-query';

const fetchInitialProducts = async (): Promise<any> => {
    const response = await fetch('/api/products/1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

const fetchProductsByPage = async (page: number): Promise<any[]> => {
    const response = await fetch(`/api/products/${page}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
};

export const useFetchProducts = () => {
    const initialQuery = useQueries({
        queries: [
            {
                queryKey: ['products', 1],
                queryFn: fetchInitialProducts,
                staleTime: Infinity,
            },
        ],
    });

    const initialData = initialQuery[0].data;
    const totalProducts = initialData?.count || 0;
    const productsPerPage = 30;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const productQueries = useQueries({
        queries: Array.from({ length: totalPages - 1 }, (_, index) => ({
            queryKey: ['products', index + 2],
            queryFn: () => fetchProductsByPage(index + 2),
            enabled: !!initialData,
            staleTime: Infinity,
        })),
    });

    const allProducts = initialData
        ? [
            ...initialData.results,
            ...productQueries.flatMap((query) => query.data || []),
        ]
        : [];

    const isLoading =
        initialQuery.some((query) => query.isLoading) ||
        productQueries.some((query) => query.isLoading);
    const isError =
        initialQuery.some((query) => query.isError) ||
        productQueries.some((query) => query.isError);

    return { data: allProducts, isLoading, isError };
};
