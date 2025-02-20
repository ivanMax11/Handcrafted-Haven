'use client';
import { roboto } from './../../ui/fonts';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Product } from '../../lib/definitions';
import { Comments } from '../../lib/definitions';
import { useSession } from 'next-auth/react';
import { Category } from '../../lib/definitions';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useRouter } from 'next/navigation';
import router from 'next/router';


export default function ProfileListings() {
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

  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  const userId = session?.user?.id;



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

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const response = await fetch('/query/products');
  //     const dataProduct = await response.json();
  //     setProducts(dataProduct);
  //     setOriginalProducts(dataProduct);
  //   };

  //   getProducts();
  // }, []);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch('/query/products');
      const dataProduct = await response.json();


      // Filter products based on user_id
      const filteredProducts = dataProduct.filter((product: Product) => product.user_id === userId);

      setProducts(filteredProducts);
      setOriginalProducts(dataProduct); // Keep the original data if needed
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
    if (!selectedProduct || !newReview.trim()) return; // Make sure user is available

    try {
      const response = await fetch('/query/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          comment_text: newReview.trim(),
          user_id: 1, // Use the actual user ID
        }),
      });

      if (response.ok) {
        const newComment = await response.json(); // Get the newly created comment from the response
        setComments([...comments, newComment]); // Add the new comment to the state
        setNewReview('');
        alert('Review added successfully!');
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



  const handleDelete = async (productId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/shop/products/delete/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      alert("Product deleted successfully!");
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  const handleEdit = (productId: number) => {
    router.push(`/shop/products/edit/${productId}`);
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
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: { borderRadius: '1.2vw', padding: '3vw', width: '30vw' },
        }}>
        <h1>Review</h1>
        {selectedProduct &&
          comments
            .filter(
              (comment: Comments) => comment.product_id === selectedProduct.id
            )
            .map((comment: Comments) => (
              <div key={comment.id}>
                <h2>{comment.comment_text}</h2>
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
        className={`${roboto.className} font-roboto grid lg:grid-cols-2 grid-cols-1 gap-6 bg-[#f9fafb] lg:px-[10vw] lg:py-[2vw] p-[5vw]`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
          >
            {/* 📷 Product Image */}
            <div className="relative w-full md:w-48 flex-shrink-0">
              <Image
                src={product.image_url}
                width={500}
                height={200}
                className="hidden md:block w-full h-full object-cover"
                alt={product.name}
              />
              <Image
                src={product.image_url}
                width={300}
                height={200}
                className="block md:hidden w-full h-[20vh] object-cover"
                alt={product.name}
              />
            </div>

            {/* 📄 Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-green-600 font-semibold mt-2">${product.price}</p>
              <p className="text-gray-500 text-xs mt-1">In stock: {product.stock}</p>

              {/* 🎯 Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Delete
                </button>
                <button
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
                  onClick={() => onOpenModal(product)}
                >
                  See Reviews
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}





// type Product = {
//   id: string
//   name: string
//   description: string
//   price: string
//   image: string
// }

// const products: Product[] = [
//   {
//     id: '1',
//     name: "Handmade Silver Ring",
//     description: "Beautiful handcrafted silver ring.",
//     price: "49.99",
//     image: "https://silverpalace.in/uploads/products/613c52525a6bb_1.jpg",
//   },
//   {
//     id: '2',
//     name: "Ceramic Vase",
//     description: "Elegant ceramic vase with intricate patterns.",
//     price: "79.99",
//     image: "https://www.afloral.com/cdn/shop/products/HP501-W-White-Squatty-Vase.jpg?v=1736186714&width=1780",
//   },
//   // More products...
// ]

// const ListedProducts = () => {
//   return (
//     <section>
//       <h3 className="text-2xl font-semibold text-gray-800 mb-4">Listed Products</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {products.length === 0 ? (
//           <div className="col-span-3 text-center text-gray-500">No products listed yet.</div>
//         ) : (
//           products.map((product) => (
//             <div key={product.id} className="bg-white rounded-lg shadow-lg p-6">
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-full h-48 object-cover rounded-t-lg mb-4"
//               />
//               <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
//               <p className="text-gray-500 mb-4">{product.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="font-bold text-gray-700">{product.price} USD</span>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-500 transition">
//                   View Details
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   )
// }

// export default ListedProducts
