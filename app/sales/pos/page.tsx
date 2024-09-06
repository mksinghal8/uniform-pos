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
          <SalesCart/>
        </div>
      </div>
    </div>
  );
}
