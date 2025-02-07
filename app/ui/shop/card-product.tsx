import { roboto } from "../fonts";
import Image from "next/image";
import { getProducts } from "../../lib/data";

export default async function CardProduct() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <section
      className={`${roboto.className} font-roboto grid lg:grid-cols-3 grid-cols-1 gap-4 bg-[#f9fafb] lg:p-[2vw] p-[5vw]`}
    >
      {products.map((product) => (
        <div key={product.id} className="flex font-roboto">
          <div className="flex-none w-48 relative">
            <Image
              src="https://st2.depositphotos.com/1177973/12314/i/450/depositphotos_123146230-stock-photo-flat-lay-of-handcraft.jpg"
              width={500}
              height={200}
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
              alt="Picture of the author"
            />
            <Image
              src="https://st2.depositphotos.com/1177973/12314/i/450/depositphotos_123146230-stock-photo-flat-lay-of-handcraft.jpg"
              width={300}
              height={200}
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
              alt="Picture of the author"
            />
            {/* <Image
                src={product.image_url}
                width={500}
                height={200}
                alt="Picture of the author"
              />
               <Image
                src={product.image_url}
                width={300}
                height={200}
                alt="Picture of the author"
              />
              
              */}
          </div>

          <form className="flex-auto p-6">
            <div className="flex flex-wrap">
              <h1 className="flex-auto text-lg font-semibold">
                {product.name}
              </h1>
              <div className="text-lg font-semibold text-slate-500">
                ${product.price}
              </div>
              <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
                In stock {product.stock}
              </div>
            </div>
            <div className="flex space-x-4 mb-6 text-sm font-medium">
              <div className="flex-auto flex space-x-4">
                <button
                  className="h-10 px-6 font-semibold rounded-md bg-blue-700 text-white"
                  type="submit"
                >
                  Buy now
                </button>
              </div>
            </div>
            <p className="text-sm text-slate-600">{product.description}</p>
          </form>
        </div>
      ))}
    </section>
  );
}
