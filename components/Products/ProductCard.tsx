import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import ProductDescriptionModal from './ProductDescriptionModal';
import ProductQuickView from './ProductQuickView';

function ProductCard(productDetails: any) {
  const { product } = productDetails;
  return (
    <>
      {/* new product starts */}
      <div className="group relative">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href="#">
                <span aria-hidden="true" className="absolute inset-0"></span>
                Basic Tee
              </a>
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
