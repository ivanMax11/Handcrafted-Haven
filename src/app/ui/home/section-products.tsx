import Image from "next/image";

export default function FeatProducts() {
  return (
    <div className="grid grid-cols-1 bg-[#fafafa] lg:p-[2vw] p-[5vw]">
      <h1 className="font-extrabold text-center lg:py-[1vw] py-[3vw]">Featured Products</h1>
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
        </div><div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
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
        </div><div className="p-4 bg-white border border-solid border-gray-200 rounded-lg">
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
    </div>
  );
}
