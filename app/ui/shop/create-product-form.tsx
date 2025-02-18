'use client';

import { createProduct, State, uploadImage } from '../../lib/actions';
import { useActionState } from 'react';
import { categories } from '../../lib/placeholder-data';
//import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function CreateProductForm() {
  const initialState: State = { message: '', errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);


  const userId = 1;

  //image uploading stuff
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      const imageUrl = await uploadImage(selectedFile);
      setImageUrl(imageUrl);
      // Now you have the imageUrl.  You can save it to your database.
      console.log('Image URL:', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className='lg:mx-[10vw] mx-[8vw]'>
      <h1 className='mx-2 text-gray-900 lg:text-[2vw] text-[4vw] text-nowrap flex'>
        Create Product
      </h1>
      <div>
        {/* PRODUCT FORM */}
        <form action={formAction}>
          <div className='rounded-md bg-gray-50 p-4 md:p-6'>
            <input type='hidden' id='userId' name='userId' value={userId} />
            <div className='mb-4'>
              <label
                htmlFor='product'
                className='mb-2 block text-sm font-medium'>
                Product Name
              </label>
              <input
                id='product'
                name='name'
                type='text'
                placeholder='Enter a product name'
                className='peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500'
              />
            </div>

            {/* Category */}
            <div className='mb-4'>
              <label
                htmlFor='category'
                className='mb-2 block text-sm font-medium'>
                Choose category
              </label>
              <div className='relative'>
                <select
                  id='categoryId'
                  name='categoryId'
                  className='peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                  defaultValue=''
                  aria-describedby='category-error'>
                  <option value='' disabled>
                    Select a category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div id='category-error' aria-live='polite' aria-atomic='true'>
                {state.errors?.categoryId &&
                  state.errors.categoryId.map((error: string) => (
                    <p className='mt-2 text-sm text-red-500' key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              {/* Description */}
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
              {/* Image Upload */}
              <div className='mb-4'>
                <input type='file' onChange={handleImageChange} />
                {imageUrl && <img src={imageUrl} alt='Uploaded Image' />}
              </div>
              {/* Price and Stock */}
              <div className='mb-4'>
                <label
                  htmlFor='price'
                  className='mb-2 block text-sm font-medium'>
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
                <label
                  htmlFor='stock'
                  className='mb-2 block text-sm font-medium'>
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
              <div aria-live='polite' aria-atomic='true'>
                {state.message ? (
                  <p className='mt-2 text-sm text-red-500'>{state.message}</p>
                ) : null}
              </div>
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
