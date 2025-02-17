"use client";

import Footer from "../app/ui/home/footer";
import Image from "next/image";
import Header from "../app/ui/home/header";
import Link from "next/link";
import { roboto } from "../app/ui/fonts";
import { useEffect, useState } from "react";
import { Category, Product } from "../app/lib/definitions";


export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("/query/products");
      const dataProduct = await response.json();
      setDisplayedProducts(dataProduct.slice(0, 4));
    };

    getProducts();
  }, []);
  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/query/categories");
      const data = await response.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  return (
    <div className={`${roboto.className} font-roboto`}>
      <section>
        <Header />
      </section>
      <section className="w-full lg:h-[60vh] h-[35vh] bg-[#ffffff] flex flex-col justify-center items-center">
        <div className="text-center">
          <p className="text-gray-900 lg:text-[4vw] text-[6vw] text-nowrap">
            Discover Unique
            <span className="text-blue-700 text-nowrap"> HandCrafted</span>
          </p>
          <h1 className="text-gray-900 lg: text-[6vw]  text-nowrap">
            Treasures
          </h1>
        </div>

        <h3 className="text-gray-400 lg:text-[1.2vw] text-[4vw] lg:px-[0vw] px-[10vw]">
          Connect with talented artisans and find one-of-a-kind pieces crafted
          with passion and skil
        </h3>
        <div className="py-[2vw]">
          <button className="bg-blue-700 text-white p-2 rounded-lg m-2">
            <Link href="/shop/products">Shop Now</Link>
          </button>
          <button className="bg-[#e0e7ff] text-[#7672ec] p-2 rounded-lg m-2">
            <Link href="/shop/products">Become a Seller</Link>
          </button>
        </div>
      </section>
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
      <section className="grid grid-cols-1 bg-[#ffffff] lg:p-[2vw] p-[5vw]">
        <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">
          Featured Products
        </h1>
        <div className="grid lg:grid-cols-4 grid-cols-1 justify-self-center  gap-[5vw] px-[10vw]">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 bg-white border border-solid border-gray-200 rounded-lg"
            >
              <Image
                src={product.image_url}
                width={500}
                height={200}
                className="hidden md:block w-[20vw] h-[12vw]"
                alt="hand-desktop"
              />
              <Image
                src={product.image_url}
                width={340}
                height={620}
                className="block md:hidden w-[30vw] h-[40vw]"
                alt="hand-mobile"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-400">{product.description}</p>
              <p className="text-blue-500">{product.price}$</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
