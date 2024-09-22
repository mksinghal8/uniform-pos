import Products from '@/components/Products/Products';
import SalesCart from '@/components/Products/SalesCart';
import { Button } from '@/components/ui/button';
import { ResizableDemo } from '../Resizable';

export default function Page() {
  return (
    <div className="flex">
      {/* <!-- Left side div (70% width) --> */}
      <div className="w-9/12 bg-gray-200 px-4 ml-8">
        {/* <!-- Your content for the left side --> */}
        <Products />
      </div>

      {/* <!-- Right side div (30% width) --> */}
      <div className="w-3/12 fixed inset-y-0 right-0 bg-white shadow-lg">
        {/* <!-- Content inside the fixed right div --> */}
        <div className="">
          {/* <!-- Add enough content here to make the right div scrollable --> */}
          <SalesCart/>
        </div>
      </div>
    </div>
  );
}
