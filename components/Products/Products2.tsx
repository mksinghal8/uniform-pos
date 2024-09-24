'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import HorizontalCardScroll, { CategoryCarousel } from './CategoryCarousel';
import ProductQuickView from './ProductQuickView';
import SalesCart from './SalesCart';
import useProductStore from '@/store_zustand/productStore';
import { useFetchCategories } from '@/hooks/useFetchCategories';

const ProductGrid = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Replace with your product items */}
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="p-4 border rounded bg-white shadow">
            <h2 className="text-lg font-bold">Product {index + 1}</h2>
            <p className="text-gray-600">
              Description for product {index + 1}.
            </p>
          </div>
        ))}
      </div>
    );
  };

  const ScrollableComponent = () => {
    return (
      <div className="overflow-x-auto whitespace-nowrap mb-4">
        <div className="inline-flex space-x-4">
          {/* Replace with your content */}
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="w-40 h-20 bg-gray-200 flex items-center justify-center rounded"
            >
              Item {index + 1}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SearchBar = () => {
    return (
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };

function Products2() {
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
    <div className="container mx-auto p-4">
      <SearchBar />
      <ScrollableComponent />
      <ProductGrid />
    </div>
  );
}

export default Products2;
