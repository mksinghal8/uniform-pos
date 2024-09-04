import Products from '@/components/Products/Products';
import SalesCart from '@/components/Products/SalesCart';
import { Button } from '@/components/ui/button';
import { ResizableDemo } from '../Resizable';

export default function Page() {
  return (
    // <div className="flex h-screen">
    //   <div className="w-3/4 bg-gray-100 p-6">
    //     <h1 className="text-2xl font-bold mb-4">Product Section</h1>
    //     <Products />
    //   </div>

    //   <div className="w-1/4 bg-white p-1 shadow-md">
    //     <h2 className="text-xl font-bold mb-4">Sidebar</h2>
    //     <SalesCart />
    //   </div>
    // </div>

    <div className="flex">
      {/* <!-- Left side div (70% width) --> */}
      <div className="w-9/12 bg-gray-200 p-4">
        {/* <!-- Your content for the left side --> */}
        <h1 className="text-2xl font-bold">Left Side</h1>
        <p>Your content here...</p>
        <Products />
      </div>

      {/* <!-- Right side div (30% width) --> */}
      <div className="w-3/12 fixed inset-y-0 right-0 bg-white shadow-lg mt-15">
        {/* <!-- Content inside the fixed right div --> */}
        <div className="">
          <h2 className="text-xl font-semibold">Right Side</h2>
          <p>Content here will be scrollable if it overflows.</p>
          {/* <!-- Add enough content here to make the right div scrollable --> */}
          <div className="bg-white shadow">
            <div className="py-6 sm:px-2 sm:py-4">
              <div className="flow-root h-100 overflow-y-auto">
                <ul className="p-1">
                  <li className="space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="grid grid-cols-5 gap-1">
                      {/* <!-- 1st Column: Image --> */}
                      <div className="col-span-1 ">
                        <img
                          className="h-15 w-15 max-w-full rounded-lg object-cover"
                          src="https://readymadeui.com/images/watch5.webp"
                          alt=""
                        />
                      </div>

                      {/* <!-- 2nd Column: Three Rows --> */}
                      <div className="col-span-2 row-span-1 flex flex-col space-y-1">
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-2">
                            Nike Air Max 2019
                          </p>
                          <p className="text-sm font-semibold mb-2"><del>Rs799</del>&nbsp;Rs.560</p>
                          <p className="text-sm font-semibold">HS&nbsp;|&nbsp;32</p>
                        </div>

                        
                      </div>

                      {/* <!-- 4th Column: Increment/Decrement Buttons --> */}
                      <div className="col-span-1 flex flex-col items-center">
                        <button className="w-10 h-6 flex items-center justify-center rounded-t-md transition bg-slate-200 hover:bg-black hover:text-white">
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center bg-gray-100 text-sm uppercase">
                          1
                        </div>
                        <button className="w-10 h-6 flex items-center justify-center rounded-b-md transition bg-slate-200 hover:bg-black hover:text-white">
                          +
                        </button>
                      </div>

                      {/* <!-- 5th Column: Price --> */}
                      <div className="col-span-1 flex items-center justify-center">
                        <p className="text-sm font-semibold text-right">
                          $259.00
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="grid grid-cols-5 gap-1">
                      {/* <!-- 1st Column: Image --> */}
                      <div className="col-span-1 ">
                        <img
                          className="h-15 w-15 max-w-full rounded-lg object-cover"
                          src="https://readymadeui.com/images/watch5.webp"
                          alt=""
                        />
                      </div>

                      {/* <!-- 2nd Column: Three Rows --> */}
                      <div className="col-span-2 row-span-1 flex flex-col space-y-1">
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-2">
                            Nike Air Max 2019
                          </p>
                          <p className="text-sm font-semibold mb-2"><del>Rs799</del>&nbsp;Rs.560</p>
                          <p className="text-sm font-semibold">HS&nbsp;|&nbsp;32</p>
                        </div>

                        
                      </div>

                      {/* <!-- 4th Column: Increment/Decrement Buttons --> */}
                      <div className="col-span-1 flex flex-col items-center">
                        <button className="w-10 h-6 flex items-center justify-center rounded-t-md transition bg-slate-200 hover:bg-black hover:text-white">
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center bg-gray-100 text-sm uppercase">
                          1
                        </div>
                        <button className="w-10 h-6 flex items-center justify-center rounded-b-md transition bg-slate-200 hover:bg-black hover:text-white">
                          +
                        </button>
                      </div>

                      {/* <!-- 5th Column: Price --> */}
                      <div className="col-span-1 flex items-center justify-center">
                        <p className="text-sm font-semibold text-right">
                          $259.00
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="grid grid-cols-5 gap-1">
                      {/* <!-- 1st Column: Image --> */}
                      <div className="col-span-1 ">
                        <img
                          className="h-15 w-15 max-w-full rounded-lg object-cover"
                          src="https://readymadeui.com/images/watch5.webp"
                          alt=""
                        />
                      </div>

                      {/* <!-- 2nd Column: Three Rows --> */}
                      <div className="col-span-2 row-span-1 flex flex-col space-y-1">
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-2">
                            Nike Air Max 2019
                          </p>
                          <p className="text-sm font-semibold mb-2"><del>Rs799</del>&nbsp;Rs.560</p>
                          <p className="text-sm font-semibold">HS&nbsp;|&nbsp;32</p>
                        </div>

                        
                      </div>

                      {/* <!-- 4th Column: Increment/Decrement Buttons --> */}
                      <div className="col-span-1 flex flex-col items-center">
                        <button className="w-10 h-6 flex items-center justify-center rounded-t-md transition bg-slate-200 hover:bg-black hover:text-white">
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center bg-gray-100 text-sm uppercase">
                          1
                        </div>
                        <button className="w-10 h-6 flex items-center justify-center rounded-b-md transition bg-slate-200 hover:bg-black hover:text-white">
                          +
                        </button>
                      </div>

                      {/* <!-- 5th Column: Price --> */}
                      <div className="col-span-1 flex items-center justify-center">
                        <p className="text-sm font-semibold text-right">
                          $259.00
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                    <div className="grid grid-cols-5 gap-1">
                      {/* <!-- 1st Column: Image --> */}
                      <div className="col-span-1 ">
                        <img
                          className="h-15 w-15 max-w-full rounded-lg object-cover"
                          src="https://readymadeui.com/images/watch5.webp"
                          alt=""
                        />
                      </div>

                      {/* <!-- 2nd Column: Three Rows --> */}
                      <div className="col-span-2 row-span-1 flex flex-col space-y-1">
                        <div className="flex-1">
                          <p className="text-sm font-semibold mb-2">
                            Nike Air Max 2019
                          </p>
                          <p className="text-sm font-semibold mb-2"><del>Rs799</del>&nbsp;Rs.560</p>
                          <p className="text-sm font-semibold">HS&nbsp;|&nbsp;32</p>
                        </div>

                        
                      </div>

                      {/* <!-- 4th Column: Increment/Decrement Buttons --> */}
                      <div className="col-span-1 flex flex-col items-center">
                        <button className="w-10 h-6 flex items-center justify-center rounded-t-md transition bg-slate-200 hover:bg-black hover:text-white">
                          -
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center bg-gray-100 text-sm uppercase">
                          1
                        </div>
                        <button className="w-10 h-6 flex items-center justify-center rounded-b-md transition bg-slate-200 hover:bg-black hover:text-white">
                          +
                        </button>
                      </div>

                      {/* <!-- 5th Column: Price --> */}
                      <div className="col-span-1 flex items-center justify-center">
                        <p className="text-sm font-semibold text-right">
                          $259.00
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-lg font-semibold text-gray-900">$399.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-lg font-semibold text-gray-900">$8.00</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  <span className="text-xs font-normal text-gray-400">USD</span>{' '}
                  408.00
                </p>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                >
                  Checkout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
