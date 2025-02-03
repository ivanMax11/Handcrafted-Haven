import CardProduct from "../../ui/shop/card-product";

export default function page() {
  return (
    <div>
      <h3 className="text-center lg:text-[2vw] text-[5vw] text-[#aaadb5]" >List Products </h3>
      <CardProduct />
      <CardProduct />
    </div>
  );
}
