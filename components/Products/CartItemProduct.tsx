import { useSalesCartStore } from '@/store_zustand/salesCartStore2';
import React, { useEffect, useState } from 'react';

function CartItemProduct({ index, product }) {
  const [variantData, setVariantData] = useState({});
  const [selectedPrimaryVariant, setSelectedPrimaryVariant] =
    useState<string>();
  const [selectedSecondaryVariant, setSelectedSecondaryVariant] =
    useState<string>();
  const [primaryVariantDetails, setPrimaryVariantDetails] = useState();
  const [secondaryVariantDetails, setSecondaryVariantDetails] = useState({});
  const [selectedVariant, setSelectedVariant] = useState({});

  const { addToCart, updateState, removeFromCart, updateCartItem } =
    useSalesCartStore((state) => ({
      addToCart: state.addToCart,
      updateState: state.updateState,
      removeFromCart: state.removeFromCart,
      updateCartItem: state.updateCartItem,
    }));

  useEffect(() => {
    if (product) {
      if (product.variants.primaryAttribute) {
        setPrimaryVariantDetails(product.variants.data);
        const firstPrimarySelection = Object.keys(product.variants.data)[0];
        setSelectedPrimaryVariant(product.selectedVariant.primaryAttribute);
        setSecondaryVariantDetails(
          product.variants.data[firstPrimarySelection]
        );
        setSelectedSecondaryVariant(product.selectedVariant.secondaryAttribute);
      }

      if (
        !product.variants.primaryAttribute &&
        product.variants.secondaryAttribute
      ) {
        setSecondaryVariantDetails(product.variants.data);
        const firstSecondarySelection = Object.keys(product.variants.data)[0];
        setSelectedSecondaryVariant(product.selectedVariant.secondaryAttribute);
      }

      if (
        !product.variants.primaryAttribute &&
        !product.variants.secondaryAttribute
      ) {
        setSelectedVariant(product.variants.data.sku);
      }
    }
  }, []);

  const incrementCartItem = (index: number) => {
    const updatedProduct = { ...product };
    updatedProduct.quantityInCart += 1;
    updateCartItem(index, updatedProduct);
  };

  const decrementCartItem = (index: number) => {
    const updatedProduct = { ...product };
    if (updatedProduct.quantityInCart === 1) {
      removeFromCart(index);
    } else {
      updatedProduct.quantityInCart -= 1;
      updateCartItem(index, updatedProduct);
    }
  };

  const handlePrimaryVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrimaryVariant = event.target.value;
    const updatedProduct = {
      ...product,
      selectedVariant: product.variants.data[newPrimaryVariant][selectedSecondaryVariant],
    };
  
    setSelectedPrimaryVariant(newPrimaryVariant);
    updateCartItem(index, updatedProduct);
  };
  

  const handleSecondaryVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedSecondaryVariant(selectedValue);

    const updatedProduct = { ...product };
    const { primaryAttribute, data } = updatedProduct.variants;
    
    updatedProduct.selectedVariant = primaryAttribute 
        ? data[selectedPrimaryVariant][selectedValue] 
        : data[selectedValue];

    updateCartItem(index, updatedProduct);
};


  return (
    <li className="space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0 hover:bg-slate-100 transition duration-300 rounded border-b border-slate-200">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1">
          <img
            className="h-15 w-15 max-w-full rounded-lg object-cover"
            src={product.all_images[0]}
            alt=""
          />
        </div>
        <div className="col-span-2 flex flex-col space-y-1">
          <div className="flex-1">
            <p className="text-xs font-semibold mb-2 w-35 overflow-hidden text-ellipsis whitespace-nowrap">
              {product.name}
            </p>
            <p className="text-sm font-semibold mb-2">
              <del className="text-slate-500 text-xs">
                Rs. {product.selectedVariant.original_price}
              </del>
              &nbsp;&nbsp;&nbsp;Rs. {product.selectedVariant.selling_price}
            </p>
            <div className="text-xs font-semibold flex space-x-2 items-center">
              {product.variants.primaryAttribute && (
                <>
                  <select
                    id="primary-variant"
                    name="primary-variant"
                    className="ui aeb afg agc arw avq awe awk awu axz bbt bmo bnc bng bnt cng"
                    value={selectedPrimaryVariant}
                    onChange={handlePrimaryVariantChange}
                  >
                    {primaryVariantDetails && Object.keys(primaryVariantDetails).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <span>|</span>
                </>
              )}

              {product.variants.secondaryAttribute && (
                <select
                  id="secondary-variant"
                  name="secondary-variant"
                  className="ui aeb afg agc arw avq awe awk awu axz bbt bmo bnc bng bnt cng"
                  value={selectedSecondaryVariant}
                  onChange={handleSecondaryVariantChange}
                >
                  {secondaryVariantDetails &&
                    Object.keys(secondaryVariantDetails).map((key) => {
                      // Skip the "meta" key
                      if (key === 'meta') return null;

                      return (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      );
                    })}
                </select>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center">
          <button
            className="w-10 h-6 flex items-center justify-center rounded-t-md transition bg-slate-200 hover:bg-black hover:text-white"
            onClick={() => incrementCartItem(index)}
          >
            +
          </button>
          <div className="w-10 h-8 flex items-center justify-center bg-gray-100 text-sm uppercase">
            {product.quantityInCart}
          </div>
          <button
            className="w-10 h-6 flex items-center justify-center rounded-b-md transition bg-slate-200 hover:bg-black hover:text-white"
            onClick={() => decrementCartItem(index)}
          >
            -
          </button>
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <p className="text-sm font-semibold text-right">
            Rs. {product.quantityInCart * product.selectedVariant.selling_price}
          </p>
        </div>
      </div>
    </li>
  );
}

export default CartItemProduct;
