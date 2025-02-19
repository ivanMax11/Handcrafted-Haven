'use client';
import { roboto } from '../fonts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product } from '../../lib/definitions';
import { Comments } from '../../lib/definitions';

import { Category } from "../../lib/definitions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ToastContainer, toast } from "react-toastify";
import Moment from "react-moment";

export default function CardProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [comments, setComments] = useState<Comments[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newReview, setNewReview] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [open, setOpen] = useState(false);

  const onOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const onCloseModal = () => {
    setSelectedProduct(null);
    setOpen(false);
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await fetch('/query/comments');
      const dataReview = await response.json();
      setComments(dataReview);
    };

    getReviews();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/query/products');
      const dataProduct = await response.json();
      setProducts(dataProduct);
      setOriginalProducts(dataProduct);
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch('/query/categories');
      const data = await response.json();
      setCategories(data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    let filteredProducts = [...originalProducts];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category_id === Number(selectedCategory)
      );
    }

    if (searchTerm) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }
    setProducts(filteredProducts);
  }, [searchTerm, selectedCategory, originalProducts, minPrice, maxPrice]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value === '' ? undefined : Number(value));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value === '' ? undefined : Number(value));
  };
  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewReview(e.target.value);
  };

  const handleAddReview = async () => {
    if (!selectedProduct || !newReview.trim()) return;

    try {
      const response = await fetch('/query/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          comment_text: newReview.trim(),
          user_id: 1,
        }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setNewReview("");
        toast.success("Review added successfully!");
        onCloseModal();
      } else {
        const errorData = await response.json();
        console.error('Error adding review:', response.status, errorData);
        alert(`Error adding review: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Error adding review. Please try again.');
    }
  };

  if (!products || products.length === 0) {
    return (
      <div>
        <form className='max-w-2xl mx-auto py-4 px-4 md:px-0'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='relative flex-grow'>
              <select
                name='category'
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                <option value=''>All the categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                <svg
                  className='fill-current h-4 w-4'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'>
                  <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                </svg>
              </div>
            </div>

            <div className='relative flex-grow'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-gray-500 '
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'>
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='search-dropdown'
                className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search products'
                required
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex gap-2 flex-grow'>
              <input
                type='number'
                id='min-price'
                className='block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400'
                placeholder='Price Min'
                value={minPrice === undefined ? '' : minPrice}
                onChange={handleMinPriceChange}
              />
              <input
                type='number'
                id='max-price'
                className='block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400'
                placeholder='Price Max'
                value={maxPrice === undefined ? '' : maxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
          </div>
        </form>
        <Image
          className='px-[5vw] pb-[5vw] lg:px-[10vw] lg:pb-[2vw]'
          src='/productNot.png'
          width={1000}
          height={1000}
          style={{ width: '100vw', height: '50vh' }}
          alt=''
        />
      </div>
    );
  }

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{ modal: isMobile ? "modal-mobile" : "" }}
        styles={{
          modal: {
            borderRadius: "1.2vw",
            padding: "3vw",
            width: isMobile ? "90vw" : "30vw",
          },
        }}>
        <h1 className='lg:text-[1.5vw] text-[5vw] text-[#1d4ed8] lg:pb-[0.5] pb-[1vw]'>
          Review
        </h1>
        {selectedProduct &&
          comments
            .filter(
              (comment: Comments) => comment.product_id === selectedProduct.id
            )
            .map((comment: Comments) => (
              <div
                className="grid grid-cols-[1fr_min-content] gap-[1vw] lg:pb-[0.5] pb-[1vw] border-b-2 border-gray-300  w-100"
                key={comment.id}
              >
                <h2 className=" text-[#707070] font-semibold ">
                  {comment.comment_text}
                </h2>
                <Moment format="YYYY/MM/DD ">{comment.created_at}</Moment>
              </div>
            ))}

        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative flex-grow'>
            <input
              type='text'
              id='review'
              className='block w-full p-2 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Review'
              value={newReview}
              onChange={handleReviewChange}
              required
            />
          </div>
          <button
            className='h-10 px-6 font-semibold rounded-md bg-blue-700 text-white'
            type='button'
            onClick={handleAddReview}>
            Add review
          </button>
        </div>
      </Modal>
      <form className='max-w-2xl mx-auto py-4 px-4 md:px-0'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='relative flex-grow'>
            <select
              name='category'
              id='category'
              value={selectedCategory}
              onChange={handleCategoryChange}
              className='block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
              <option value=''>All the categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'>
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>

          <div className='relative flex-grow'>
            <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
              <svg
                className='w-4 h-4 text-gray-500 '
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'>
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>
            <input
              type='search'
              id='search-dropdown'
              className='block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search products'
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='flex gap-2 flex-grow'>
            <input
              type='number'
              id='min-price'
              className='block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400'
              placeholder='price Min'
              value={minPrice === undefined ? '' : minPrice}
              onChange={handleMinPriceChange}
            />
            <input
              type='number'
              id='max-price'
              className='block p-2.5 w-1/2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400'
              placeholder='Price Max'
              value={maxPrice === undefined ? '' : maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </form>

      <section
        className={`${roboto.className} font-roboto grid lg:grid-cols-2 grid-cols-1 gap-4 bg-[#f9fafb] lg:px-[10vw] lg:py-[2vw] p-[5vw]`}>
        {products.map((product) => (
          <div key={product.id} className='flex font-roboto'>
            <div className='flex-none w-48 relative'>
              <Image
                src={product.image_url}
                width={500}
                height={200}
                className='hidden md:block absolute inset-0 w-full h-full object-cover'
                alt='Picture of the author'
              />
              <Image
                src={product.image_url}
                width={300}
                height={200}
                className='block md:hidden absolute inset-0 w-[45vw] h-[20vh] object-cover'
                alt='Picture of the author'
              />
            </div>

            <form className='flex-auto pl-4 lg:p-6'>
              <div className='flex flex-wrap'>
                <h1 className='flex-auto text-lg font-semibold'>
                  {product.name}
                </h1>
                <div className='text-lg font-semibold text-slate-500'>
                  ${product.price}
                </div>
                <div className='w-full flex-none text-sm font-medium text-slate-700 mt-2'>
                  In stock {product.stock}
                </div>
              </div>
              <div className='flex space-x-4 mb-6 text-sm font-medium'>
                <div className='flex-auto flex space-x-4'>
                  <button
                    className='h-10 px-6 font-semibold rounded-md bg-blue-700 text-white'
                    onClick={() => onOpenModal(product)}
                    type='button'>
                    see reviews
                  </button>
                </div>
              </div>
              <p className='text-sm text-slate-600'>{product.description}</p>
            </form>
          </div>
        ))}
      </section>
    </>
  );
}
