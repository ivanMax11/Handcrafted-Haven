import HomeProduct from "../../ui/shop/product-list";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'List Products',
};

export default function page() {
  return (
    <div>
      <h3 className="text-center p-[0vw] lg:py-[1vw] lg:text-[2vw] text-[5vw] text-[#aaadb5]" >List Products </h3>
      <HomeProduct />
    </div>
  );
}
