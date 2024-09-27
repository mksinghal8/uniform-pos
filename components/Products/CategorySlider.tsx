import { useFetchACategory } from '@/hooks/useFetchACategory';
import useProductStore from '@/store_zustand/productStore';
import React, { useState } from 'react';

const CategoryCard = ({ category }) => {
  return (
    <div
      className={
        'w-40 h-20 bg-gray-200 flex items-center justify-center rounded'
      }
    >
      {category.name}
    </div>
  );
};

const CategoriesSlider = ({ filteredCategories, setProductSearchResults }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data, isPending, isError } = useFetchACategory(selectedCategoryId);
  const { allProducts } = useProductStore();

  const handleCardClick = (categoryId) => {
    setSelectedCategoryId(categoryId); // Call your fetch function with the category ID
    const productsInThisCategory =
      data &&
      allProducts.filter((product) =>
        data.results.some((category) => category.uuid === product.uuid)
      );
    setProductSearchResults(productsInThisCategory);
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap mb-4">
      <div className="inline-flex space-x-4">
        {filteredCategories?.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              onClick={() => handleCardClick(category.id)} // Call on click
              key={category.id}
            >
              <CategoryCard category={category} />
            </div>
          ))
        ) : (
          <div className="w-40 h-20 bg-gray-200 flex items-center justify-center rounded">
            No categories found.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesSlider;
