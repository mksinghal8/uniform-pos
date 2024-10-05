'use client';
import React, { useEffect, useState } from 'react';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import ProductQuickView from './ProductQuickView';
import useProductStore from '@/store_zustand/productStore';
import { useFetchCategories } from '@/hooks/useFetchCategories';
import ProductCard2 from './ProductCard2';
import CategoriesSlider from './CategorySlider';
import Modal from './Modal';
import ProductQuickView2 from './ProductQuickView2';
import { useSession } from '@/hooks/useSession';
import useSessionStore from '@/store_zustand/sessionStore';

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

const ProductGrid = ({ products, setOpen, setSelectedProduct }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.length > 0 ? (
        products.map((product, index) => (
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
              discount={product.discount}
              price={product.original_price}
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
  const [selectedProduct, setSelectedProduct] = useState(); //QuickView opens for selectedProduct
  const [searchQuery, setSearchQuery] = useState(null); //searck Key
  const { data: products, isLoading, isError } = useFetchProducts(); //fetchAllProducts -> this will be maintained in store too
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    error: isCategoriesError,
  } = useFetchCategories(); //fetchCategoreis -> No need to maintain in store as of now

  const [productSearchResults, setProductSearchResults] = useState(); //local state for product Search Results -> changed on Category Click too
  const [categorySearchResults, setCategorySearchResults] = useState();
  const [open, setOpen] = useState(false);

  const {session,setSession}= useSessionStore();
  const { data: sessionData, isPending: isSessionPending, isError: isSessionError } = useSession()
  useEffect(()=>{
    setSession(sessionData);
  },[isSessionPending])
  

  useEffect(() => {
    const searchResultsProduct = products?.filter((product: any) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const searchResultsCategories = allCategories.filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setProductSearchResults(searchResultsProduct);
    setCategorySearchResults(searchResultsCategories);
  }, [searchQuery]);

  //This is the store code
  const { allProducts, allCategories, setAllProducts, setAllCategories } =
    useProductStore();

  useEffect(() => {
    if (products) setAllProducts(products);
    if (categories) setAllCategories(categories.results);
  }, [isCategoriesLoading, isLoading]);

  useEffect(() => {
    setProductSearchResults(allProducts);
    setCategorySearchResults(allCategories);
  }, [allProducts, allCategories]);

  useEffect(()=>{
    //useSession();
  },[])
  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (isError || isCategoriesError) return <div>Error: {isError}</div>;

  

  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* <ScrollableComponent /> */}
      <CategoriesSlider
        filteredCategories={categorySearchResults}
        setProductSearchResults={setProductSearchResults}
      />
      <ProductGrid
        products={productSearchResults}
        setOpen={setOpen}
        setSelectedProduct={setSelectedProduct}
      />
      {/* {open && (
        <div className='mr-80'>
          <ProductQuickView
            productUuid={selectedProduct}
            quickViewOff={quickViewOff}
            open={open}
          />
        </div>
      )} */}
      <button onClick={toggleModal}>Open Modal</button>
      <Modal isOpen={open} onClose={toggleModal}>
      <ProductQuickView2
            productUuid={selectedProduct}
            onClose={toggleModal}
          />
      </Modal>
    </div>
  );
}

export default Products2;
