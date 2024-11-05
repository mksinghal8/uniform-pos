
import Products2 from '@/components/Products/Products2';

import SalesCart2 from '@/components/Products/SalesCart2';

import CurrentOrders from '@/components/Orders/CurrentOrders';


export default function Page() {
  
  return (
    <>
      {/* Product Grid */}
      <section className="w-full bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <CurrentOrders/>
      </section>

      
    </>
  );
}
