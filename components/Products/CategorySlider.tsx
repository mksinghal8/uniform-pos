import { useFetchACategory } from '@/hooks/useFetchACategory';
import useProductStore from '@/store_zustand/productStore';
import React, { useEffect, useState, useMemo } from 'react';

const CategoryCard = ({ category }) => (
  <div
    className="w-30 h-20 bg-gray-200 border border-slate-200 flex items-center justify-center rounded-lg overflow-hidden text-center transition-transform duration-300 
               hover:bg-blue-500 hover:text-white cursor-pointer hover:scale-105"
  >
    <span className="text-wrap text-sm">{category.name}</span>
  </div>
);

const CategoriesSlider = ({ filteredCategories, setProductSearchResults }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { data, isPending, isError } = useFetchACategory(selectedCategoryId);
  const { allProducts } = useProductStore();

  useEffect(() => {
    if (data) {
      const productsInThisCategory = allProducts.filter((product) =>
        data.results.some((category) => category.uuid === product.uuid)
      );
      setProductSearchResults(productsInThisCategory);
    }
  }, [data, allProducts, setProductSearchResults]);

  const handleCardClick = (categoryId) => {
    if (categoryId !== selectedCategoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  return (
    <div className="overflow-x-auto whitespace-nowrap mb-4">
      <div className="inline-flex space-x-4 p-4">
        {/* {isPending && <div>Loading categories...</div>} */}
        {isError && <div>Error loading categories. Please try again.</div>}
        {filteredCategories?.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              onClick={() => handleCardClick(category.id)}
              key={category.id}
              className="cursor-pointer"
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
