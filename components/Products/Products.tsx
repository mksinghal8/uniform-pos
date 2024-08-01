"use client"
import React, { useState } from 'react';
import CardDataStats from '../CardDataStats';
import ChartTwo from '../Charts/ChartTwo';
import ChartOne from '../Charts/ChartOne';
import ChartThree from '../Charts/ChartThree';
import MapOne from '../Maps/MapOne';
import TableOne from '../Tables/TableOne';
import ChatCard from '../Chat/ChatCard';
import { Input } from '../ui/input';
import { useQuery } from '@tanstack/react-query';


const fetchProducts = async () => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  console.log("Received: ",response); 
  return response.json();
};

function Products() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, error, isLoading } = useQuery({queryKey:['products'], queryFn:fetchProducts});
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>; 

  const filteredProducts = data.results.filter((product:any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div>
      <div className='w-[30%]'>
        <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.image} alt={product.name} width={100} />
              <p>{product.selling_price}</p>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
      <h1>Products</h1>
      <div className="container mx-auto px-5 bg-white">
      <div className="flex lg:flex-row flex-col-reverse shadow-lg">
        {/* <!-- left section --> */}
        <div className="w-full lg:w-3/5 min-h-screen shadow-lg">
          {/* <!-- header --> */}
          <div className="flex flex-row justify-between items-center px-5 mt-5">
            <div className="text-gray-800">
              <div className="font-bold text-xl">Simons's BQQ Team</div>
              <span className="text-xs">Location ID#SIMON123</span>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-center mr-4">
                <div className="font-light text-gray-500">last synced</div>
                <span className="font-semibold">3 mins ago</span>
              </div>
              <div>
                  <span
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded"
                  >
                  Help
              </span>
            </div>
          </div>
          {/* <!-- end header -->
          <!-- categories --> */}
          <div className="mt-5 flex flex-row px-5">
            <span
              className="px-5 py-1 bg-yellow-500 rounded-2xl text-white text-sm mr-4"
            >
              All items
            </span>
            <span className="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
              Food
            </span>
            <span className="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
              Cold Drinks
            </span>
            <span className="px-5 py-1 rounded-2xl text-sm font-semibold mr-4">
              Hot Drinks
            </span>
          </div>
          {/* <!-- end categories -->
          <!-- products --> */}
          <div className="grid grid-cols-3 gap-4 px-5 mt-5 overflow-y-auto h-3/4">
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/sc5sTPMrVfk/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Ranch Burger</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$7.00</span>
                <img src="https://source.unsplash.com/sc5sTPMrVfk/600x500" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Pizza Bacon</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/sc5sTPMrVfk/500x500" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
            <div className="px-3 py-3 flex flex-col border border-gray-200 rounded-md h-32 justify-between">
              <div>
                <div className="font-bold text-gray-800">Griled corn</div>
                <span className="font-light text-sm text-gray-400">150g</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="self-end font-bold text-lg text-yellow-500">$1.75</span>
                <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className=" h-14 w-14 object-cover rounded-md" alt=""/>
              </div>
            </div>
          </div>
          {/* <!-- end products --> */}
        </div>
        {/* <!-- end left section -->
        <!-- right section --> */}
        <div className="w-full lg:w-2/5">
          {/* <!-- header --> */}
          <div className="flex flex-row items-center justify-between px-5 mt-5">
            <div className="font-bold text-xl">Current Order</div>
            <div className="font-semibold">
              <span className="px-4 py-2 rounded-md bg-red-100 text-red-500">Clear All</span>
              <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Setting</span>
            </div>
          </div>
          {/* <!-- end header -->
          <!-- order list --> */}
          <div className="px-5 py-4 mt-5 overflow-y-auto h-64">
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/4u_nRgiLW3M/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Stuffed flank steak</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                  <span className="font-semibold mx-4">2</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $13.50
                </div>
              </div>             
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/sc5sTPMrVfk/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Grilled Corn</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                  <span className="font-semibold mx-4">10</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $3.50
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Grilled Corn</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                  <span className="font-semibold mx-4">10</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $3.50
                </div>
              </div>
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Grilled Corn</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">-</span>
                  <span className="font-semibold mx-4">10</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $3.50
                </div>
              </div> 
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/MNtag_eXMKw/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Ranch Burger</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-red-300 text-white">x</span>
                  <span className="font-semibold mx-4">1</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $2.50
                </div>
              </div> 
              <div className="flex flex-row justify-between items-center mb-4">
                <div className="flex flex-row items-center w-2/5">
                  <img src="https://source.unsplash.com/4u_nRgiLW3M/600x600" className="w-10 h-10 object-cover rounded-md" alt=""/>
                  <span className="ml-4 font-semibold text-sm">Ranch Burger</span>
                </div>
                <div className="w-32 flex justify-between">
                  <span className="px-3 py-1 rounded-md bg-red-300 text-white">x</span>
                  <span className="font-semibold mx-4">1</span>
                  <span className="px-3 py-1 rounded-md bg-gray-300 ">+</span>
                </div>
                <div className="font-semibold text-lg w-16 text-center">
                  $2.50
                </div>
              </div>            
          </div>
          {/* <!-- end order list -->
          <!-- totalItems --> */}
          <div className="px-5 mt-5">
            <div className="py-4 rounded-md shadow-lg">
              <div className=" px-4 flex justify-between ">
                <span className="font-semibold text-sm">Subtotal</span>
                <span className="font-bold">$35.25</span>
              </div>
              <div className=" px-4 flex justify-between ">
                <span className="font-semibold text-sm">Discount</span>
                <span className="font-bold">- $5.00</span>
              </div>
              <div className=" px-4 flex justify-between ">
                <span className="font-semibold text-sm">Sales Tax</span>
                <span className="font-bold">$2.25</span>
              </div>
              <div className="border-t-2 mt-3 py-2 px-4 flex items-center justify-between">
                <span className="font-semibold text-2xl">Total</span>
                <span className="font-bold text-2xl">$37.50</span>
              </div>
            </div>
          </div>
          {/* <!-- end total -->
          <!-- cash --> */}
          <div className="px-5 mt-5">
            <div className="rounded-md shadow-lg px-4 py-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <span className="uppercase text-xs font-semibold">cashless credit</span>
                  <span className="text-xl font-bold text-yellow-500">$32.50</span>
                  <span className=" text-xs text-gray-400 ">Available</span>
                </div>
                <div className="px-4 py-3 bg-gray-300 text-gray-800 rounded-md font-bold"> Cancel</div>
              </div>
            </div>
          </div>
          {/* <!-- end cash -->
          <!-- button pay--> */}
          <div className="px-5 mt-5">
            <div className="px-4 py-4 rounded-md shadow-lg text-center bg-yellow-500 text-white font-semibold">
              Pay With Cashless Credit
            </div>
          </div>
          {/* <!-- end button pay --> */}
        </div>
        {/* <!-- end right section --> */}
      </div>
    </div>
    </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <pre>{isLoading}</pre>
    </div>
  );
}

export default Products;
