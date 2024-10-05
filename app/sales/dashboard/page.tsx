import Products2 from '@/components/Products/Products2';
import SalesCart2 from '@/components/Products/SalesCart2';


export default function Page() {
  
  return (
    <>
      {/* Product Grid */}
      <section className="w-9/12 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
        <Products2/>
      </section>

      {/* Cart Section */}
      <aside className="fixed right-0 top-0 w-3/12 bg-white shadow-md p-4 h-full">
        <SalesCart2/>
      </aside>
    </>
  );
}
