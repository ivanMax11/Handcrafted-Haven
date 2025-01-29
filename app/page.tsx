import Footer from "../app/ui/home/footer";
import Image from "next/image";
import Header from "../app/ui/home/header";
import Link from "next/link";
import { roboto } from "../app/ui/fonts";

export default function Home() {
  return (
    <div className={`${roboto.className} font-roboto`}>
      <section>
        <Header />
      </section>
      <section className="w-full lg:h-[60vh] h-[35vh] bg-[#ffffff] flex flex-col justify-center items-center">
        <div className="text-center">
          <p className="text-gray-900 lg:text-[4vw] text-[6vw] text-nowrap">
            Discover Unique
            <span className="text-blue-700 text-nowrap"> HandCrafteds</span>
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
            <Link href="/shop">Shop Now</Link>
          </button>
          <button className="bg-[#e0e7ff] text-[#7672ec] p-2 rounded-lg m-2">
            <Link href="/shop">Become a Seller</Link>
          </button>
        </div>
      </section>
      <section className="grid grid-cols-1 bg-[#f9fafb] lg:p-[2vw] p-[5vw]">
        <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">
          Popular Categories
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 justify-self-center  gap-[5vw] px-[10vw]">
          <div className="p-4 bg-white border justify-self-center border-solid border-gray-200 rounded-lg ">
            <Image
              src={"/handcrafted.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <div className="bg-[#7d7e7f] border absolute lg:top-[48.8vw] lg:w-[380px] top-[122vw] w-[290px]  rounded-lg p-2">
              <p className="text-gray-300">Pottery</p>
            </div>
          </div>
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/handcrafted 2.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted 2.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <div className="bg-[#7d7e7f] border absolute lg:top-[51vw] top-[176-vw] lg:w-[380px] w-[290px]  rounded-lg p-2">
              <p className="text-gray-300">Pottery</p>
            </div>
          </div>
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/handcrafted 3.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted 3.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <div className="bg-[#7d7e7f] border absolute lg:top-[51vw]  top-[230vw] lg:w-[380px] w-[290px]  rounded-lg p-2">
              <p className="text-gray-300">Hand</p>
            </div>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 bg-[#ffffff] lg:p-[2vw] p-[5vw]">
        <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">
          Featured Products
        </h1>
        <div className="grid lg:grid-cols-4 grid-cols-1 justify-self-center  gap-[5vw] px-[10vw]">
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/hand.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/hand.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <h3 className="font-bold">Handmade</h3>
            <p className="text-gray-400">By Maria Cuaro</p>
            <p className="text-blue-500">99$</p>
          </div>
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/handcrafted.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <h3 className="font-bold">Handmade</h3>
            <p className="text-gray-400">By Maria Cuaro</p>
            <p className="text-blue-500">99$</p>
          </div>
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/handcrafted 2.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted 2.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <h3 className="font-bold">Handmade</h3>
            <p className="text-gray-400">By Maria Cuaro</p>
            <p className="text-blue-500">99$</p>
          </div>
          <div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
            <Image
              src={"/handcrafted 3.jpg"}
              width={500}
              height={200}
              className="hidden md:block"
              alt="hand-desktop"
            />
            <Image
              src={"/handcrafted 3.jpg"}
              width={340}
              height={620}
              className="block md:hidden"
              alt="hand-mobile"
            />
            <h3 className="font-bold">Handmade</h3>
            <p className="text-gray-400">By Maria Cuaro</p>
            <p className="text-blue-500">99$</p>
          </div>
        </div>
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
}
