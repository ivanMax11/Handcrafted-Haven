"use client";
import { roboto } from "../fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../../lib/definitions";
import Link from "next/link"; // Import Link from next

export default function HomeProduct() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("/query/products");
      const dataProduct = await response.json();
      setProducts(dataProduct);
    };

    getProducts();
  }, []);

  return (
    <div className={roboto.className}>
      <section
        className={`${roboto.className} font-roboto grid lg:grid-cols-2 grid-cols-1 gap-4 bg-[#f9fafb] lg:px-[10vw] lg:py-[2vw] p-[5vw]`}
      >
        {products.map((product) => (
          <div key={product.id} className="flex font-roboto">
            <div className="flex-none w-48 relative">
              {/* Wrapping image with a Link to product details */}
              <Link href={`/product/${product.id}`}>
                <a>
                  <Image
                    src="https://st2.depositphotos.com/1177973/12314/i/450/depositphotos_123146230-stock-photo-flat-lay-of-handcraft.jpg"
                    width={500}
                    height={200}
                    className="hidden md:block absolute inset-0 w-full h-full object-cover"
                    alt="Product Image"
                  />
                  <Image
                    src="https://st2.depositphotos.com/1177973/12314/i/450/depositphotos_123146230-stock-photo-flat-lay-of-handcraft.jpg"
                    width={300}
                    height={200}
                    className="block md:hidden absolute inset-0 w-[45vw] h-[20vh] object-cover"
                    alt="Product Image"
                  />
                </a>
              </Link>
            </div>

            <form className="flex-auto p-0 lg:p-6">
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
    </div>
  );
}
