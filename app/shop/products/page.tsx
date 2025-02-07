import CardProduct from "../../ui/shop/card-product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'List Products',
};

export default function page() {
  return (
    <div>
      <h3 className="text-center lg:text-[2vw] text-[5vw] text-[#aaadb5]" >List Products </h3>
      <CardProduct />
    </div>
  );
}
