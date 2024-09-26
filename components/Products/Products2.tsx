'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import HorizontalCardScroll, { CategoryCarousel } from './CategoryCarousel';
import ProductQuickView from './ProductQuickView';
import SalesCart from './SalesCart';
import useProductStore from '@/store_zustand/productStore';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import ProductCard2 from './ProductCard2';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        className="w-full p-2 border rounded"
        onChange={handleInputChange}
      />
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

const CategoriesSlider = ({ filteredCategories , setProductSearchResults}) => {

  const displayProductsInThisCategory = (category) => {
    console.log(category);
    setProductSearchResults('');
  }

  //pass productFilter Herr_Von_Muellerhoff, It will update na
  return (
    <div className="overflow-x-auto whitespace-nowrap mb-4">
      <div className="inline-flex space-x-4">
        {filteredCategories?.length > 0 ? (
          filteredCategories.map((category) => (
            <div
              onClick={() => displayProductsInThisCategory(category)}
              key={category.id}
              className="w-40 h-20 bg-gray-200 flex items-center justify-center rounded"
            >
              {category.name}
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

const ProductGrid = ({ products , setOpen, setSelectedProduct}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.length > 0 ? (
        products.map((product, index) => (
          // <div  >
          //   <h2 className="text-lg font-bold">{product.name}</h2>
          //   <p className="text-gray-600">{product.description}</p>
          // </div>
          <div
          key={product.id}
            onClick={() => {
              console.log('Product Clicked with uuid', product.uuid);
              setOpen(true);
              setSelectedProduct(product.uuid);
            }}
          >
            <ProductCard2
              productName={product.name}
              categoryName={product.categories}
              mrp={product.mrp}
              discount="200"
              price="300"
              imageUrl={product.image}
            />
          </div>
        ))
      ) : (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
          <p className="text-gray-600">No products found.</p>
        </div>
      )}
    </div>
  );
};

function Products2() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();
  const [searchQuery, setSearchQuery] = useState(' ');
  const { data: products, isLoading, isError } = useFetchProducts();
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: isCategoriesError,
  } = useFetchCategories();

  const [productSearchResults, setProductSearchResults] = useState();
  const [categorySearchResults, setCategorySearchResults] = useState();

  const quickViewOff = () => setOpen(false);

  useEffect

  useEffect(()=>{
    const searchResultsProduct = products?.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const searchResultsCategories = allCategories?.results?.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductSearchResults(searchResultsProduct);
    setCategorySearchResults(searchResultsCategories);

    
  },[searchQuery])

  //This is the store code
  const {
    allProducts,
    allCategories,
    searchResultProducts,
    searchResultCategories,
    setAllProducts,
    setAllCategories,
    setSearchResultProducts,
    setSearchResultCategories,
  } = useProductStore();

  useEffect(() => {
    if (categories) setAllCategories(categories);
  }, [isCategoriesLoading]);

  const filteredCategories = allCategories?.results?.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //store code ends

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (isError || isCategoriesError) return <div>Error: {isError}</div>;

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <ScrollableComponent /> */}
      <CategoriesSlider filteredCategories={categorySearchResults} setProductSearchResults={setProductSearchResults} />
      <ProductGrid products={productSearchResults} setOpen={setOpen} setSelectedProduct={setSelectedProduct} />
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

export default Products2;
