'use client';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { CategoryCarousel } from './CategoryCarousel';
import ProductQuickView from './ProductQuickView';

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          className="w-1/5 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Carousel */}
      <div className="mb-4">
        <CategoryCarousel />
      </div>

      {/* Products Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Our Products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-5 xl:gap-x-4">
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
      {open && <ProductQuickView productUuid={selectedProduct} quickViewOff={quickViewOff} open={open}/>}
    </div>
  );
}

export default Products;
