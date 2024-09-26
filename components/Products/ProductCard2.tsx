import React from 'react';

interface ProductCardProps {
  productName: string;
  categoryName: string;
  mrp: string;
  discount: string;
  price: string;
  imageUrl: string;
}

const ProductCard2: React.FC<ProductCardProps> = ({
  productName,
  categoryName,
  mrp,
  discount,
  price,
  imageUrl,
}) => {
  return (
    <div className="max-w-lg mx-1 my-2 bg-white rounded-lg shadow-lg flex overflow-hidden">
      <div className="w-1/4">
        <img
          className="w-full h-full object-cover"
          src={imageUrl}
          alt={productName}
        />
      </div>
      <div className="w-3/4 p-2 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{productName}</h2>
          <p className="mt-1 text-sm text-gray-600">{categoryName}</p>
          <div className="mt-4 flex items-center">
            <span className="text-lg font-medium text-gray-700 line-through">
              {mrp}
            </span>
            <span className="ml-4 text-lg font-semibold text-blue-600">
              {price}
            </span>
          </div>
          <span className="text-sm text-red-500">{discount} off</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
