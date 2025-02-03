import { roboto } from "../fonts";
import Image from "next/image";
export default function CardProduct() {
  return (
    <section
      className={`${roboto.className} font-roboto grid lg:grid-cols-3 grid-cols-1 gap-4 bg-[#f9fafb] lg:p-[2vw] p-[5vw]`}
    >
      <div className="flex font-roboto">
        <div className="flex-none w-48 relative">
          <Image
            src={"/handcrafted 2.jpg"}
            width={500}
            height={200}
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            alt="hand-desktop"
          />
          <Image
            src={"/handcrafted 3.jpg"}
            width={300}
            height={100}
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
            alt="hand-mobile"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold">
              Classic Utility Jacket
            </h1>
            <div className="text-lg font-semibold text-slate-500">$110.00</div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              In stock
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
          <p className="text-sm text-slate-600">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>
      <div className="flex font-roboto">
        <div className="flex-none w-48 relative">
          <Image
            src={"/handcrafted 2.jpg"}
            width={500}
            height={200}
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            alt="hand-desktop"
          />
          <Image
            src={"/handcrafted 3.jpg"}
            width={300}
            height={100}
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
            alt="hand-mobile"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold">
              Classic Utility Jacket
            </h1>
            <div className="text-lg font-semibold text-slate-500">$110.00</div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              In stock
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
          <p className="text-sm text-slate-600">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div><div className="flex font-roboto">
        <div className="flex-none w-48 relative">
          <Image
            src={"/handcrafted 2.jpg"}
            width={500}
            height={200}
            className="hidden md:block absolute inset-0 w-full h-full object-cover"
            alt="hand-desktop"
          />
          <Image
            src={"/handcrafted 3.jpg"}
            width={300}
            height={100}
            className="block md:hidden absolute inset-0 w-full h-full object-cover"
            alt="hand-mobile"
          />
        </div>
        <form className="flex-auto p-6">
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-lg font-semibold">
              Classic Utility Jacket
            </h1>
            <div className="text-lg font-semibold text-slate-500">$110.00</div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              In stock
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
          <p className="text-sm text-slate-600">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>
      
     
    </section>
  );
}
