import Products from '@/components/Products/Products';
import Products2 from '@/components/Products/Products2';
import SalesCart from '@/components/Products/SalesCart';

export default function Page() {
  return (
    <>
      {/* Product Grid */}
      <section className="w-9/12 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Products</h2>
         {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          Sample Product Card */}
          {/* {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 hover:shadow-lg"
            >
              <h3 className="font-bold">Product {index + 1}</h3>
              <p className="text-gray-700">
                Description of product {index + 1}
              </p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          ))} */}
        {/* </div> */}
        <Products2/>
      </section>

      {/* Cart Section */}
      <aside className="fixed right-0 top-0 w-3/12 bg-white shadow-md p-4 h-full">
        <SalesCart />
      </aside>
    </>
  );
}
