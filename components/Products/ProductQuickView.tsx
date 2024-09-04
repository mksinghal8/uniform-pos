'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFetchAProduct } from '@/hooks/useFetchAProduct';
import { useSalesCartStore } from '@/store_zustand/salesCartStore2';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface ProductQuickViewProps {
  quickViewOff: () => void;
  productUuid: string;
  open: boolean;
}

const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  quickViewOff,
  productUuid,
  open,
}) => {
  // const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  const [variantData, setVariantData] = useState({}); //whole object received when data fetched
  const [selectedPrimaryVariant, setSelectedPrimaryVariant] =
    useState<string>(); //radio value for selected
  const [selectedSecondaryVariant, setSelectedSecondaryVariant] =
    useState<string>(); //radio value for second selected

  const [primaryVariantDetails, setPrimaryVariantDetails] = useState();
  const [secondaryVariantDetails, setSecondaryVariantDetails] = useState({}); // captures value of second level variant
  const [selectedVariant, setSelectedVariant] = useState({}); // unique sku selected

  //zustand store states
  const { cart, addToCart, removeFromCart } = useSalesCartStore(state => ({
    cart: state.cart,
    addToCart: state.addToCart,
    removeFromCart: state.updateState
  }));

  // Handler to add product to the cart
  const handleAddToCart = (selectedVariant) => {
    addToCart(selectedVariant);
  };

  const {
    isPending,
    isError,
    customizedProductObject: product,
    error,
  } = useFetchAProduct(productUuid);

  //following useEffect runs on load of product and selects primary & secondary variant

  useEffect(() => {
    if (product) {
  
      if (product.variants.primaryAttribute) {
        //set primary variant details
        setPrimaryVariantDetails(product.variants.data);
        //select primary variant details
        let firstPrimarySelection = Object.keys(product.variants.data)[0];
        setSelectedPrimaryVariant(firstPrimarySelection);
        //select secondary variant too
        setSecondaryVariantDetails(
          product.variants.data[firstPrimarySelection]
        );

        let firstSecondarySelection = Object.keys(product.variants.data[firstPrimarySelection])[0];
        setSelectedSecondaryVariant(firstSecondarySelection);
      }

      if (!product.variants.primaryAttribute && product.variants.secondaryAttribute) {
        setSecondaryVariantDetails(product.variants.data);
        let firstSecondarySelection = Object.keys(product.variants.data)[0];
        setSelectedSecondaryVariant(firstSecondarySelection);
      }

      if(!product.variants.primaryAttribute && !product.variants.secondaryAttribute){
        setSelectedVariant(product.variants.data.sku)
      }

      //select first from primary 
    }
    
  }, [isPending]);


  //The following useEffect gets activated when secondaryLevel of variant is selected and finds unique product
  useEffect(()=>{
    if(selectedPrimaryVariant && selectedSecondaryVariant){
      setSelectedVariant(product.variants.data[selectedPrimaryVariant][selectedSecondaryVariant]);
    }else if(selectedSecondaryVariant){
      setSelectedVariant(product.variants.data[selectedSecondaryVariant]);
    }
  },[selectedSecondaryVariant])

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const getSecondVariant = (key) => {
    setSelectedPrimaryVariant(key);
    console.log('Selected var:', key);
    setSecondaryVariantDetails(product.variants.data[key]);
  };

  //product_ && generateVariantsData(product_);
  return (
    <Dialog open={open} onClose={quickViewOff} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={quickViewOff}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                  <img
                    alt={product.imageAlt}
                    src={product.all_images[0]}
                    className="object-cover object-center"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                    {product.name}
                  </h2>

                  <section
                    aria-labelledby="information-heading"
                    className="mt-2"
                  >
                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>

                    <p className="text-2xl text-gray-900">
                      Rs. {selectedVariant.selling_price}
                    </p>

                    {/* Reviews */}
                  </section>

                  <section aria-labelledby="options-heading" className="mt-10">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>
                      {/* Primary Attribute */}
                      {product.variants.primaryAttribute && (
                        <fieldset aria-label="Choose a color">
                          <legend className="text-sm font-medium text-gray-900">
                            {product.variants.primaryAttribute}
                          </legend>

                          <RadioGroup
                            value={selectedPrimaryVariant}
                            onChange={getSecondVariant}
                            className="mt-4 flex items-center space-x-3"
                          >
                            {/* iske onselect pe secondary ko set kar do, fir secondary pe loop karo */}
                            {primaryVariantDetails &&
                              Object.keys(primaryVariantDetails).map((key) => (
                                <div>
                                <Radio
                                  key={key}
                                  value={key}
                                  disabled={false}
                                  className={classNames(
                                    true
                                      ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                      : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                    'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1'
                                  )}
                                >
                                  <span>{key}</span>
                                  {true ? (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                    />
                                  ) : (
                                    <span
                                      aria-hidden="true"
                                      className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                    >
                                      <svg
                                        stroke="currentColor"
                                        viewBox="0 0 100 100"
                                        preserveAspectRatio="none"
                                        className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      >
                                        <line
                                          x1={0}
                                          x2={100}
                                          y1={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </Radio>
                                <p className='text-center text-green-500 font-medium text-sm'>
                                      {primaryVariantDetails[key].meta.total} left
                                    </p>
                                </div>
                              ))}
                          </RadioGroup>
                        </fieldset>
                      )}

                      {/* Secondary Attribute */}
                      {product.variants.secondaryAttribute && (
                        <fieldset aria-label="Choose a size" className="mt-10">
                          <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-gray-900">
                              {product.variants.secondaryAttribute}
                            </div>
                          </div>

                          <RadioGroup
                            value={selectedSecondaryVariant}
                            onChange={setSelectedSecondaryVariant}
                            className="mt-4 grid grid-cols-4 gap-4"
                          >
                            {secondaryVariantDetails &&
                              Object.keys(secondaryVariantDetails).map(
                                (key) => {
                                  // Skip the "meta" key
                                  if (key === 'meta') return null;

                                  return (
                                    <div>
                                    <Radio
                                      key={key}
                                      value={key}
                                      disabled={false}
                                      className={classNames(
                                        true
                                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                          : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1'
                                      )}
                                    >
                                      <span>{key}</span>
                                      {true ? (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                        />
                                      ) : (
                                        <span
                                          aria-hidden="true"
                                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                        >
                                          <svg
                                            stroke="currentColor"
                                            viewBox="0 0 100 100"
                                            preserveAspectRatio="none"
                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                          >
                                            <line
                                              x1={0}
                                              x2={100}
                                              y1={100}
                                              y2={0}
                                              vectorEffect="non-scaling-stroke"
                                            />
                                          </svg>
                                        </span>
                                        
                                      )}
                                    </Radio>
                                    <p className='text-center text-green-500 font-medium text-sm'>
                                      {secondaryVariantDetails[key].inventory} left
                                    </p>
                                    </div>
                                  );
                                }
                              )}
                          </RadioGroup>
                        </fieldset>
                      )}

                      <button   
                        type="button" 
                        className={`mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        onClick={()=>handleAddToCart(selectedVariant)}
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductQuickView;
