import Link from 'next/link';
export default function Footer() {
  return (
    <footer className='grid bg-slate-900 w-full lg:h-[20vw]'>
      <div className='grid lg:grid-cols-4 grid-cols-2  lg-gap-0 gap-4 px-[10vw] py-[3vw]'>
        <div>
          <h3 className='text-gray-100'>About us</h3>
          <p className='text-gray-300'>
            Supporting artisans and crafters worldwide in sharing their unique
            creations
          </p>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-100'>Quick links</h3>
          <Link href='/shop/products' className='text-gray-300'>
            Shop
          </Link>
          <Link href='/shop/products' className='text-gray-300'>
            Sell
          </Link>
          <Link href='/about' className='text-gray-300'>
            About
          </Link>
          <Link href='/about' className='text-gray-300'>
            Contact
          </Link>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-100'>Quick links</h3>
          <Link href='#' className='text-gray-300'>
            Shipping
          </Link>
          <Link href='#' className='text-gray-300'>
            Return
          </Link>
          <Link href='/about' className='text-gray-300'>
            FAQs
          </Link>
        </div>
        <div className='flex flex-col lg:gap-2 gap-4'>
          <h3 className='text-gray-100'>Newsletters</h3>
          <input
            className='bg-slate-600 border border-solid lg:h-[2.5vw] h-[6vw] border-gray-300 p-1 '
            placeholder='Enter your email'
            type='text'
          />
          <button
            className='lg:h-[2.5vw] h-[6vw] text-gray-300 bg-blue-700 '
            type='button'>
            Subscribe
          </button>
        </div>
      </div>
      <p className='text-center text-gray-300 p-0'>
        @2025 ArtisanMarket All rights reserved.
      </p>
    </footer>
  );
}
