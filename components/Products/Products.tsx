'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { CategoryCarousel } from './CategoryCarousel';
import ProductQuickView from './ProductQuickView';
import SalesCart from './SalesCart';
import useProductStore from '@/store_zustand/productStore';
import { useFetchCategories } from '@/hooks/useFetchCategories';

function Products() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: products, isLoading, isError } = useFetchProducts();

  const quickViewOn = () => setOpen(true);
  const quickViewOff = () => setOpen(false);

  const filteredProducts = products?.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //This is the store code
  const {
    allProducts,
    allCategories,
    searchString,
    searchResultProducts,
    searchResultCategories,
    setAllProducts,
    setAllCategories,
    setSearchString,
    setSearchResultProducts,
    setSearchResultCategories,
  } = useProductStore();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: isCategoriesError,
  } = useFetchCategories();
  useEffect(() => {
    if (categories) setAllCategories(categories);
  }, [isCategoriesLoading]);

  //store code ends

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (isError || isCategoriesError) return <div>Error: {isError}</div>;

  return (
    <div className="mx-auto">
      {/* Search Bar */}
      <div className="mb-2">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="w-1/5 px-8 py-2 border border-gray-300 rounded"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white">
        {/* Carousel */}
        <div className="mb-2 w-4/5 mx-auto">
          {/* <CategoryCarousel /> */}
        </div>
        <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:max-w-7xl lg:px-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products
          </h2>

          <div className="mt-2 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-4">
            {filteredProducts?.length > 0 ? (
              filteredProducts.map((product: any) => (
                <div
                  className="border-2 border-blue-950"
                  onClick={() => {
                    console.log('Product Clicked with uuid', product.uuid);
                    setOpen(true);
                    setSelectedProduct(product.uuid);
                  }}
                >
                  <ProductCard key={product.id} product={product} />
                </div>
              ))
            ) : (
              <div>No Products found</div>
            )}
          </div>
        </div>
      </div>
      {open && (
        <ProductQuickView
          productUuid={selectedProduct}
          quickViewOff={quickViewOff}
          open={open}
        />
      )}
    </div>
  );
}

export default Products;
