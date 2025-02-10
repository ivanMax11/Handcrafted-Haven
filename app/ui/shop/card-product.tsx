"use client";
import { roboto } from "../fonts";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../../lib/definitions";
import { Category } from "../../lib/definitions";

export default function CardProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("/query/products");
      const dataProduct = await response.json();
      setProducts(dataProduct);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/query/categories");
      const data = await response.json();
      setCategory(data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.category_id == category[0].id
    );

    setProducts(filteredProducts);
  }, [searchTerm]);

  if (!products || products.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <>
      <form className="max-w-lg mx-auto py-[1vw]">
        <div className="flex">
          <select name="" id="">
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logos
                </button>
              </li>
            </ul>
          </div>
          <div className="relative w-full">
            {/* aqui */}
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search products"
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </form>

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
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
                alt="Picture of the author"
              />
               <Image
                src={product.image_url}
                width={300}
                height={200}
              className="block md:hidden absolute inset-0 w-full h-full object-cover"
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
    </>
  );
}
