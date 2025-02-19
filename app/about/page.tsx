import Footer from "../ui/home/footer";
import Header from "../ui/home/header";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="grid  grid-rows-[min-content_auto_min-content] min-h-screen">
      <section>
        <Header />
      </section>
      <div className="lg:px-[8vw] px-[2vw]">
        <h1 className="text-[6vw] lg:text-[2vw] font-semibold  text-gray-500 text-center py-[2vw]">
          About handcrafted Haven
        </h1>

        <div className="grid lg:grid-cols-2 grid-cols-1 lg:p-[2vw] p-[5vw] gap-[2vw]">
          <div className="lg:flex grid gap-[2vw]">
            <div>
              <h1 className="text-[5vw] text-gray-600 lg:text-[1.5vw]">Mision</h1>

              <Image
                src={"/hand(2).jpg"}
                className="hidden md:block"
                alt="hand-desktop"
                width={1000}
                height={500}
              />
              <Image
                src={"/hand(2).jpg"}
                width={800}
                height={620}
                className="block md:hidden"
                alt="hand-mobile"
              />
            </div>
            <div className="text-gray-500 grid place-items-center">
              Our mission is to provide high-quality, handcrafted products that
              bring joy and beauty to your home. We are committed to
              sustainability, supporting local artisans, and delivering
              exceptional customer service.
            </div>
          </div>
          <div className="lg:flex grid gap-[2vw]">
            <div>
              <h1 className="text-[5vw] lg:text-[1.5vw] text-gray-600">Vision</h1>

              <Image
                src={"/hand(3).jpg"}
                className="hidden md:block"
                alt="hand-desktop"
                width={1000}
                height={500}
              />
              <Image
                src={"/hand(3).jpg"}
                width={800}
                height={620}
                className="block md:hidden"
                alt="hand-mobile"
              />
            </div>
            <div className="text-gray-500 grid place-items-center">
              Our vision is to be the leading provider of handcrafted products
              in the United States. We will achieve this by expanding our
              product line, increasing our online presence, and opening new
              retail locations.
            </div>
          </div>
        </div>
      </div>

      <section>
        <Footer />
      </section>
    </div>
  );
}
