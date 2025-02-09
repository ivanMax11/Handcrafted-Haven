//import { useActionState } from 'react';

export default function CreateProduct() {
  //const initialState: State = { message: null, errors: {} };
  //const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <div className='lg:mx-[10vw] mx-[8vw]'>
      <h1 className='mx-2 text-gray-900 lg:text-[2vw] text-[4vw] text-nowrap flex'>
        Create Product
      </h1>
      <div>
        {/* PRODUCT FORM */}
        <form action=''>
          <div className='rounded-md bg-gray-50 p-4 md:p-6'>
            <div className='mb-4'>
              <label
                htmlFor='product'
                className='mb-2 block text-sm font-medium'>
                Product Name
              </label>
              <input
                id='product'
                name='product'
                type='text'
                placeholder='Enter a product name'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='mb-2 block text-sm font-medium'>
                Description
              </label>
              <input
                id='description'
                name='description'
                type='text'
                placeholder='Product description goes here'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='image'>Upload an Image</label>
              <input type='file' name='image' id='image' />
            </div>
            <div className='mb-4'>
              <label htmlFor='price' className='mb-2 block text-sm font-medium'>
                Price
              </label>
              <input
                type='number'
                name='price'
                id='price'
                placeholder='100'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='stock' className='mb-2 block text-sm font-medium'>
                Stock
              </label>
              <input
                type='number'
                name='stock'
                id='stock'
                placeholder='5'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>

            <div>
              <button
                type='submit'
                className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>
                Create Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
