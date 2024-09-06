import React, { useState } from 'react';

function ProductCard(productDetails: any) {
  const { product } = productDetails;
  return (
    <>
      {/* new product starts */}
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full  object-center lg:h-full lg:w-full h-auto object-contain"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Basic Tee
            </h3>
            <p className="mt-1 text-sm text-gray-500">Black</p>
          </div>
          <p className="text-sm font-medium text-gray-900">$35</p>
        </div>
      </div>
      {/* new product ends */}
    </>
  );
}

export default ProductCard;
