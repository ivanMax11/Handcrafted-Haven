"use client";
import { roboto } from "../fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Category, Product } from "../../lib/definitions";
import Link from "next/link";

export default function HomeProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/query/products");
      const dataProduct = await response.json();

      const categoriesResponse = await fetch("/query/categories");
      const categoriesData = await categoriesResponse.json() || [];

      setProducts(dataProduct);
      setCategories(categoriesData);
    };

    getData(); //Pulling products and category data
  }, []);

  return (
    <div className={roboto.className}>
      <section className="grid grid-cols-1 bg-[#f9fafb] lg:p-[2vw] p-[5vw]">
        <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">
          Popular Categories
        </h1>

        <div className="grid lg:grid-cols-3 grid-cols-1 justify-self-center  gap-[5vw] px-[10vw]">
          {categories.map((category) => (
            <div key={category.id} className="relative">
              <div className="rounded-lg p-2">
                <p className=" ">{category.name}</p>
              </div>
              <Link className="text-black" href="/shop/products">
                <Image
                  src={category.image_url}
                  width={500}
                  height={200}
                  className="hidden md:block lg:w-[20vw] lg:h-[12vw]"
                  alt="hand-desktop"
                />
              </Link>
              <Link className="text-black" href="/shop/products">
                <Image
                  src={category.image_url}
                  width={340}
                  height={620}
                  className="block md:hidden"
                  alt="hand-mobile"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div>
        <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">
          Featured Products
        </h1>
      </div>
      <section
        className={`${roboto.className} font-roboto grid lg:grid-cols-2 grid-cols-1 gap-4 bg-[#f9fafb] lg:px-[10vw] lg:py-[2vw] p-[5vw]`}
      >
        {products.map((product) => (
          <div key={product.id} className="flex font-roboto">
            <div className="flex-none w-48 relative">
              {/* Wrapping image with a Link to product details */}
              <Link className="text-black" href="/shop/products">
                <Image
                  src={`${product.image_url}`}
                  width={500}
                  height={200}
                  className="hidden md:block absolute inset-0 w-full h-full object-cover"
                  alt="Product Image"
                />
                <Image
                  src={`${product.image_url}`}
                  width={300}
                  height={200}
                  className="block md:hidden absolute inset-0 w-[45vw] h-[20vh] object-cover"
                  alt="Product Image"
                />
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