import Link from 'next/link';

export default function Header() {
  return (
    <div className='flex justify-between items-center lg:mx-[10vw] mx-[8vw] py-[1vw] border-b border-solid border-gray-200'>
      <Link className='text-blue-700 lg:text-2xl' href='/'>
        Handcrafted
      </Link>
      <div className='hidden lg:flex space-x-4'>
        <Link className='text-gray-600 ' href='/'>
          Home
        </Link>
        <Link className='text-gray-600 ' href='/shop/products'>
          Shop
        </Link>
        
        <Link className='text-gray-600 ' href='/about'>
          About
        </Link>
        <Link className='text-blue-700 ' href='/login'>
          Sign In
        </Link>
      </div>
      <div className='lg:hidden flex space-x-1'>
        <Link className='text-gray-600 ' href='#'>
          Home
        </Link>
        <Link className='text-gray-600 ' href='/shop/products'>
          Shop
        </Link>
       
        <Link className='text-gray-600 ' href='#'>
          About
        </Link>
        <Link className='text-blue-700 ' href='/login'>
          Sign In
        </Link>
      </div>
    </div>
  );
}
