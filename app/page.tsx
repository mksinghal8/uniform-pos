'use client';
import NSideBar from '@/components/NSideBar';
import Products from '@/components/Products/Products';
import SalesCart from '@/components/Products/SalesCart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';


const ProductGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Replace with your product items */}
            {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="p-4 border rounded bg-white shadow">
                    <h2 className="text-lg font-bold">Product {index + 1}</h2>
                    <p className="text-gray-600">Description for product {index + 1}.</p>
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
                    <div key={index} className="w-40 h-20 bg-gray-200 flex items-center justify-center rounded">
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
export default function Home() {
  return (
    <div className="relative flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="absolute z-10 bg-white shadow-md p-4 h-full">
        <NSideBar />
      </aside>

      {/* Main Section */}
      <main className="flex flex-col w-full p-4 pl-15">
        {' '}
        {/* Added padding to accommodate sidebar */}
        <div className="flex flex-grow">
          {/* Product Grid */}
          <section className="w-9/12 bg-white shadow-md p-4">
            <div className="container mx-auto p-4">
              <SearchBar />
              <ScrollableComponent />
              <ProductGrid />
            </div>
          </section>

          {/* Cart Section */}
          <aside className="fixed right-0 top-0 w-3/12 bg-white shadow-md p-1 h-full">
            <SalesCart />
          </aside>
        </div>
      </main>
    </div>
  );
}
