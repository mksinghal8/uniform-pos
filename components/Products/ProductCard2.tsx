import React from 'react';
import imagePlaceholder from '../../assets/noImage.jpg';

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

  // Define your default image URL
  //const defaultImageUrl = '../'; // Replace with your default image URL
  // const imagePlaceholder = '../../assets/noImage.jpg'

  // Use the default image if imageUrl is not valid or is an empty string
  const finalImageUrl = imageUrl==="https://api.mydukaan.io/static/images/category-def.jpg" ? imagePlaceholder.src : imageUrl;
  return (
    <div className="max-w-lg mx-1 my-2 bg-white border border-slate-200 rounded-lg flex overflow-hidden transition-transform duration-300 hover:scale-105">
  <div className="w-1/3 h-32">
    {/* Set a fixed height for the image container */}
    <img
      className="w-full h-full object-cover"
      src={finalImageUrl}
      alt={productName}
    />
  </div>
  <div className="w-2/3 p-2 flex flex-col justify-between">
    <div>
      <h2 className="text-sm font-semibold text-gray-800">{productName}</h2>
      <p className="mt-1 text-sm text-gray-600">{categoryName}</p>
      <div className="mt-4 flex items-center">
        <span className="text-lg font-medium text-gray-700 line-through">
          {mrp}
        </span>
        <span className="ml-4 text-lg font-semibold text-blue-600">
          Rs. {price}
        </span>
      </div>
      <span className="text-sm text-red-500">{discount} off</span>
    </div>
  </div>
</div>

  );
};

export default ProductCard2;
